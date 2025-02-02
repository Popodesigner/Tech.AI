const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');  // Assicurati di esportare il modello User

async function createAdmin() {
    try {
        await mongoose.connect('mongodb://localhost/tech-ai-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Controlla se esiste già un admin
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin già esistente');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            email: 'admin@techai.com',
            password: hashedPassword,
            name: 'Amministratore',
            role: 'admin',
            technicalSkills: new Map([['Amministrazione', 100]]),
            plumbingSkills: new Map([['Gestione', 100]]),
            electricalSkills: new Map([['Supervisione', 100]])
        });

        await admin.save();
        console.log('Admin creato con successo');
        console.log('Email: admin@techai.com');
        console.log('Password: admin123');
    } catch (error) {
        console.error('Errore nella creazione dell\'admin:', error);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin(); 