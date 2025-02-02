class ChatBot {
    constructor() {
        this.messages = [];
        this.currentContext = null;
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendMessage');
        this.chatMessages = document.getElementById('chatMessages');
        this.baseUrl = 'http://localhost:3000/api';
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.messageInput.value = '';

        try {
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Errore nella risposta AI:', error);
            this.addMessage('Mi dispiace, si è verificato un errore.', 'ai');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    setContext(brand, model) {
        this.currentContext = { brand, model };
        this.messages = [];
        this.chatMessages.innerHTML = '';
        this.addMessage(`Assistente tecnico per ${brand} ${model}`, 'system');
    }

    async getAIResponse(message) {
        try {
            // Prima salviamo il messaggio nel database
            await this.saveMessage(message, 'user');

            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    message,
                    context: this.currentContext,
                    history: this.messages
                })
            });

            if (!response.ok) {
                throw new Error('Errore nella risposta del server');
            }

            const data = await response.json();
            await this.saveMessage(data.response, 'assistant');
            
            return data.response;
        } catch (error) {
            console.error('Errore nella risposta:', error);
            throw error;
        }
    }

    async saveMessage(text, sender) {
        try {
            await fetch(`${this.baseUrl}/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    text,
                    sender,
                    context: this.currentContext
                })
            });
        } catch (error) {
            console.error('Errore nel salvataggio del messaggio:', error);
        }
    }

    async loadChatHistory() {
        try {
            const response = await fetch(
                `${this.baseUrl}/chat/history?brand=${this.currentContext.brand}&model=${this.currentContext.model}`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );

            if (response.ok) {
                const history = await response.json();
                history.forEach(msg => this.addMessage(msg.text, msg.sender));
            }
        } catch (error) {
            console.error('Errore nel caricamento della cronologia:', error);
        }
    }
} 