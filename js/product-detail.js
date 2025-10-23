// Product Detail Page

async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const sku = urlParams.get('sku');

    if (!sku) {
        displayError('Proizvod nije pronađen.');
        return;
    }

    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products');
        }

        const products = await response.json();
        const product = products.find(p => p.SKU === sku);

        if (!product) {
            displayError('Proizvod nije pronađen.');
            return;
        }

        displayProductDetail(product);
    } catch (error) {
        console.error('Error loading product:', error);
        displayError('Greška pri učitavanju proizvoda.');
    }
}

function displayProductDetail(product) {
    const container = document.getElementById('productDetailContainer');
    const price = parseFloat(product.VP_Cena_Nakon_popusta_RSD);
    const stock = parseInt(product.Količina);

    // Collect all available images
    const images = [product.Slika_1, product.Slika_2, product.Slika_3, product.Slika_4]
        .filter(img => img && img.trim() !== '');

    const hasImages = images.length > 0;

    container.innerHTML = `
        <!-- Product Images -->
        <div class="product-images">
            ${hasImages ?
                `<img src="${images[0]}" alt="${product.Opis}" class="main-image" id="mainImage">` :
                `<div class="main-image placeholder"><i class="fas fa-image"></i></div>`
            }
            ${images.length > 1 ? `
                <div class="thumbnail-images">
                    ${images.map((img, index) => `
                        <img src="${img}"
                             alt="${product.Opis}"
                             class="thumbnail ${index === 0 ? 'active' : ''}"
                             onclick="changeMainImage('${img}', this)">
                    `).join('')}
                </div>
            ` : ''}
        </div>

        <!-- Product Info -->
        <div class="product-info-detail">
            <div class="product-brand-detail">${product.Proizvođač}</div>
            <h1 class="product-title">${product.Opis}</h1>
            <div class="product-sku-detail">Šifra: ${product.SKU}</div>

            <div class="product-price-detail">${price.toLocaleString('sr-RS')} RSD</div>

            <div class="product-stock-detail ${stock > 0 ? 'in-stock' : 'out-of-stock'}">
                ${stock > 0 ?
                    `<i class="fas fa-check-circle"></i> Na stanju: ${stock} komada` :
                    `<i class="fas fa-times-circle"></i> Trenutno nije na stanju`
                }
            </div>

            ${product.Odeljak || product.kategorija || product.potkategoriju ? `
                <div class="product-categories">
                    <strong>Kategorije:</strong>
                    <div class="category-badges">
                        ${product.Odeljak ? `<span class="category-badge"><i class="fas fa-folder"></i> ${product.Odeljak}</span>` : ''}
                        ${product.kategorija ? `<span class="category-badge"><i class="fas fa-tag"></i> ${product.kategorija}</span>` : ''}
                        ${product.potkategoriju ? `<span class="category-badge"><i class="fas fa-tags"></i> ${product.potkategoriju}</span>` : ''}
                    </div>
                </div>
            ` : ''}

            <div class="quantity-selector">
                <label for="quantity">Količina:</label>
                <input type="number"
                       id="quantity"
                       class="quantity-input"
                       value="1"
                       min="1"
                       max="${stock > 0 ? stock : 999}">
            </div>

            <div class="product-actions-detail">
                <button class="btn-add-basket" onclick="addToBasket()">
                    <i class="fas fa-shopping-basket"></i> Dodaj u Korpu
                </button>
                <a href="quote.html?sku=${product.SKU}" class="btn-quote-detail">
                    <i class="fas fa-clipboard-list"></i> Ponuda
                </a>
            </div>

            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--light-gray);">
                <p style="color: var(--gray);">
                    <i class="fas fa-info-circle"></i> Za dodatne informacije ili veće količine,
                    <a href="contact.html" style="color: var(--primary-blue);">kontaktirajte nas</a>
                    ili pozovite <strong>067 708 6710</strong>
                </p>
            </div>
        </div>
    `;

    // Store product data for basket
    window.currentProduct = product;
}

function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (thumbnail) {
        thumbnail.classList.add('active');
    }
}

function addToBasket() {
    if (!window.currentProduct) {
        alert('Greška pri dodavanju u korpu.');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const stock = parseInt(window.currentProduct.Količina);

    if (stock > 0 && quantity > stock) {
        alert(`Maksimalna dostupna količina je ${stock} komada.`);
        return;
    }

    basket.addItem(window.currentProduct, quantity);
}

function displayError(message) {
    const container = document.getElementById('productDetailContainer');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--gray); margin-bottom: 1rem;"></i>
            <h2 style="color: var(--dark-gray);">${message}</h2>
            <a href="products.html" class="btn btn-primary" style="margin-top: 2rem;">
                Nazad na proizvode
            </a>
        </div>
    `;
}

// Load product on page load
if (document.getElementById('productDetailContainer')) {
    loadProductDetail();
}
