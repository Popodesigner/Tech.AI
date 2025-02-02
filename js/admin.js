class AdminPanel {
    constructor() {
        this.usersList = document.getElementById('usersList');
        this.createUserBtn = document.getElementById('createUserBtn');
        this.createUserModal = document.getElementById('createUserModal');
        this.createUserForm = document.getElementById('createUserForm');
        this.closeModalBtn = document.getElementById('closeModal');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.createUserBtn.addEventListener('click', () => this.showCreateUserModal());
        this.closeModalBtn.addEventListener('click', () => this.hideCreateUserModal());
        this.createUserForm.addEventListener('submit', (e) => this.handleCreateUser(e));
    }

    async loadUsers() {
        try {
            const response = await fetch(`${auth.baseUrl}/users`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (response.ok) {
                const users = await response.json();
                this.renderUsers(users);
            }
        } catch (error) {
            console.error('Errore nel caricamento degli utenti:', error);
        }
    }

    renderUsers(users) {
        this.usersList.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <div>
                    <strong>${user.name}</strong> (${user.email})
                    <span class="user-role">${user.role}</span>
                </div>
                <div>
                    <button onclick="adminPanel.editUser('${user._id}')" class="btn-secondary">Modifica</button>
                    <button onclick="adminPanel.deleteUser('${user._id}')" class="btn-secondary">Elimina</button>
                </div>
            `;
            this.usersList.appendChild(userElement);
        });
    }

    showCreateUserModal() {
        this.createUserModal.classList.remove('hidden');
    }

    hideCreateUserModal() {
        this.createUserModal.classList.add('hidden');
        this.createUserForm.reset();
    }

    async handleCreateUser(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch(`${auth.baseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    name: formData.get('name'),
                    password: formData.get('password'),
                    role: formData.get('role')
                })
            });

            if (response.ok) {
                this.hideCreateUserModal();
                this.loadUsers();
                alert('Utente creato con successo');
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Errore nella creazione dell\'utente:', error);
            alert('Errore nella creazione dell\'utente');
        }
    }

    async deleteUser(userId) {
        if (!confirm('Sei sicuro di voler eliminare questo utente?')) return;

        try {
            const response = await fetch(`${auth.baseUrl}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (response.ok) {
                this.loadUsers();
                alert('Utente eliminato con successo');
            }
        } catch (error) {
            console.error('Errore nell\'eliminazione dell\'utente:', error);
            alert('Errore nell\'eliminazione dell\'utente');
        }
    }
}

const adminPanel = new AdminPanel(); 