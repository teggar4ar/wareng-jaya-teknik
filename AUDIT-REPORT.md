# Laporan Audit Website — warengjayateknik.my.id

**Tanggal audit:** 30 Juli 2026
**Tools:** squirrelscan CLI v0.0.80 (crawl live, 19 halaman, coverage `surface` + `full`), pemeriksaan header HTTP manual, dan review source code repo.
**Stack terdeteksi:** React (Vite), Vercel Edge Network, Google Analytics 4.

---

## 1. Ringkasan Eksekutif

| Grup | Skor | Error | Warning |
|---|---|---|---|
| **Overall** | **49 / 100 (Grade F)** | 22 | 304 |
| SEO | 49 | 20 | 184 |
| Performance | 59 | 1 | 39 |
| Security | 87 | 0 | 3 |
| Agent Experience (AI/LLM) | 41 | 1 | 19 |

Rincian per kategori: Core SEO 43 · Content 37 · Links 47 · Accessibility 54 · Legal 44 · E-E-A-T 71 · Crawlability 95 · Security 88 · Mobile 100 · Images 100 · URL Structure 100 · i18n 100 · Analytics 100.

### Akar masalah tunggal: tidak ada prerender/SSR

Ini menjelaskan **hampir semua** temuan SEO dan konten. Situs adalah SPA client-rendered murni: `vercel.json:3-5` merewrite semua path ke `index.html`, dan tidak ada plugin SSG di `package.json` (tidak ada `vite-react-ssg`, `vite-plugin-ssr`, dsb.). Akibatnya, HTML awal yang diterima crawler untuk **setiap URL** adalah `index.html` yang sama — 1489 byte, satu title statis, satu description statis, tanpa OG/Twitter tag, tanpa JSON-LD, 0 kata konten, 0 internal link.

Semua yang ada di `src/components/SEO.jsx` (react-helmet-async) dan `StructuredData.jsx` baru muncul **setelah JS dieksekusi**. Googlebot bisa render JS, tapi dengan penundaan dan tanpa jaminan; Bing, crawler sosial (Facebook/WhatsApp/Twitter), dan crawler AI (GPTBot, ClaudeBot, PerplexityBot) umumnya **tidak** — mereka hanya melihat shell kosong.

### 5 Prioritas Utama

1. **Tambahkan prerendering** (mis. `vite-react-ssg`) — sekali kerja, memperbaiki: duplicate title/description 19 halaman, missing H1, missing OG tags, thin content, orphan pages, token weight, dan sebagian besar skor Core SEO/Content/Links.
2. **Soft 404** — semua URL tidak dikenal mengembalikan HTTP 200 dengan halaman kosong (`/halaman-tidak-ada-12345` → 200, `/ads.txt` → 200, `/llms.txt` → 200 berisi HTML). Google akan mengindeks sampah dan membuang crawl budget.
3. **Header keamanan & caching** — `vercel.json` tidak punya blok `headers`. Tidak ada CSP, tidak ada X-Frame-Options; semua halaman `max-age=0, must-revalidate`.
4. **Halaman Kebijakan Privasi tidak ada** sama sekali, padahal GA4 dimuat tanpa syarat di `index.html:12`. Ini isu legal + E-E-A-T.
5. **Bundle JS 324.7 KB tunggal** + `hero-new.webp` 2.0 MB — beban LCP mobile yang berat.

---

## 2. Technical SEO

### 2.1 Crawlability & Indexation

| Isu | Impact | Bukti | Rekomendasi |
|---|---|---|---|
| **Soft 404 di semua URL tidak valid** | Tinggi | `/halaman-tidak-ada-12345` → HTTP 200. Tidak ada route catch-all `*` di `App.jsx:29-37` | Tambah route 404 + konfigurasi Vercel agar mengembalikan status 404 asli |
| **7 sitemap phantom** | Sedang | squirrel: `crawl/sitemap-valid` gagal — `/news-sitemap.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/sitemap_index.xml`, `/sitemap-index.xml`, `/sitemap1.xml` semua balas 200 HTML | Efek samping dari SPA rewrite. Selesai otomatis setelah 404 diperbaiki |
| **`lastmod` palsu untuk 6 route statis** | Rendah | `scripts/generate-sitemap.js:44` fallback ke waktu build | Simpan tanggal update nyata per halaman, atau hapus `lastmod` |
| robots.txt valid | ✅ | `Disallow:` kosong + referensi sitemap benar | — |
| Sitemap 19 URL valid | ✅ | `/sitemap.xml` 200, `application/xml` | — |
| GSC verification terpasang | ✅ | `public/google27a0a46e0b0472cc.html` | — |

### 2.2 Canonicalization

- Halaman statis (Home, About, Services, Gallery, Contact) hardcode URL absolut — **baik**.
- `BlogPage.jsx:169` dan `BlogPostPage.jsx:265` membangun canonical dari `window.location.origin` — rapuh (preview deployment Vercel akan self-canonical ke domain preview).
- **`BlogPage.jsx:169` menyertakan `location.search` di canonical** → setiap kombinasi filter/pagination self-canonicalize sebagai URL unik alih-alih menunjuk ke `/blog`. Ini menciptakan duplicate content.

### 2.3 Performance & Core Web Vitals

Google PageSpeed Insights API mengembalikan 429 (rate limit tanpa API key) — angka CWV lapangan belum terverifikasi. Temuan dari crawl:

| Isu | Impact | Bukti | Rekomendasi |
|---|---|---|---|
| **Tidak ada cache lifetime** (19/19 halaman) | Tinggi | Header: `Cache-Control: public, max-age=0, must-revalidate` | Tambah blok `headers` di `vercel.json`: `/assets/*` → `max-age=31536000, immutable`; HTML → `s-maxage` + `stale-while-revalidate` |
| **Bundle JS 324.7 KB** | Tinggi | `/assets/index-B0-Fikdj.js` = 332.455 byte | `vite.config.js` hanya 8 baris, tanpa blok `build`. Tambah `manualChunks` untuk memisahkan vendor (react, react-router, react-markdown) |
| **Gambar tidak dioptimasi** | Tinggi | `hero-new.webp` **2.0 MB**, `gallery/hero-gallery.jpg` 597 KB, `hero-service.jpg` 512 KB, `hero-about.jpg` 498 KB | Kompres ke <200 KB, konversi WebP/AVIF, sajikan responsive `srcset` |
| JS tampak unminified | Sedang | 11 komentar terdeteksi, potensi hemat ~269 KB | Kemungkinan komentar dari library. Verifikasi `build.minify` |
| Critical request chain | Sedang | `/assets/index-C7la4EKq.css` memblokir render | Inline critical CSS atau preload |
| GA4 di `<head>` | Rendah | `index.html:12` | Sudah `async`, aman. Pertimbangkan pindah ke akhir `<body>` |

### 2.4 Security (skor 87 — area terkuat)

| Isu | Impact | Rekomendasi |
|---|---|---|
| **Tidak ada Content-Security-Policy** | Sedang | Tambah CSP via `vercel.json` headers |
| **Tidak ada X-Frame-Options / frame-ancestors** | Sedang | Set `X-Frame-Options: SAMEORIGIN` (proteksi clickjacking) |
| Third-party cookie: googletagmanager | Info | Wajar; butuh disclosure di kebijakan privasi |
| HSTS aktif | ✅ | `Strict-Transport-Security: max-age=63072000` |
| HTTPS penuh, tanpa mixed content | ✅ | — |

### 2.5 Mobile & i18n

Skor 100 keduanya. Viewport benar, responsive, `<html lang="id">` konsisten, situs single-locale (tidak butuh hreflang).

> Catatan minor: `SEO.jsx:42` menyuntikkan tag `viewport` **kedua** dengan `maximum-scale=5.0`, berbeda dari `index.html:6`. Hapus salah satu untuk menghindari ambiguitas.

---

## 3. On-Page SEO

### 3.1 Title & Meta Description — kritis

**1 title untuk 19 halaman** dan **1 description untuk 19 halaman**, karena crawler hanya melihat `index.html`:

```
Title:       "Bengkel Las Wareng Jaya Teknik - Tajurhalang, Bogor"
Description: "Wareng Jaya Teknik, bengkel las di Tajurhalang, Bogor..."
```

Kode sebenarnya **sudah benar** — ketujuh page component memanggil `<SEO>` dengan title/description unik dan relevan (mis. `ServicesPage.jsx:125-130`, `BlogPostPage.jsx:262-273`). Masalahnya murni delivery. Prerendering menyelesaikan ini sepenuhnya.

### 3.2 Heading Structure

Crawler melaporkan **"No H1 tag found"** di 19 halaman (error) — kembali karena tidak ada prerender. Di source, setiap halaman punya tepat satu H1 (`HomePage.jsx:120`, `AboutUsPage.jsx:57`, dst.) — **struktur sudah benar**.

Dua isu nyata di source:

- **Dobel H1 di artikel blog.** `BlogPostPage.jsx:309` merender H1 judul, dan renderer markdown `BlogPostPage.jsx:33-39` mengizinkan `#` menjadi H1 — sementara semua file di `content/blog/*.md` dimulai dengan `#`. Fix: downgrade markdown `h1` → `h2`, atau hapus `#` dari frontmatter body.
- **H2 untuk UI chrome, bukan hierarki konten.** `Footer.jsx:39, 78, 96` ("Kontak", "Navigasi", "Area Layanan") menambah 3 H2 di setiap halaman; `BlogPostPage.jsx:365, 423, 442` ("Daftar isi", label share). Ganti ke `<p>`/`<div>` dengan styling, atau gunakan `sr-only` heading yang tepat levelnya.

### 3.3 Open Graph & Twitter Cards — 0 halaman

Warning di seluruh 19 halaman: missing `og:title`, `og:description`, `og:image`; tidak ada Twitter card. `index.html` tidak memuat satu pun tag ini.

**Masalah kedua yang lebih serius:** meskipun setelah prerender, `SEO.jsx:22` default `ogImage` = `/images/og-default.jpg` — **file ini tidak ada** di `public/images/`. Dan pathnya relatif; OG image wajib URL absolut.

Aksi:
1. Buat `public/images/og-default.jpg` (1200×630).
2. Ubah default `SEO.jsx:22` menjadi URL absolut.
3. Tambahkan `og:locale=id_ID`, `og:image:width/height/alt`, `twitter:site`.
4. `ProjectGalleryPage.jsx:132` mengirim `ogType="article"` untuk halaman galeri — seharusnya `website`.

### 3.4 Internal Linking

| Isu | Impact | Bukti |
|---|---|---|
| **18 orphan page** (<2 incoming link) | Tinggi | Crawler melihat 0 link di HTML awal |
| **0 internal link per halaman** | Tinggi | Semua 19 halaman jadi dead-end bagi crawler |
| **Artikel blog: 0 internal + 0 external link** | Sedang | 13 artikel, `content/article-links` |

Struktur navigasi di source sebenarnya sehat — React Router `<Link>` dipakai konsisten, `Header.jsx`/`Footer.jsx` dirender di layout `App.jsx:26,40`. Yang nyata kurang:

- `/about`, `/blog`, `/contact` **tidak menerima satu pun in-body internal link** dari halaman lain — hanya dari header/footer global.
- 13 artikel blog tidak saling menautkan (contextual linking) dan tidak menaut ke halaman layanan terkait.

### 3.5 Structured Data (setelah JS render)

Sudah cukup lengkap: `LocalBusiness` di setiap route (`App.jsx:43`), `BlogPosting`, `CollectionPage`+`ItemList`, `BreadcrumbList`, `FAQPage` kondisional.

Celah:
- **`LocalBusiness` juga muncul di artikel blog** (`App.jsx:43` tanpa props) — bertabrakan dengan `BlogPosting`. Batasi ke halaman Home/Contact/About.
- **Tidak ada `Service` schema** meski `/services` adalah halaman komersial utama. Untuk bengkel las lokal, ini kehilangan peluang rich result terbesar.
- Tidak ada `WebSite` + `SearchAction`, tidak ada `ImageObject` untuk galeri.
- **Breadcrumb hanya di `/blog` dan artikel** — About/Services/Gallery/Contact tidak punya (`Breadcrumbs.jsx` dipakai hanya di `BlogPage.jsx:175`, `BlogPostPage.jsx:296`).
- `src/components/SchemaDebug.jsx` tidak diimpor dari mana pun — dead code.

### 3.6 Local SEO

Skor 100 pada NAP/geo metadata. `LocalBusiness` sudah memuat `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `sameAs` (Facebook/Instagram) — pondasi bagus. Karena ini bisnis lokal dengan area layanan spesifik (Tajurhalang, Bojonggede, Bogor), pertimbangkan `areaServed` eksplisit dan halaman per-area jika ada demand pencarian nyata.

---

## 4. Content Quality

| Isu | Impact | Bukti |
|---|---|---|
| **Thin content: 0 kata** di 19 halaman | Tinggi | Konsekuensi SPA |
| **Tidak ada author attribution** | Sedang | `eeat/author-byline` — 13 artikel tanpa byline |
| **Tidak ada Privacy Policy** | Sedang | Tidak ada route, tidak ada page component, tidak ada footer link |
| Artikel pendek tanpa link keluar | Sedang | 13 artikel |

Konten aktual (setelah render) sebenarnya substansial dan berbahasa Indonesia sesuai target. Yang perlu:

- **Byline penulis** pada artikel blog — `StructuredData.jsx:69` sudah punya slot `Person` author, tapi tidak ditampilkan sebagai byline yang terlihat. Untuk E-E-A-T bisnis las, byline pemilik/teknisi dengan pengalaman nyata bernilai tinggi.
- **Konsistensi dengan aturan kejujuran konten di AGENTS.md:** situs masih memuat statistik fabrikasi (jumlah proyek yang saling kontradiksi), testimonial palsu, dan anggota tim placeholder. Ini risiko E-E-A-T dan kepercayaan yang nyata — keputusan owner adalah **hapus, jangan tambah**. Belum dieksekusi.

---

## 5. Agent Experience / AI Search (skor 41 — terendah)

Kategori ini mengukur seberapa baik situs dikonsumsi crawler AI (ChatGPT, Claude, Perplexity, AI Overviews).

| Isu | Bukti | Rekomendasi |
|---|---|---|
| **`/llms.txt` mengembalikan HTML** | 200 tapi body = SPA fallback (1489 byte) | Buat `public/llms.txt` asli berisi ringkasan bisnis + daftar URL penting |
| **Token weight: teks terlihat ~0% dari HTML** | 19 halaman, ~372 token estimasi | Konsekuensi SPA; selesai dengan prerender |
| Tidak ada varian Markdown | `ax/markdown-response` | Opsional: sajikan `.md` untuk artikel blog |

Karena crawler AI hampir tidak pernah mengeksekusi JavaScript, saat ini **situs praktis tidak terlihat** oleh mesin pencari AI. Prerendering adalah satu-satunya perbaikan yang berarti di sini.

---

## 6. Accessibility (skor 54)

| Isu | Impact | Bukti | Rekomendasi |
|---|---|---|---|
| **Tidak ada skip link** | Sedang (WCAG 2.4.1) | Tidak ada komponen skip di `src/`; `<main>` di `App.jsx:27` tidak punya `id` | Tambah `<a href="#main" class="sr-only focus:not-sr-only">Lewati ke konten</a>` + `id="main"` |
| **`<main>` tidak terdeteksi crawler** | Sedang | Ada di `App.jsx:27`, tapi HTML awal kosong | Selesai dengan prerender |
| **Tidak ada focus management saat pindah route** | Sedang | `ScrollToTop` hanya scroll, tidak memindah fokus | Pindahkan fokus ke `<h1>`/`<main>` + tambah live region announcement |
| Class `border-primary` undefined | Rendah | `LoadingSpinner.jsx` (dicatat di AGENTS.md) | Ganti dengan token warna valid |
| onError fallback ke file tidak ada | Rendah | `/images/fallback-hero.jpg`, `/images/avatar-placeholder.jpg` di `HomePage.jsx` | Buat file atau hapus handler |

Yang sudah baik: `aria-label` di 4 nav (`Header.jsx:57,97`, `Footer.jsx:77`, `Breadcrumbs.jsx:70`), `aria-current="page"` (`Header.jsx:64,109`), `aria-expanded`/`aria-controls` di mobile menu (`Header.jsx:81-82`) dan FAQ accordion (`ContactPage.jsx:304-306`), Escape-to-close (`Header.jsx:26-36`), `role="status"` (`LoadingSpinner.jsx:5`), `aria-live="polite"` (`ContactPage.jsx:280`). Kategori Images 100 — semua alt text lengkap.

---

## 7. Legal Compliance (skor 44)

| Isu | Impact | Rekomendasi |
|---|---|---|
| **Tidak ada Privacy Policy** | Tinggi | Buat route `/kebijakan-privasi` + link di footer. Wajib disebut: GA4, cookie, data form kontak |
| **Tidak ada disclosure sub-processor/DPA** | Rendah | Cantumkan Google Analytics & Vercel di kebijakan privasi |
| **GA4 tanpa mekanisme consent** | Sedang | `index.html:12` memuat gtag tanpa syarat. Pertimbangkan consent banner |

Tidak ada halaman Terms of Service juga.

---

## 8. Rencana Aksi Berprioritas

### Fase 1 — Blocker (dampak terbesar, kerjakan dulu) — ✅ SELESAI 30 Jul 2026

1. ✅ **Prerendering / SSG terpasang** (`vite-react-ssg` 0.9.2). 20 halaman diprerender ke HTML asli. Terbukti dari output build: setiap halaman punya title unik, 1 H1, 10 OG tag, JSON-LD, dan 190–471 kata di HTML awal (sebelumnya 0).
2. ✅ **Soft 404 diperbaiki.** Route `*` + `src/pages/NotFoundPage.jsx` (`noindex`), `dist/404.html` + `cleanUrls` di Vercel → status 404 nyata.
3. ✅ **Blok `headers` di `vercel.json`:** `/assets/*` immutable 1 tahun, `/images/*` 30 hari, HTML `s-maxage=3600`, plus CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options.

Dikerjakan bersamaan karena saling terkait:
- `src/config/site.js` (`SITE_URL`/`absoluteUrl`) menggantikan semua `window.location.origin` — wajib, karena `window` tidak ada saat prerender.
- `BlogPostPage` diubah dari fetch-in-effect ke `useMemo` sinkron, jika tidak HTML prerender hanya berisi spinner.
- `manualChunks` (bentuk fungsi): bundle 325 KB tunggal dipecah jadi react 223 KB / markdown 157 KB / motion 112 KB / app 125 KB + chunk per halaman.
- Dobel H1 di artikel blog, OG image absolut + `og:locale`/`og:image:width|height|alt`, canonical `/blog` tanpa query, skip link + `id="konten-utama"`, H2 chrome → `<p>`, tag duplikat di `index.html` dihapus.
- Dep dipin: `react-router-dom@6.30.1` dan `react-helmet-async@1.3.0` (vite-react-ssg butuh router v6 dan helmet v1 yang dedupe).

Hasil re-audit lokal (`vite preview`, 58 halaman): Links 47→90, Accessibility 54→79, E-E-A-T 71→82, Structured Data & Social Media 100, Core SEO error 19→0. Skor overall lokal masih tertahan karena crawler menandai `http://localhost` sebagai non-HTTPS (58 error semu) dan sitemap menunjuk domain produksi. **Verifikasi ulang setelah deploy.**

#### Verifikasi di preview Vercel (1 Agu 2026) — ✅ terkonfirmasi

Diaudit di deployment preview nyata. Semua target Fase 1 terbukti bekerja di produksi-like environment:

| Cek | Hasil |
|---|---|
| Prerender terkirim | 7/7 halaman: marker `data-server-rendered` ada, title unik, H1 tepat 1, 10 OG tag, JSON-LD |
| Konten di HTML awal | 187–1144 kata (sebelumnya **0**) |
| 404 nyata | `/halaman-ngawur-123` → **HTTP 404** + `noindex, follow` + halaman bantuan berbahasa Indonesia |
| Sitemap phantom hilang | `/ads.txt`, `/sitemap_index.xml`, `/llms.txt` → 404 (sebelumnya 200) |
| `cleanUrls` | `/services.html` → 308 → `/services` |
| Header keamanan | CSP, X-Frame-Options `SAMEORIGIN`, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, HSTS `includeSubDomains; preload` — semua terkirim |
| JSON-LD lengkap | 14 tipe schema terdeteksi di artikel blog: BlogPosting, FAQPage, BreadcrumbList, LocalBusiness, dll. |
| Canonical & OG absolut | Menunjuk `warengjayateknik.my.id`, bukan domain preview — `SITE_URL` bekerja |
| Hydration | Tidak ada error React #418/#422; kategori Site Integrity 100/100 |

Perbaikan lanjutan setelah temuan preview:
- **Cache-Control `/assets/*` tidak berlaku.** Vercel menerapkan *semua* rule `headers` yang cocok dan **rule terakhir menang**; catch-all `/(.*)` menimpa `/assets/*`. Urutan dibalik (catch-all pertama, spesifik terakhir) dan `s-maxage` dipindah ke `CDN-Cache-Control` karena `s-maxage` di `Cache-Control` tidak sampai ke browser.
- **2 broken link** di `content/blog/5-tips-merawat-furniture-besi.md`: link relatif `./file.md` (idiom GitHub, bukan URL web) → diganti path absolut `/blog/slug`.

Sisa temuan preview yang masuk Fase 2/3 (bukan regresi): `hero-new.webp` 1.9 MB, 21 gambar tanpa `width`/`height`, LCP tanpa preload, `aria-controls="tag-list"` menunjuk elemen yang belum dirender, mismatch aria-label di tombol galeri, title/description artikel blog >60/160 char, 43 varian `/blog?tag=` duplikat metadata, `llms.txt` belum ada.

> Catatan: skor overall preview (52) tidak bisa dibandingkan langsung dengan produksi — Vercel mengirim header `X-Robots-Tag: noindex` di semua deployment preview, yang crawler hitung sebagai 56 error "rich schema tapi diblokir indexing". Di produksi header itu tidak ada.


### Fase 2 — High-impact

4. ✅ `public/images/og-default.jpg` dibuat (1200×630, 56 KB) — sebelumnya direferensikan di `SEO.jsx` tapi filenya tidak ada, jadi semua preview share rusak.
5. ✅ Kompresi & pembersihan gambar. `hero-new.webp` (LCP di Home) diturunkan dari 5824×3264 / 966 KB ke **1200×675 / 92 KB** (WebP q82, Lanczos) — **hemat 90%**; atribut `width`/`height` di `HomePage.jsx` disesuaikan ke dimensi baru agar CLS tetap nol. Enam aset mati dihapus (**1.735 KB**): `hero-service.jpg`, `hero-about.jpg`, `gallery/hero-gallery.jpg`, `konstruksi.webp`, `pro.webp`, `worker.svg` — terverifikasi tidak direferensikan di `src/`, `content/`, `scripts/`, `index.html`, maupun output `dist/`. Total `public/images/`: 5.004 KB → **2.395 KB**. `srcset` **tidak** dikerjakan: satu file berukuran tepat sudah mengambil sebagian besar manfaatnya, sementara varian resolusi butuh dependency baru dan pemeliharaan manual tiap ganti gambar.
6. ✅ `build.rollupOptions.manualChunks` di `vite.config.js`.
7. ✅ Halaman Kebijakan Privasi (`/privacy`) + link footer + entri sitemap.
8. ✅ Dobel H1 di artikel blog.
9. ✅ `location.search` dihapus dari canonical `/blog`.
10. ✅ `width`/`height` pada **semua 81 `<img>`** di output prerender (terverifikasi 0 tanpa `width`), plus `width`/`height` pada iframe Google Maps. Hero LCP diberi `fetchpriority="high"` + `decoding="async"`. `<link rel=preload>` tidak ditambahkan karena hero sudah `loading="eager"` + `fetchpriority="high"` di markup prerender — preload akan jadi request duplikat.
11. ✅ Title & description dipendekkan. Frontmatter dapat field baru `seoTitle` (untuk `<title>`, pendek) dan `description` (untuk meta, ≤160) yang terpisah dari `title` (H1, tetap panjang & deskriptif untuk pembaca). `BlogPostPage.jsx` memakai `post.seoTitle || post.title`. **Terverifikasi: 21/21 halaman kini ≤60 char title dan ≤160 char description.**
12. ✅ `aria-controls="tag-list"` di `BlogPage.jsx` — target kini selalu dirender, visibilitas lewat `hidden`/`flex` alih-alih mount kondisional, jadi `aria-controls` menunjuk elemen yang benar-benar ada di HTML awal.
13. ✅ Mismatch `aria-label` tombol galeri (`ProjectGalleryPage.jsx`) — `aria-label` dihapus, diganti `<span className="sr-only">` sehingga accessible name memuat teks terlihat (WCAG 2.5.3).

### Fase 3 — Quick wins

14. ✅ Skip link + `id="konten-utama"`.
15. Buat `public/llms.txt`.
16. Tambah `Service` schema di `/services`; batasi `LocalBusiness` agar tidak muncul di artikel blog.
17. Tambah Breadcrumbs ke About/Services/Gallery/Contact.
18. Byline penulis di artikel blog.
19. ✅ Tag `viewport` duplikat dihapus.
20. ✅ H2 chrome di `Footer.jsx` dan `BlogPostPage.jsx` → `<p>`.
21. Hapus `SchemaDebug.jsx` (dead code).
22. Tambahkan `/blog?tag=…` sebagai disallow di `robots.txt`, atau `noindex` — 43 varian query saat ini duplikat title/description `/blog`.

### Fase 4 — Konten & jangka panjang

23. **Hapus statistik fabrikasi, testimonial palsu, dan anggota tim placeholder** (keputusan owner di AGENTS.md — belum dieksekusi).
24. Internal linking kontekstual: artikel blog → halaman layanan, dan antar artikel.
25. Tambah in-body link ke `/about`, `/blog`, `/contact`.
26. Focus management pada perpindahan route.
27. Verifikasi Core Web Vitals lapangan lewat Search Console (PSI API rate-limited saat audit ini).

---

## Catatan Metodologi & Batasan

- Crawl `surface` dan `full` (max 200 halaman) menghasilkan temuan identik: sitemap hanya memuat 19 URL, jadi tidak ada halaman tambahan yang belum tercakup.
- **Skor Lighthouse / Core Web Vitals lapangan tidak terverifikasi** — PageSpeed Insights API mengembalikan HTTP 429 pada dua percobaan. Temuan performa di atas berasal dari analisis resource crawler (ukuran file, header caching, request chain), bukan pengukuran runtime.
- Temuan structured data di bagian 3.5 berasal dari review source code, bukan crawler — crawler tidak bisa melihat JSON-LD yang disuntikkan JS. Untuk validasi definitif, gunakan Google Rich Results Test setelah prerendering aktif.
- Konfigurasi audit tersimpan di `squirrel.toml` (project `wareng-jaya-teknik`). Re-audit: `squirrel audit https://warengjayateknik.my.id/ --refresh --format llm`. Bandingkan regresi: `squirrel report --diff <audit-id>`.
