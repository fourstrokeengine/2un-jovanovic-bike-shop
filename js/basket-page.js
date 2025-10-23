// Basket Page Functionality

function renderBasket() {
    const container = document.getElementById('basketContainer');

    if (!basket || basket.items.length === 0) {
        container.innerHTML = `
            <div class="basket-empty">
                <i class="fas fa-shopping-basket"></i>
                <h2>Vaša korpa je prazna</h2>
                <p>Dodajte proizvode u korpu da biste nastavili.</p>
                <a href="products.html" class="btn btn-primary" style="margin-top: 2rem;">
                    Pogledaj Proizvode
                </a>
            </div>
        `;
        return;
    }

    const basketHTML = `
        <div class="basket-content">
            <!-- Basket Items -->
            <div class="basket-items">
                <h2>Proizvodi u Korpi (${basket.items.length})</h2>
                ${basket.items.map(item => renderBasketItem(item)).join('')}
            </div>

            <!-- Basket Summary -->
            <div class="basket-summary">
                <h2>Pregled Porudžbine</h2>

                <div class="summary-row">
                    <span>Broj proizvoda:</span>
                    <span>${basket.getItemCount()}</span>
                </div>

                <div class="summary-row total">
                    <span>Ukupno:</span>
                    <span>${basket.getTotal().toLocaleString('sr-RS')} RSD</span>
                </div>

                <div class="basket-actions">
                    <a href="quote.html" class="btn-checkout">
                        <i class="fas fa-clipboard-list"></i> Zatraži Ponudu
                    </a>
                    <a href="products.html" class="btn-continue">
                        <i class="fas fa-arrow-left"></i> Nastavi Kupovinu
                    </a>
                    <button class="btn-clear" onclick="clearBasketConfirm()">
                        Isprazni Korpu
                    </button>
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--light-gray);">
                    <p style="font-size: 0.9rem; color: var(--gray);">
                        <i class="fas fa-info-circle"></i>
                        Nakon slanja zahteva za ponudu, kontaktiraćemo vas sa tačnom cenom i dostupnošću.
                    </p>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = basketHTML;
}

function renderBasketItem(item) {
    const price = parseFloat(item.VP_Cena_Nakon_popusta_RSD);
    const itemTotal = price * item.quantity;
    const hasImage = item.Slika_1 && item.Slika_1.trim() !== '';

    return `
        <div class="basket-item" data-sku="${item.SKU}">
            ${hasImage ?
                `<img src="${item.Slika_1}" alt="${item.Opis}" class="basket-item-image">` :
                `<div class="basket-item-image placeholder"><i class="fas fa-image"></i></div>`
            }

            <div class="basket-item-details">
                <div class="basket-item-brand">${item.Proizvođač}</div>
                <h3>${item.Opis}</h3>
                <div class="basket-item-sku">Šifra: ${item.SKU}</div>
                <div class="basket-item-price">${price.toLocaleString('sr-RS')} RSD</div>
            </div>

            <div class="basket-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.SKU}')">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="quantity-display">${item.quantity}</div>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.SKU}')">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div style="font-weight: 700; font-size: 1.1rem; color: var(--dark-blue);">
                    ${itemTotal.toLocaleString('sr-RS')} RSD
                </div>
                <button class="remove-item" onclick="removeFromBasket('${item.SKU}')">
                    <i class="fas fa-trash"></i> Ukloni
                </button>
            </div>
        </div>
    `;
}

function increaseQuantity(sku) {
    const item = basket.items.find(i => i.SKU === sku);
    if (item) {
        const maxStock = parseInt(item.Količina) || 999;
        if (item.quantity < maxStock) {
            basket.updateQuantity(sku, item.quantity + 1);
            renderBasket();
        } else {
            alert(`Maksimalna dostupna količina je ${maxStock} komada.`);
        }
    }
}

function decreaseQuantity(sku) {
    const item = basket.items.find(i => i.SKU === sku);
    if (item) {
        if (item.quantity > 1) {
            basket.updateQuantity(sku, item.quantity - 1);
            renderBasket();
        } else {
            removeFromBasket(sku);
        }
    }
}

function removeFromBasket(sku) {
    if (confirm('Da li ste sigurni da želite da uklonite ovaj proizvod iz korpe?')) {
        basket.removeItem(sku);
        renderBasket();
    }
}

function clearBasketConfirm() {
    if (confirm('Da li ste sigurni da želite da ispraznite celu korpu?')) {
        basket.clearBasket();
        renderBasket();
    }
}

// Initialize basket page
if (document.getElementById('basketContainer')) {
    renderBasket();
}
