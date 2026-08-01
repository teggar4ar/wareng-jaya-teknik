import fs from 'fs';
import path from 'path';
import { getAllPosts } from './nodeBlogUtils.js';

/**
 * Generate public/llms.txt — a plain-text map of the site for AI agents.
 *
 * Generated rather than hand-written so the blog list never drifts from
 * content/blog/. Mirrors the same source of truth as the sitemap.
 */
function generateLlmsTxt() {
  const baseUrl = 'https://warengjayateknik.my.id';
  const posts = getAllPosts();

  const staticPages = [
    ['/', 'Beranda — ringkasan layanan dan area kerja'],
    ['/services', 'Layanan: kanopi, pagar & gerbang, teralis, railing, konstruksi baja, pintu besi, tangga spiral, tower air'],
    ['/gallery', 'Galeri foto hasil pengerjaan'],
    ['/about', 'Tentang bengkel: cara kerja dan area layanan'],
    ['/contact', 'Kontak, jam buka, dan lokasi bengkel'],
    ['/blog', 'Indeks artikel'],
    ['/privacy', 'Kebijakan privasi'],
  ];

  const lines = [
    '# Wareng Jaya Teknik',
    '',
    '> Bengkel las (workshop fabrikasi logam) di Tajurhalang, Kabupaten Bogor,',
    '> Jawa Barat, Indonesia. Mengerjakan kanopi, pagar dan gerbang, teralis,',
    '> railing, pintu besi, tangga spiral, tower air, dan konstruksi baja.',
    '> Pengukuran dilakukan di lokasi sebelum penawaran dibuat.',
    '',
    'Seluruh isi situs berbahasa Indonesia.',
    '',
    '## Informasi bisnis',
    '',
    '- Nama: Wareng Jaya Teknik',
    '- Alamat: Jl. Raya Kalisuren, Kp. Kandang Panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320',
    '- Telepon / WhatsApp: +62 813-9842-7309',
    '- Jam buka: setiap hari, 08.00–17.00 WIB',
    '- Area layanan: Tajurhalang, Bojonggede, Citayam, Cibinong, Depok, dan Bogor sekitarnya',
    '',
    '## Halaman utama',
    '',
    ...staticPages.map(([url, desc]) => `- [${url}](${baseUrl}${url}): ${desc}`),
    '',
    '## Artikel',
    '',
    ...posts.map((post) => {
      const summary = (post.description || post.excerpt || '').replace(/\s+/g, ' ').trim();
      return `- [${post.title}](${baseUrl}/blog/${post.slug}): ${summary}`;
    }),
    '',
    '## Catatan',
    '',
    '- Situs statis, seluruh halaman sudah ter-render di HTML (tidak butuh eksekusi JavaScript).',
    '- Filter blog memakai query string (`/blog?tag=…`) dan menyajikan konten yang sama dengan `/blog`; abaikan varian tersebut.',
    '- Harga tidak dicantumkan sebagai angka pasti karena bergantung pada ukuran, material, dan kondisi lokasi.',
    '',
  ];

  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
  fs.writeFileSync(outputPath, lines.join('\n'));
  console.log('llms.txt generated successfully!');
}

generateLlmsTxt();
