class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.token = localStorage.getItem('token');
        this.baseUrl = 'http://localhost:3000/api';
        
        // Test della connessione al server
        this.testConnection();
    }

    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/test`);
            if (response.ok) {
                console.log('Connessione al server stabilita');
            } else {
                console.error('Server non risponde correttamente');
            }
        } catch (error) {
            console.error('Impossibile connettersi al server:', error);
        }
    }

    async login(email, password) {
        try {
            console.log('Tentativo di login per:', email);
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Risposta server:', data);

            if (response.ok) {
                this.token = data.token;
                this.currentUser = data.user;
                this.isAuthenticated = true;
                
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return true;
            } else {
                alert(data.message || 'Errore durante il login');
                return false;
            }
        } catch (error) {
            console.error('Errore di connessione:', error);
            alert('Impossibile connettersi al server. Verifica che il server sia in esecuzione.');
            return false;
        }
    }

    async resetPassword(email) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            return response.ok;
        } catch (error) {
            console.error('Errore durante il reset della password:', error);
            return false;
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    async updateProfile(profileData) {
        try {
            const response = await fetch(`${this.baseUrl}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(profileData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                this.currentUser = updatedUser;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return true;
            }

            return false;
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del profilo:', error);
            return false;
        }
    }
}

const auth = new Auth(); 