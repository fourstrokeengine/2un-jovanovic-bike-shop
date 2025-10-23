#!/usr/bin/env node

/**
 * XML Import Tool for 2UN Jovanovic Bike Shop
 *
 * This tool imports XML product files from dealers (SHIMANO, KENDA, LAZER, PRO, CATEYE)
 * and converts them to a unified JSON format for the website.
 *
 * Usage: node import-xml.js
 */

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const ARTICLES_DIR = path.join(__dirname, 'articles');
const OUTPUT_FILE = path.join(__dirname, 'data', 'products.json');

async function parseXMLFile(filePath) {
    try {
        const xmlData = fs.readFileSync(filePath, 'utf8');
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);
        return result;
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error.message);
        return null;
    }
}

async function importAllXMLFiles() {
    console.log('Starting XML import process...\n');

    const xmlFiles = fs.readdirSync(ARTICLES_DIR)
        .filter(file => file.endsWith('.xml'))
        .map(file => path.join(ARTICLES_DIR, file));

    console.log(`Found ${xmlFiles.length} XML files to import:`);
    xmlFiles.forEach(file => console.log(`  - ${path.basename(file)}`));
    console.log('');

    let allProducts = [];
    let stats = {
        totalFiles: xmlFiles.length,
        successfulFiles: 0,
        totalProducts: 0,
        inStockProducts: 0,
        withImages: 0
    };

    for (const xmlFile of xmlFiles) {
        console.log(`Processing: ${path.basename(xmlFile)}...`);

        const parsedData = await parseXMLFile(xmlFile);

        if (parsedData && parsedData.Products && parsedData.Products.Product) {
            const products = parsedData.Products.Product;
            const fileProductCount = products.length;
            const inStock = products.filter(p => parseInt(p.Količina?.[0] || 0) > 0).length;
            const withImages = products.filter(p => p.Slika_1?.[0] && p.Slika_1[0].trim() !== '').length;

            console.log(`  ✓ Imported ${fileProductCount} products (${inStock} in stock, ${withImages} with images)`);

            // Flatten the XML structure
            const flatProducts = products.map(product => {
                const flat = {};
                for (const key in product) {
                    if (Array.isArray(product[key]) && product[key].length > 0) {
                        flat[key] = product[key][0];
                    } else {
                        flat[key] = product[key];
                    }
                }
                return flat;
            });

            allProducts = allProducts.concat(flatProducts);
            stats.successfulFiles++;
            stats.totalProducts += fileProductCount;
            stats.inStockProducts += inStock;
            stats.withImages += withImages;
        } else {
            console.log(`  ✗ Failed to parse file`);
        }
        console.log('');
    }

    // Ensure data directory exists
    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2), 'utf8');

    console.log('═══════════════════════════════════════════════');
    console.log('Import completed successfully!');
    console.log('═══════════════════════════════════════════════');
    console.log(`Files processed: ${stats.successfulFiles}/${stats.totalFiles}`);
    console.log(`Total products: ${stats.totalProducts}`);
    console.log(`Products in stock: ${stats.inStockProducts}`);
    console.log(`Products with images: ${stats.withImages}`);
    console.log(`Output file: ${OUTPUT_FILE}`);
    console.log('═══════════════════════════════════════════════\n');

    return allProducts;
}

// Run the import
if (require.main === module) {
    importAllXMLFiles().catch(error => {
        console.error('Fatal error during import:', error);
        process.exit(1);
    });
}

module.exports = { importAllXMLFiles, parseXMLFile };
