class Scanner {
    constructor() {
        this.isInitialized = false;
        this.lastResult = null;
        this.scanTimeout = null;
    }

    async initialize() {
        if (this.isInitialized) return;

        try {
            // Aggiungiamo l'indicatore di caricamento
            this.showLoading();

            await Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#interactive"),
                    constraints: {
                        facingMode: "environment",
                        aspectRatio: { min: 1, max: 2 }
                    },
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true
                },
                numOfWorkers: navigator.hardwareConcurrency || 4,
                decoder: {
                    readers: [
                        "ean_reader",
                        "ean_8_reader",
                        "code_128_reader",
                        "code_39_reader",
                        "qr_reader"
                    ]
                },
                locate: true
            });
            
            Quagga.start();
            this.isInitialized = true;
            this.hideLoading();

            // Aggiungiamo overlay per feedback visivo
            this.createOverlay();
            
            Quagga.onDetected(this.onBarcodeDetected.bind(this));
            Quagga.onProcessed(this.onProcessed.bind(this));
        } catch (err) {
            console.error("Errore nell'inizializzazione dello scanner:", err);
            this.showError("Impossibile accedere alla fotocamera. Verifica i permessi.");
        }
    }

    createOverlay() {
        const viewport = document.querySelector("#interactive");
        const overlay = document.createElement('div');
        overlay.className = 'scanner-overlay';
        
        const scanRegion = document.createElement('div');
        scanRegion.className = 'scan-region';
        
        overlay.appendChild(scanRegion);
        viewport.appendChild(overlay);
    }

    onProcessed(result) {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                result.boxes.filter(box => box !== result.box).forEach(box => {
                    drawingCtx.strokeStyle = "green";
                    drawingCtx.strokeRect(box.x, box.y, box.width, box.height);
                });
            }

            if (result.box) {
                drawingCtx.strokeStyle = "blue";
                drawingCtx.strokeRect(
                    result.box.x, result.box.y,
                    result.box.width, result.box.height
                );
            }
        }
    }

    onBarcodeDetected(result) {
        const code = result.codeResult.code;
        
        // Evita scansioni duplicate
        if (this.lastResult === code) return;
        this.lastResult = code;
        
        // Feedback visivo e aptico
        this.provideFeedback();

        // Resetta il risultato dopo un po'
        clearTimeout(this.scanTimeout);
        this.scanTimeout = setTimeout(() => {
            this.lastResult = null;
        }, 2000);

        this.stop();
        this.redirectToProduct(code);
    }

    provideFeedback() {
        // Feedback visivo
        const overlay = document.querySelector('.scanner-overlay');
        overlay.classList.add('success');
        setTimeout(() => overlay.classList.remove('success'), 500);

        // Feedback aptico (vibrazione)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // Feedback sonoro
        this.playBeepSound();
    }

    playBeepSound() {
        const beep = new Audio('data:audio/wav;base64,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');
        beep.play();
    }

    showLoading() {
        const viewport = document.querySelector("#interactive");
        const loading = document.createElement('div');
        loading.className = 'loading';
        viewport.appendChild(loading);
    }

    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();
    }

    showError(message) {
        const viewport = document.querySelector("#interactive");
        const error = document.createElement('div');
        error.className = 'scanner-error';
        error.textContent = message;
        viewport.appendChild(error);
    }

    stop() {
        if (this.isInitialized) {
            Quagga.stop();
            this.isInitialized = false;
            this.lastResult = null;
            clearTimeout(this.scanTimeout);
        }
    }

    async redirectToProduct(code) {
        try {
            // Cerca il prodotto nel database locale
            const product = await this.lookupProduct(code);
            if (product) {
                // Emetti un evento personalizzato con i dettagli del prodotto
                const event = new CustomEvent('productScanned', {
                    detail: product
                });
                document.dispatchEvent(event);
            } else {
                this.showError("Prodotto non trovato");
            }
        } catch (error) {
            console.error("Errore nel reindirizzamento:", error);
            this.showError("Errore nel caricamento del prodotto");
        }
    }

    async lookupProduct(code) {
        // Implementa la logica per cercare il prodotto nel database
        // Per ora restituiamo un mock
        return {
            code: code,
            brand: "Esempio Brand",
            model: "Modello Test"
        };
    }
} 