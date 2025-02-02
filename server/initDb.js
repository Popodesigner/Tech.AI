const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function initDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/tech-ai-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Verifica se esiste già un admin
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
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
        } else {
            console.log('Admin già esistente');
        }

        console.log('Inizializzazione database completata');
    } catch (error) {
        console.error('Errore durante l\'inizializzazione:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initDatabase(); 