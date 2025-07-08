import fs from 'fs';
import path from 'path';
import { getAllPosts } from './nodeBlogUtils.js';

/**
 * Generate sitemap.xml for the website including dynamic blog posts
 * This script creates an SEO-friendly sitemap that helps search engines
 * discover and index all pages, including dynamic blog posts
 */
function generateSitemap() {
  const baseUrl = 'https://wareng-jaya-teknik.vercel.app';
  const currentDate = new Date().toISOString();

  // 1. Definisikan rute statis
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/gallery', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  // 2. Dapatkan dan format rute blog
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map(post => {
    const postDate = post.isoDate || (post.date ? new Date(post.date).toISOString() : currentDate);
    return {
      url: `/blog/${post.slug}`,
      lastmod: postDate,
      priority: '0.8',
      changefreq: 'monthly',
      image: post.coverImage ? `${baseUrl}${post.coverImage}` : null
    };
  });

  // 3. Gabungkan semua rute menjadi satu array
  const allRoutes = [...staticRoutes, ...blogRoutes];

  // 4. Buat XML dengan memproses SATU array `allRoutes`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">` +
  allRoutes.map(route => {
    const lastmod = route.lastmod || currentDate;
    const imageTag = route.image ? `<image:image><image:loc>${route.image}</image:loc></image:image>` : '';

    return `<url>` +
      `<loc>${baseUrl}${route.url}</loc>` +
      `<lastmod>${lastmod}</lastmod>` +
      `<changefreq>${route.changefreq}</changefreq>` +
      `<priority>${route.priority}</priority>` +
      `${imageTag}` +
    `</url>`;
  }).join('') +
  `</urlset>`;

  // Tulis sitemap ke folder public
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Jalankan fungsi
generateSitemap();
