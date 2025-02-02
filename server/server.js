const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Gestione errori MongoDB
mongoose.connection.on('error', (err) => {
    console.error('Errore di connessione MongoDB:', err);
});

mongoose.connection.once('open', () => {
    console.log('Connesso con successo a MongoDB');
});

// Connessione MongoDB con gestione errori
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/tech-ai-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Errore nella connessione al database:', error);
        process.exit(1);
    }
}

connectDB();

// Route di test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server funzionante' });
});

// Login route con più dettagli
app.post('/api/auth/login', async (req, res) => {
    try {
        console.log('Tentativo di login per:', req.body.email);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Utente non trovato:', email);
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Password non valida per:', email);
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login effettuato con successo per:', email);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                profileImage: user.profileImage,
                technicalSkills: user.technicalSkills,
                plumbingSkills: user.plumbingSkills,
                electricalSkills: user.electricalSkills
            }
        });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ message: 'Errore del server durante il login' });
    }
});

// Middleware di autenticazione
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token non fornito' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token non valido' });
        }
        req.user = user;
        next();
    });
};

// Route protette
app.post('/api/users', authenticateToken, async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accesso non autorizzato' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            role,
            technicalSkills: new Map(),
            plumbingSkills: new Map(),
            electricalSkills: new Map()
        });

        await user.save();
        res.status(201).json({ message: 'Utente creato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nella creazione dell\'utente' });
    }
});

// Avvio server con gestione errori
app.listen(PORT, (err) => {
    if (err) {
        console.error('Errore nell\'avvio del server:', err);
        process.exit(1);
    }
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});

// Gestione errori non catturati
process.on('unhandledRejection', (err) => {
    console.error('Errore non gestito:', err);
}); 