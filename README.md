# Website Wareng Jaya Teknik

![Banner Wareng Jaya Teknik](public/images/welding.webp)

## Tentang Proyek Ini

Wareng Jaya Teknik adalah website bengkel las yang dibangun dengan React dan Vite. Website ini menampilkan layanan perusahaan dalam bidang fabrikasi logam, solusi rekayasa, dan keahlian teknis.

### Fitur Utama

- **Desain Industrial "Steelworks"**: Sistem desain berbasis token (OKLCH) dengan Tailwind CSS 4, tipografi Oswald/Inter/JetBrains Mono (self-hosted via Fontsource)
- **Tata Letak Responsif**: Dioptimalkan untuk semua perangkat dari ponsel hingga desktop
- **Dioptimalkan untuk Kinerja**: Pemuatan cepat dengan bundling Vite dan lazy-loading per halaman
- **Mode Gelap/Terang**: Pengalihan tema via kelas `.dark` (Tailwind v4 `@custom-variant`)
- **Aksesibel**: Focus ring terlihat, target sentuh ≥ 44px, animasi menghormati `prefers-reduced-motion`, lightbox galeri dapat dioperasikan keyboard
- **Ramah SEO**: Dilengkapi meta tag, data terstruktur, dan sitemap
- **UI Beranimasi**: Animasi reveal halus menggunakan Framer Motion
- **Galeri Gambar**: Pameran proyek dengan fungsionalitas lightbox
- **Kontak via WhatsApp**: Formulir kontak yang mengarahkan pesan langsung ke WhatsApp
- **Blog**: Menampilkan artikel terkait industri, tips, dan pembaruan

### Halaman

- **Beranda**: Pengenalan bengkel, layanan, hasil kerja, dan alur kerja
- **Tentang Kami**: Cerita bengkel dan cara kami bekerja
- **Layanan**: Penawaran layanan secara detail dengan spesifikasi material
- **Galeri Proyek**: Pameran proyek-proyek yang telah diselesaikan
- **Kontak**: Kanal kontak (WhatsApp, telepon, alamat) dan formulir
- **Blog**: Menampilkan artikel terkait industri, tips, dan pembaruan

## Stack Teknologi

- **Framework Frontend**: React 18
- **Build Tool**: Vite 7
- **Framework CSS**: Tailwind CSS 4 (konfigurasi CSS-first via `@theme`)
- **Routing**: React Router 7
- **Animasi**: Framer Motion
- **Ikon**: React Icons
- **Font**: Fontsource (Oswald, Inter, JetBrains Mono — self-hosted)
- **SEO**: React Helmet Async
- **Galeri Gambar**: Yet Another React Lightbox

## Panduan Instalasi

### Prasyarat

- Node.js (v18.0.0 atau lebih tinggi)
- npm (v8.0.0 atau lebih tinggi) atau yarn (v1.22.0 atau lebih tinggi)

### Pengaturan Pengembangan Lokal

1. **Klon repositori**

   ```bash
   git clone https://github.com/teggar4ar/wareng-jaya-teknik.git
   cd wareng-jaya-teknik
   ```

2. **Instal dependensi**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Mulai server pengembangan**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser Anda**
   
   Server pengembangan akan berjalan di [http://localhost:5173](http://localhost:5173)

### Script yang Tersedia

- `npm run dev` - Memulai server pengembangan
- `npm run build` - Membangun proyek untuk produksi
- `npm run preview` - Melihat pratinjau build produksi secara lokal
- `npm run lint` - Menjalankan ESLint untuk memeriksa masalah kode

## Deployment Produksi

### Build untuk Produksi

1. **Buat build produksi yang dioptimalkan**

   ```bash
   npm run build
   # atau
   yarn build
   ```

   Ini akan menghasilkan folder `dist` dengan semua aset yang dioptimalkan.

2. **Pratinjau build produksi secara lokal (opsional)**

   ```bash
   npm run preview
   # atau
   yarn preview
   ```

### Opsi Deployment

#### Opsi 1: Hosting Statis (Direkomendasikan)

Anda dapat men-deploy folder `dist` ke layanan hosting statis manapun:

- **Netlify**
  - Hubungkan repositori GitHub Anda
  - Atur perintah build: `npm run build`
  - Atur direktori publikasi: `dist`
  - Konfigurasikan variabel lingkungan jika diperlukan

- **Vercel**
  - Hubungkan repositori GitHub Anda
  - Vercel akan secara otomatis mendeteksi konfigurasi Vite
  - Konfigurasikan variabel lingkungan jika diperlukan

- **GitHub Pages**
  1. Perbarui `vite.config.js` untuk menyertakan jalur dasar:
     ```javascript
     export default defineConfig({
       base: '/wareng-jaya-teknik/',
       // konfigurasi lainnya...
     })
     ```
  2. Buat script deployment atau gunakan GitHub Actions

#### Opsi 2: Hosting Web Tradisional

1. Unggah konten folder `dist` ke server web Anda
2. Pastikan semua permintaan dialihkan ke `index.html` untuk routing sisi klien
3. Atur header cache yang sesuai untuk aset statis

## Konfigurasi Lingkungan

Buat file `.env` di direktori utama untuk variabel lingkungan:

```
VITE_API_URL=url_api_anda_di_sini
VITE_GOOGLE_MAPS_API_KEY=kunci_api_google_maps_anda_di_sini
```

Untuk produksi, atur variabel-variabel ini dalam konfigurasi lingkungan penyedia hosting Anda.

## Dukungan Browser

- Chrome (2 versi terbaru)
- Firefox (2 versi terbaru)
- Safari (2 versi terbaru)
- Edge (2 versi terbaru)

## Kontribusi

1. Fork repositori ini
2. Buat branch fitur Anda: `git checkout -b feature/fitur-luar-biasa`
3. Commit perubahan Anda: `git commit -m 'Menambahkan fitur luar biasa'`
4. Push ke branch: `git push origin feature/fitur-luar-biasa`
5. Buka Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detail.

## Kontak

Untuk pertanyaan apapun tentang website ini, silakan hubungi melalui halaman kontak di [warengjayateknik.my.id](https://warengjayateknik.my.id/contact).
