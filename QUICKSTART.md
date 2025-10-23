# 🚴 2UN Jovanovic - Quick Start Guide

## ✅ What Has Been Created

Your complete bike shop website is ready! Here's what you have:

### Pages Created (7 total)

1. **index.html** - Homepage with hero section, brands, categories, and services highlight
2. **products.html** - Parts catalog with advanced filtering and search
3. **tires.html** - Dedicated tires and wheels catalog
4. **services.html** - Bike repair and service information page
5. **contact.html** - Contact form and business information
6. **quote.html** - Quote request system for customers
7. **README.md** - Complete documentation

### Features Implemented

✅ **Blue & White Color Scheme** - Professional, trustworthy design
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **5,522 Products Imported** - From all your XML files (SHIMANO, KENDA, LAZER, PRO, CATEYE)
✅ **Advanced Filtering** - By brand, category, stock availability
✅ **Search Functionality** - Search by product name or SKU
✅ **Quote Request System** - Customers can request quotes instead of direct checkout
✅ **Services Page** - Dedicated page for your bike repair services
✅ **Contact Forms** - Email integration for customer inquiries
✅ **XML Import Tool** - Automated system to update products from supplier XML files

### Product Statistics

- **Total Products**: 5,522
- **In Stock**: 1,388 products
- **With Images**: 4,919 products
- **Brands**: SHIMANO, KENDA, LAZER, PRO, CATEYE

## 🚀 How to Run Your Website

### Option 1: Using the Start Script (Easiest)

```bash
./start.sh
```

Then open your browser to: **http://localhost:8000**

### Option 2: Using NPM

```bash
npm run serve
```

Then open your browser to: **http://localhost:8000**

### Option 3: Using Python Directly

```bash
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

## 📦 Updating Products from XML Files

Whenever you receive new XML files from your suppliers:

1. Place the XML files in the `articles/` folder
2. Run the import command:
   ```bash
   npm run import
   ```
3. Refresh your website - products are automatically updated!

## 📱 Your Store Information

All your business information is already integrated:

- **Store Name**: 2UN Jovanovic
- **Address**: 7 Juli br 16, Pirot, Srbija
- **Phone**: 067 708 6710
- **Email**: unjovanovic@gmail.com
- **Hours**:
  - Monday-Friday: 09:00-19:00
  - Saturday: 09:00-15:00
  - Sunday: Closed

## 🎨 Design Features

- **Color Scheme**: Blue (#2563eb) and White - professional and trustworthy
- **Logo**: Your logo is displayed in the navigation
- **Fonts**: Clean, modern sans-serif fonts
- **Icons**: Font Awesome icons throughout
- **Layout**: Card-based, modern design inspired by your template

## 📂 Project Structure

```
bike-shop-site/
├── index.html              # Homepage
├── products.html           # Parts catalog
├── tires.html              # Tires catalog
├── services.html           # Service information
├── contact.html            # Contact page
├── quote.html              # Quote request
├── css/style.css           # All styles
├── js/main.js              # JavaScript functionality
├── logo/logo veci.jpg      # Your logo
├── articles/               # XML files from suppliers
├── data/products.json      # Generated product database
└── import-xml.js           # XML import tool
```

## 🔧 Next Steps (Optional)

1. **Add Hero Images**: Place bike/shop images in `images/hero/` folder
2. **Customize Colors**: Edit CSS variables in `css/style.css` (lines 10-18)
3. **Add Social Media**: Update footer when you create social media pages
4. **Deploy Online**: Upload to web hosting or use services like Netlify, Vercel
5. **Add Google Maps**: Replace map placeholder in contact.html with real Google Maps embed

## 🌐 How Customers Use Your Site

1. **Browse Products**: Filter by brand, category, search by name/SKU
2. **Request Quote**: Click "Zatraži Ponudu" on any product
3. **Fill Quote Form**: Enter their details and what they need
4. **You Get Email**: Customer requests come to unjovanovic@gmail.com
5. **You Respond**: Contact them with pricing and availability

## 📧 Email Integration

All forms send to: **unjovanovic@gmail.com**

- Contact form → Your email
- Quote requests → Your email
- All inquiries → Your email

## 💡 Tips

- **Update Products Weekly**: Run `npm run import` when you get new XML files
- **Check Products**: Browse products.html to see all your inventory
- **Test Forms**: Try the contact and quote forms to ensure they work
- **Mobile Test**: View the site on your phone to see responsive design

## ❓ Need Help?

All information is in the `README.md` file. The website is complete and ready to use!

## 🎉 You're All Set!

Your bike shop website is fully functional with:
- ✅ 5,522 products loaded
- ✅ All pages created
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Quote request system
- ✅ XML import automation

Just run `./start.sh` and your website will be live on localhost!
