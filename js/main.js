document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    
    // Gestisci il caricamento iniziale basato sull'hash URL
    const hash = window.location.hash.slice(1);
    if (hash) {
        app.navigateTo(hash);
    }
});

class App {
    constructor() {
        this.currentPage = 'home';
        this.pageHistory = ['home'];
        this.scanner = new Scanner();
        this.chatBot = new ChatBot();
        this.productManager = new ProductManager();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.navigateTo(btn.dataset.page);
            });
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        });

        // Scanner
        document.getElementById('scannerBtn').addEventListener('click', () => {
            this.navigateTo('scanner');
            this.scanner.initialize();
        });

        // Products
        document.getElementById('productsBtn').addEventListener('click', () => {
            this.navigateTo('products');
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.loadProductSelection(btn.dataset.category);
            });
        });

        // Gestione del pulsante "indietro" del browser
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page, true);
            }
        });

        // Aggiungi gestore per il tasto Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.goBack();
            }
        });
    }

    navigateTo(page, isPopState = false) {
        const previousPage = this.currentPage;
        
        // Nascondi tutte le pagine
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        
        // Mostra la pagina richiesta
        const pageElement = document.getElementById(`${page}Page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
            
            // Aggiorna la cronologia solo se non è un evento popstate
            if (!isPopState) {
                // Aggiungi alla cronologia del browser
                window.history.pushState({ page }, '', `#${page}`);
                
                // Aggiorna la cronologia interna
                this.pageHistory.push(page);
            }

            // Gestisci le azioni specifiche per pagina
            if (page === 'scanner') {
                this.scanner.initialize();
            } else {
                this.scanner.stop();
            }

            // Aggiorna i pulsanti di navigazione
            this.updateNavigation(page);
        }

        this.currentPage = page;
    }

    goBack() {
        if (this.pageHistory.length > 1) {
            // Rimuovi la pagina corrente dalla cronologia
            this.pageHistory.pop();
            
            // Prendi l'ultima pagina della cronologia
            const previousPage = this.pageHistory[this.pageHistory.length - 1];
            
            // Torna indietro nella cronologia del browser
            window.history.back();
            
            // Aggiorna l'interfaccia
            this.navigateTo(previousPage, true);
        }
    }

    updateNavigation(currentPage) {
        // Aggiorna i pulsanti di navigazione
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === currentPage);
        });

        // Mostra/nascondi il pulsante indietro
        const backButtons = document.querySelectorAll('.back-btn');
        backButtons.forEach(btn => {
            btn.style.display = this.pageHistory.length > 1 ? 'block' : 'none';
        });
    }

    loadProductSelection(category) {
        this.productManager.loadBrandsForCategory(category);
        this.navigateTo('productSelection');
        
        document.getElementById('confirmProduct').onclick = () => {
            const brand = document.getElementById('brandSelect').value;
            const model = document.getElementById('modelSelect').value;
            
            if (brand && model) {
                this.startChat(brand, model);
            } else {
                alert('Seleziona marca e modello');
            }
        };
    }

    startChat(brand, model) {
        this.chatBot.setContext(brand, model);
        this.navigateTo('chat');
    }
} 