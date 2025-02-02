class ProductManager {
    constructor() {
        this.initializeData();
        this.setupUI();
        this.loadRecentProducts();
        this.loadFavorites();
    }

    initializeData() {
        this.brands = {
            caldaie: [
                'Vaillant',
                'Baxi',
                'Ariston',
                'Beretta',
                'Immergas',
                'Viessmann',
                'Ferroli',
                'Hermann Saunier Duval',
                'Riello',
                'Chaffoteaux'
            ],
            pdc: [
                'Daikin',
                'Mitsubishi Electric',
                'Mitsubishi Heavy',
                'Samsung',
                'LG',
                'Panasonic',
                'Toshiba',
                'Fujitsu',
                'Hitachi',
                'Haier'
            ],
            solare: [
                'Viessmann',
                'Vaillant Solar',
                'Junkers',
                'Paradigma',
                'Wolf',
                'Sonnenkraft',
                'Buderus',
                'Wagner Solar',
                'Bosch Solar',
                'Cordivari'
            ],
            acqua: [
                'Grundfos',
                'Wilo',
                'DAB',
                'Lowara',
                'KSB',
                'Calpeda',
                'Ebara',
                'Pedrollo',
                'Salmson',
                'Zenit'
            ],
            pompe: [
                'Grundfos',
                'Wilo',
                'DAB',
                'Salmson',
                'KSB',
                'Lowara',
                'Calpeda',
                'Ebara',
                'Pedrollo',
                'Nocchi'
            ],
            normative: [
                'UNI',
                'CEI',
                'DM37/08',
                'EN',
                'ISO',
                'INAIL',
                'VVF',
                'ASHRAE',
                'DIN',
                'IMQ'
            ],
            elettrici: [
                'Schneider',
                'ABB',
                'Siemens',
                'Eaton',
                'Legrand',
                'Gewiss',
                'Bticino',
                'Finder',
                'Phoenix Contact',
                'Vimar'
            ],
            centraline: [
                'Siemens',
                'Honeywell',
                'Coster',
                'Danfoss',
                'Johnson Controls',
                'Seitron',
                'Kromschröder',
                'RBM',
                'Watts',
                'Caleffi'
            ]
        };

        this.models = {
            // Caldaie
            'Vaillant': [
                'ecoTEC plus VMW',
                'ecoTEC pro VMW',
                'ecoBALKON plus',
                'ecoCOMPACT',
                'auroCOMPACT',
                'ecoVIT',
                'atmoTEC plus',
                'atmoTEC pro',
                'turboTEC plus',
                'turboTEC pro'
            ],
            'Baxi': [
                'Luna Duo-tec',
                'Luna Platinum',
                'Luna Style',
                'Luna Air',
                'Nuvola Duo-tec',
                'Prime',
                'Eco5 Compact',
                'Luna Space',
                'Luna Team',
                'Power HT'
            ],
            'Ariston': [
                'Clas One',
                'Genus One',
                'Alteas One',
                'Cares Premium',
                'Cares X',
                'Clas B Premium',
                'Clas Premium Evo',
                'HS Premium',
                'Egis Plus',
                'Matis'
            ],

            // Pompe di Calore
            'Daikin': [
                'Altherma 3',
                'Altherma 3 H HT',
                'Altherma 3 M',
                'Altherma 3 R',
                'Altherma 3 H',
                'Altherma 3 GEO',
                'Monobloc EBLQ',
                'Multi Hybrid',
                'HPU Hybrid',
                'Altherma Flex'
            ],
            'Mitsubishi Electric': [
                'Ecodan PUD-SHWM',
                'Ecodan PUHZ-SW',
                'Ecodan PUHZ-SHW',
                'Ecodan QUHZ',
                'Zubadan PUHZ-HW',
                'Mr. Slim+ PUHZ-FRP',
                'Hydrobox EHSD',
                'Hydrobox ERSD',
                'Cylinder Unit EHPT',
                'Cylinder Unit EHST'
            ],

            // Solare Termico
            'Viessmann': [
                'Vitosol 200-FM',
                'Vitosol 100-FM',
                'Vitosol 300-TM',
                'Vitosol 200-TM',
                'Vitosol 141-FM',
                'Vitosol 111-F',
                'Vitosol 100-F',
                'Vitosol 300-T',
                'Vitosol 200-T',
                'Vitosol-B2'
            ],

            // Componenti Elettrici
            'Schneider': [
                'Acti 9',
                'ComPact NSX',
                'PowerPact',
                'TeSys',
                'Masterpact',
                'EasyPact',
                'Multi 9',
                'Zelio',
                'Modicon',
                'PowerLogic'
            ],
            'ABB': [
                'Tmax',
                'Emax',
                'Sace',
                'System pro M',
                'System pro E',
                'Smissline',
                'S200',
                'DS200',
                'OT',
                'AF'
            ],

            // Centraline
            'Siemens': [
                'RVL',
                'RVP',
                'RVD',
                'POL',
                'LMV',
                'RWF',
                'SEH62',
                'RWD',
                'QAA',
                'QAC'
            ],
            'Honeywell': [
                'Smile',
                'Aqua',
                'Lago',
                'MCR',
                'AX',
                'W6066',
                'T6376',
                'DT90',
                'CM900',
                'Evohome'
            ]
            // ... altri modelli per altre marche
        };

        // Aggiungiamo informazioni aggiuntive per ogni prodotto
        this.productInfo = {
            'Vaillant ecoTEC plus VMW': {
                potenze: ['24kW', '28kW', '32kW'],
                tipo: 'Condensazione',
                combustibile: 'Metano/GPL',
                efficienza: 'A+',
                scheda_tecnica: 'url_to_pdf',
                manuali: ['Installazione', 'Uso', 'Manutenzione'],
                ricambi_comuni: [
                    'Scambiatore primario',
                    'Valvola gas',
                    'Ventilatore'
                ],
                errori_comuni: {
                    'F.28': 'Mancata accensione',
                    'F.29': 'Perdita fiamma',
                    'F.75': 'Errore pressione'
                }
            },
            // ... altri prodotti
        };

        // Statistiche di utilizzo
        this.statistics = {
            mostUsed: {},
            recentlyViewed: [],
            favorites: new Set()
        };
    }

    setupUI() {
        this.setupSelectors();
        this.setupSearch();
        this.setupFilters();
        this.setupAdvancedSearch();
        this.setupProductDetails();
    }

    setupSelectors() {
        const brandSelect = document.getElementById('brandSelect');
        const modelSelect = document.getElementById('modelSelect');

        brandSelect.addEventListener('change', () => {
            const selectedBrand = brandSelect.value;
            this.updateModels(selectedBrand);
        });
    }

    loadBrandsForCategory(category) {
        const brandSelect = document.getElementById('brandSelect');
        brandSelect.innerHTML = '<option value="">Seleziona marca</option>';
        
        const brands = this.brands[category] || [];
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }

    updateModels(brand) {
        const modelSelect = document.getElementById('modelSelect');
        modelSelect.innerHTML = '<option value="">Seleziona modello</option>';
        
        const models = this.models[brand] || [];
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }

    setupSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Cerca prodotto...';
        searchInput.className = 'product-search';
        
        document.querySelector('.products-grid').before(searchInput);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterProducts(searchTerm);
        });
    }

    filterProducts(searchTerm) {
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => {
            const category = btn.dataset.category;
            const text = btn.textContent.toLowerCase();
            if (text.includes(searchTerm) || category.includes(searchTerm)) {
                btn.style.display = '';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    setupFilters() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        const filters = ['Tutti', 'Più usati', 'Recenti'];
        filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter;
            btn.addEventListener('click', () => this.applyFilter(filter));
            filterContainer.appendChild(btn);
        });

        document.querySelector('.products-grid').before(filterContainer);
    }

    setupAdvancedSearch() {
        const advancedSearchContainer = document.createElement('div');
        advancedSearchContainer.className = 'advanced-search hidden';
        
        const filters = {
            potenza: ['< 24kW', '24-35kW', '> 35kW'],
            tipo: ['Condensazione', 'Tradizionale', 'Ibrida'],
            efficienza: ['A++', 'A+', 'A', 'B'],
            combustibile: ['Metano', 'GPL', 'Gasolio']
        };

        Object.entries(filters).forEach(([category, options]) => {
            const select = document.createElement('select');
            select.className = 'advanced-filter';
            select.dataset.filter = category;
            
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = `Seleziona ${category}`;
            select.appendChild(defaultOption);

            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });

            advancedSearchContainer.appendChild(select);
        });

        document.querySelector('.products-grid').before(advancedSearchContainer);
    }

    setupProductDetails() {
        const modal = document.createElement('div');
        modal.className = 'product-modal hidden';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="product-title"></h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="product-info">
                    <div class="product-specs"></div>
                    <div class="product-docs"></div>
                    <div class="product-errors"></div>
                    <div class="product-parts"></div>
                </div>
                <div class="modal-actions">
                    <button class="btn-favorite">
                        <i class="fas fa-star"></i> Preferiti
                    </button>
                    <button class="btn-manual">
                        <i class="fas fa-book"></i> Manuale
                    </button>
                    <button class="btn-support">
                        <i class="fas fa-headset"></i> Supporto
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showProductDetails(product) {
        const info = this.productInfo[product];
        if (!info) return;

        const modal = document.querySelector('.product-modal');
        modal.querySelector('.product-title').textContent = product;

        // Popola specifiche
        const specs = modal.querySelector('.product-specs');
        specs.innerHTML = `
            <h3>Specifiche Tecniche</h3>
            <ul>
                <li>Potenza: ${info.potenze.join(', ')}</li>
                <li>Tipo: ${info.tipo}</li>
                <li>Combustibile: ${info.combustibile}</li>
                <li>Classe energetica: ${info.efficienza}</li>
            </ul>
        `;

        // Popola errori comuni
        const errors = modal.querySelector('.product-errors');
        errors.innerHTML = `
            <h3>Codici Errore Comuni</h3>
            <div class="error-grid">
                ${Object.entries(info.errori_comuni).map(([code, desc]) => `
                    <div class="error-item">
                        <strong>${code}</strong>
                        <span>${desc}</span>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.remove('hidden');
        this.addToRecentlyViewed(product);
    }

    addToRecentlyViewed(product) {
        this.statistics.recentlyViewed = 
            [product, ...this.statistics.recentlyViewed.filter(p => p !== product)]
                .slice(0, 10);
        this.saveStatistics();
    }

    toggleFavorite(product) {
        if (this.statistics.favorites.has(product)) {
            this.statistics.favorites.delete(product);
        } else {
            this.statistics.favorites.add(product);
        }
        this.saveStatistics();
    }

    saveStatistics() {
        localStorage.setItem('productStats', JSON.stringify({
            recentlyViewed: this.statistics.recentlyViewed,
            favorites: Array.from(this.statistics.favorites),
            mostUsed: this.statistics.mostUsed
        }));
    }

    loadRecentProducts() {
        const stats = localStorage.getItem('productStats');
        if (stats) {
            const parsed = JSON.parse(stats);
            this.statistics.recentlyViewed = parsed.recentlyViewed || [];
            this.statistics.favorites = new Set(parsed.favorites || []);
            this.statistics.mostUsed = parsed.mostUsed || {};
        }
    }

    applyFilter(filter) {
        const buttons = document.querySelectorAll('.category-btn');
        
        switch(filter) {
            case 'Tutti':
                buttons.forEach(btn => btn.style.display = '');
                break;
            case 'Più usati':
                const mostUsed = Object.entries(this.statistics.mostUsed)
                    .sort(([,a], [,b]) => b - a)
                    .map(([product]) => product);
                this.filterButtonsByProducts(buttons, mostUsed);
                break;
            case 'Recenti':
                this.filterButtonsByProducts(buttons, this.statistics.recentlyViewed);
                break;
            case 'Preferiti':
                this.filterButtonsByProducts(buttons, Array.from(this.statistics.favorites));
                break;
        }
    }

    filterButtonsByProducts(buttons, products) {
        buttons.forEach(btn => {
            const category = btn.dataset.category;
            if (products.includes(category)) {
                btn.style.display = '';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    loadFavorites() {
        // Implementa la logica per caricare i preferiti
        console.log('Caricamento preferiti');
    }
} 