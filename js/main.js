// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Product Data Management
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
    }

    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            this.products = await response.json();
            this.filteredProducts = [...this.products];
            return this.products;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }

    filterProducts(filters) {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            if (filters.search && !product.Opis.toLowerCase().includes(filters.search.toLowerCase()) &&
                !product.SKU.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // Brand filter
            if (filters.brand && filters.brand !== 'all' && product.Proizvođač !== filters.brand) {
                return false;
            }

            // Department filter (Odeljak)
            if (filters.odeljak && filters.odeljak !== 'all' && product.Odeljak !== filters.odeljak) {
                return false;
            }

            // Category filter (kategorija)
            if (filters.kategorija && filters.kategorija !== 'all' && product.kategorija !== filters.kategorija) {
                return false;
            }

            // Subcategory filter (potkategoriju)
            if (filters.potkategorija && filters.potkategorija !== 'all' && product.potkategoriju !== filters.potkategorija) {
                return false;
            }

            // Stock filter
            if (filters.inStock && parseInt(product.Količina) <= 0) {
                return false;
            }

            return true;
        });

        return this.filteredProducts;
    }

    sortProducts(sortBy) {
        switch (sortBy) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) =>
                    parseFloat(a.VP_Cena_Nakon_popusta_RSD) - parseFloat(b.VP_Cena_Nakon_popusta_RSD));
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) =>
                    parseFloat(b.VP_Cena_Nakon_popusta_RSD) - parseFloat(a.VP_Cena_Nakon_popusta_RSD));
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.Opis.localeCompare(b.Opis));
                break;
            default:
                break;
        }
        return this.filteredProducts;
    }

    getUniqueBrands() {
        return [...new Set(this.products.map(p => p.Proizvođač))].sort();
    }

    getUniqueOdeljci() {
        return [...new Set(this.products.map(p => p.Odeljak))].filter(c => c).sort();
    }

    getKategorijeForOdeljak(odeljak) {
        if (!odeljak || odeljak === 'all') {
            return [...new Set(this.products.map(p => p.kategorija))].filter(c => c).sort();
        }
        return [...new Set(
            this.products
                .filter(p => p.Odeljak === odeljak)
                .map(p => p.kategorija)
        )].filter(c => c).sort();
    }

    getPotkategorijeForKategorija(kategorija, odeljak) {
        let filtered = this.products;
        if (odeljak && odeljak !== 'all') {
            filtered = filtered.filter(p => p.Odeljak === odeljak);
        }
        if (kategorija && kategorija !== 'all') {
            filtered = filtered.filter(p => p.kategorija === kategorija);
        }
        return [...new Set(filtered.map(p => p.potkategoriju))].filter(c => c).sort();
    }
}

// Product Display
function displayProducts(products, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<div class="loading">Nema proizvoda koji odgovaraju filterima.</div>';
        return;
    }

    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const price = parseFloat(product.VP_Cena_Nakon_popusta_RSD);
    const stock = parseInt(product.Količina);
    const hasImage = product.Slika_1 && product.Slika_1.trim() !== '';

    return `
        <div class="product-card">
            <a href="product.html?sku=${product.SKU}" class="product-card-link">
                ${hasImage ?
                    `<img src="${product.Slika_1}" alt="${product.Opis}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="product-image placeholder" style="display:none;"><i class="fas fa-image"></i></div>` :
                    `<div class="product-image placeholder"><i class="fas fa-image"></i></div>`
                }
                <div class="product-info">
                    <div class="product-brand">${product.Proizvođač}</div>
                    <div class="product-name">${product.Opis}</div>
                    <div class="product-sku">Šifra: ${product.SKU}</div>
                    <div class="product-price">${price.toLocaleString('sr-RS')} RSD</div>
                    <div class="product-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${stock > 0 ? `Na stanju: ${stock}` : 'Nije na stanju'}
                    </div>
                </div>
            </a>
            <div class="product-actions">
                <button class="btn-add-to-basket" onclick="addProductToBasket('${product.SKU}', event)" ${stock <= 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-basket"></i> Dodaj
                </button>
                <a href="product.html?sku=${product.SKU}" class="btn-view-product">
                    <i class="fas fa-eye"></i>
                </a>
            </div>
        </div>
    `;
}

// Add product to basket from product card
function addProductToBasket(sku, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Find product in current filtered products or all products
    let product;
    if (typeof productManager !== 'undefined') {
        product = productManager.products.find(p => p.SKU === sku);
    }

    if (product && typeof basket !== 'undefined') {
        basket.addItem(product, 1);
    }
}

// Initialize product page
if (document.getElementById('productsGrid')) {
    const productManager = new ProductManager();

    productManager.loadProducts().then(products => {
        displayProducts(products);

        // Get filter elements
        const brandFilter = document.getElementById('brandFilter');
        const odeljakFilter = document.getElementById('odeljakFilter');
        const kategorijaFilter = document.getElementById('kategorijaFilter');
        const potkategorijaFilter = document.getElementById('potkategorijaFilter');
        const searchInput = document.getElementById('searchInput');
        const stockFilter = document.getElementById('stockFilter');
        const sortSelect = document.getElementById('sortSelect');

        // Populate brand filter
        if (brandFilter) {
            const brands = productManager.getUniqueBrands();
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand;
                option.textContent = brand;
                brandFilter.appendChild(option);
            });
        }

        // Populate Odeljak filter
        if (odeljakFilter) {
            const odeljci = productManager.getUniqueOdeljci();
            odeljci.forEach(odeljak => {
                const option = document.createElement('option');
                option.value = odeljak;
                option.textContent = odeljak;
                odeljakFilter.appendChild(option);
            });
        }

        // Update kategorija filter when Odeljak changes
        function updateKategorijaFilter() {
            if (!kategorijaFilter) return;

            const selectedOdeljak = odeljakFilter ? odeljakFilter.value : 'all';
            kategorijaFilter.innerHTML = '<option value="all">Sve kategorije</option>';

            const kategorije = productManager.getKategorijeForOdeljak(selectedOdeljak);
            kategorije.forEach(kategorija => {
                const option = document.createElement('option');
                option.value = kategorija;
                option.textContent = kategorija;
                kategorijaFilter.appendChild(option);
            });

            updatePotkategorijaFilter();
        }

        // Update potkategorija filter when kategorija changes
        function updatePotkategorijaFilter() {
            if (!potkategorijaFilter) return;

            const selectedOdeljak = odeljakFilter ? odeljakFilter.value : 'all';
            const selectedKategorija = kategorijaFilter ? kategorijaFilter.value : 'all';
            potkategorijaFilter.innerHTML = '<option value="all">Sve potkategorije</option>';

            const potkategorije = productManager.getPotkategorijeForKategorija(selectedKategorija, selectedOdeljak);
            potkategorije.forEach(potkategorija => {
                const option = document.createElement('option');
                option.value = potkategorija;
                option.textContent = potkategorija;
                potkategorijaFilter.appendChild(option);
            });
        }

        // Apply filters
        function applyFilters() {
            const filters = {
                search: searchInput ? searchInput.value : '',
                brand: brandFilter ? brandFilter.value : 'all',
                odeljak: odeljakFilter ? odeljakFilter.value : 'all',
                kategorija: kategorijaFilter ? kategorijaFilter.value : 'all',
                potkategorija: potkategorijaFilter ? potkategorijaFilter.value : 'all',
                inStock: stockFilter ? stockFilter.checked : false
            };

            productManager.filterProducts(filters);

            if (sortSelect) {
                productManager.sortProducts(sortSelect.value);
            }

            displayProducts(productManager.filteredProducts);

            // Update product count
            updateProductCount(productManager.filteredProducts.length);
        }

        function updateProductCount(count) {
            const countElement = document.getElementById('productCount');
            if (countElement) {
                countElement.textContent = `${count} proizvoda`;
            }
        }

        // Set up filter listeners
        if (searchInput) searchInput.addEventListener('input', applyFilters);
        if (brandFilter) brandFilter.addEventListener('change', applyFilters);
        if (stockFilter) stockFilter.addEventListener('change', applyFilters);
        if (sortSelect) sortSelect.addEventListener('change', applyFilters);

        if (odeljakFilter) {
            odeljakFilter.addEventListener('change', () => {
                updateKategorijaFilter();
                applyFilters();
            });
        }

        if (kategorijaFilter) {
            kategorijaFilter.addEventListener('change', () => {
                updatePotkategorijaFilter();
                applyFilters();
            });
        }

        if (potkategorijaFilter) {
            potkategorijaFilter.addEventListener('change', applyFilters);
        }

        // Initialize hierarchical filters
        updateKategorijaFilter();
        updateProductCount(products.length);

        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const odeljakParam = urlParams.get('odeljak');
        if (odeljakParam && odeljakFilter) {
            odeljakFilter.value = odeljakParam;
            updateKategorijaFilter();
            applyFilters();
        }
    });
}
