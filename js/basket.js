// Shopping Basket Functionality

class Basket {
    constructor() {
        this.items = this.loadBasket();
        this.updateBasketCount();
    }

    loadBasket() {
        const saved = localStorage.getItem('basket');
        return saved ? JSON.parse(saved) : [];
    }

    saveBasket() {
        localStorage.setItem('basket', JSON.stringify(this.items));
        this.updateBasketCount();
    }

    addItem(product, quantity = 1) {
        // Check if item already exists
        const existingIndex = this.items.findIndex(item => item.SKU === product.SKU);

        if (existingIndex >= 0) {
            // Update quantity
            this.items[existingIndex].quantity += quantity;
        } else {
            // Add new item
            this.items.push({
                SKU: product.SKU,
                Opis: product.Opis,
                Proizvođač: product.Proizvođač,
                VP_Cena_Nakon_popusta_RSD: product.VP_Cena_Nakon_popusta_RSD,
                Količina: product.Količina,
                Slika_1: product.Slika_1,
                Odeljak: product.Odeljak,
                kategorija: product.kategorija,
                quantity: quantity
            });
        }

        this.saveBasket();
        this.showNotification(`Dodato u korpu: ${product.Opis}`);
    }

    removeItem(sku) {
        this.items = this.items.filter(item => item.SKU !== sku);
        this.saveBasket();
    }

    updateQuantity(sku, quantity) {
        const item = this.items.find(item => item.SKU === sku);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveBasket();
        }
    }

    clearBasket() {
        this.items = [];
        this.saveBasket();
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (parseFloat(item.VP_Cena_Nakon_popusta_RSD) * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateBasketCount() {
        const countElements = document.querySelectorAll('#basketCount, .basket-count');
        const count = this.getItemCount();

        countElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'basket-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Add CSS if not already present
        if (!document.getElementById('basket-notification-style')) {
            const style = document.createElement('style');
            style.id = 'basket-notification-style';
            style.textContent = `
                .basket-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background-color: #10b981;
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    z-index: 10000;
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .basket-notification i {
                    font-size: 1.5rem;
                }

                .basket-count {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-color: #dc2626;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .cart-icon {
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global basket instance
const basket = new Basket();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Basket;
}
