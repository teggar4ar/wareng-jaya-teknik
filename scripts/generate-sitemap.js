import fs from 'fs';
import path from 'path';
import { getAllPosts } from './nodeBlogUtils.js';

/**
 * Generate sitemap.xml for the website including dynamic blog posts
 * This script creates an SEO-friendly sitemap that helps search engines
 * discover and index all pages, including dynamic blog posts
 */
function generateSitemap() {
  const baseUrl = 'https://wareng-jaya-teknik.vercel.app'; // Update with your production domain
  const currentDate = new Date().toISOString(); // Full ISO format for better precision
  
  // Static routes with priority and change frequency
  const staticRoutes = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/gallery', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];
  
  // Get all blog posts
  const blogPosts = getAllPosts();
  
  // Create blog routes with enhanced metadata
  const blogRoutes = blogPosts.map(post => {
    // Use post date or current date as lastmod
    const postDate = post.isoDate || (post.date ? new Date(post.date).toISOString() : currentDate);
    
    return {
      url: `/blog/${post.slug}`,
      lastmod: postDate,
      priority: '0.8',
      changefreq: 'monthly',
      image: post.coverImage ? `${baseUrl}${post.coverImage}` : null
    };
  });
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...blogRoutes];
  
  // Generate XML with proper XML namespace
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${staticRoutes
  .map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  .join('\n')}
${blogRoutes
  .map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${route.image ? `<image:image>
      <image:loc>${route.image}</image:loc>
    </image:image>` : ''}
  </url>`)
  .join('\n')}
</urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Execute the function
generateSitemap();
