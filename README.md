# 2UN Jovanovic - Bike Shop Website

Profesionalna web stranica za prodavnicu biciklističkih delova i servis u Pirotu, Srbija.

## Sadržaj

- **Početna stranica** - Prikaz brendova, kategorija, i usluga
- **Delovi** - Katalog biciklističkih delova sa filterima
- **Gume i Točkovi** - Specijalizovana kategorija za gume
- **Servis** - Informacije o servisnim uslugama
- **Kontakt** - Kontakt forma i informacije
- **Zahtev za Ponudu** - Sistem za slanje upita

## Tehnologije

- HTML5, CSS3, JavaScript
- Responsive dizajn (mobilni, tablet, desktop)
- Font Awesome ikone
- XML import sistem za proizvode

## Instalacija i Pokretanje

### 1. Instalacija Zavisnosti

```bash
cd bike-shop-site
npm install
```

### 2. Import Proizvoda iz XML Fajlova

XML fajlovi dobijeni od dobavljača (SHIMANO, KENDA, LAZER, PRO, CATEYE) treba da budu u folderu `articles/`.

Pokrenite import komandu:

```bash
npm run import
```

Ova komanda će:
- Pročitati sve XML fajlove iz `articles/` foldera
- Konvertovati ih u JSON format
- Kreirati `data/products.json` fajl za web stranicu

### 3. Pokretanje Web Stranice

Možete koristiti bilo koji lokalni web server. Primer sa Python-om:

```bash
npm run serve
```

Zatim otvorite browser na: `http://localhost:8000`

Ili koristite VS Code Live Server ili bilo koji drugi web server.

## Struktura Projekta

```
bike-shop-site/
├── index.html              # Početna stranica
├── products.html           # Stranica sa delovima
├── tires.html              # Stranica sa gumama
├── services.html           # Stranica sa servisima
├── contact.html            # Kontakt stranica
├── quote.html              # Forma za ponudu
├── css/
│   └── style.css           # Svi stilovi
├── js/
│   └── main.js             # JavaScript funkcionalnost
├── logo/
│   └── logo veci.jpg       # Logo firme
├── articles/               # XML fajlovi od dobavljača
│   ├── SHIMANO-stock-SRB.xml
│   ├── KENDA-stock-SRB.xml
│   ├── LAZER-stock-SRB.xml
│   ├── PRO-stock-SRB.xml
│   └── CATEYE-stock-SRB.xml
├── data/
│   └── products.json       # Generisani JSON sa proizvodima
├── images/                 # Folder za dodatne slike
├── import-xml.js           # Skripta za import XML fajlova
├── package.json            # NPM konfiguracija
└── README.md               # Ova datoteka
```

## Karakteristike

### Katalog Proizvoda

- **Filtriranje** po brendu, kategoriji, i dostupnosti
- **Pretraga** po nazivu i šifri proizvoda
- **Sortiranje** po ceni i imenu
- **Responsive grid** prikaz proizvoda
- Automatsko učitavanje slika iz XML fajlova

### Sistem za Ponude

Umesto online kupovine, korisnici mogu:
- Zatražiti ponudu za proizvod
- Poslati upit preko kontakt forme
- Direktno pozvati telefon

### XML Import Sistem

Import skripta automatski procesira:
- Šifru proizvoda (SKU)
- Naziv i opis
- Cenu (VP_Cena_Nakon_popusta_RSD)
- Količinu na stanju
- Slike proizvoda (do 4 slike)
- Kategorije i potkategorije
- Proizvođača

## Održavanje

### Ažuriranje Proizvoda

1. Skinite nove XML fajlove od dobavljača
2. Postavite ih u `articles/` folder
3. Pokrenite: `npm run import`
4. Osvežite web stranicu

### Dodavanje Novih Dobavljača

Ako dobijete XML fajlove od novih dobavljača:
1. Stavite XML fajl u `articles/` folder
2. Pokrenite `npm run import`
3. Sistem će automatski uključiti nove proizvode

## Kontakt Informacije

**2UN Jovanovic**
- Adresa: 7 Juli br 16, Pirot, Srbija
- Telefon: 067 708 6710
- Email: unjovanovic@gmail.com
- Radno vreme:
  - Ponedeljak - Petak: 09:00 - 19:00
  - Subota: 09:00 - 15:00
  - Nedelja: Zatvoreno

## Budući Dodaci

- Dodavanje kompletnih bicikala u katalog
- Online plaćanje (kada bude potrebno)
- Sistem za praćenje servisa
- Blog sa savetima za održavanje
- Galerija završenih projekata

## Podrška

Za pitanja ili probleme, kontaktirajte:
- Email: unjovanovic@gmail.com
- Telefon: 067 708 6710
