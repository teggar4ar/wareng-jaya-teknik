// /scripts/generate-blog-data.js
import fs from 'fs';
import path from 'path';
import { getAllPosts } from './nodeBlogUtils.js'; // Menggunakan kembali utilitas yang ada

function generateBlogData() {
  // Dapatkan semua data postingan (termasuk konten)
  // Pass true for includeDrafts and true for useFileModifiedDate to always use file modification dates
  const allPosts = getAllPosts(true, true);

  // Tentukan path untuk file output di dalam folder /src
  const outputPath = path.join(process.cwd(), 'src', 'data', 'blogPosts.js');

  // Buat folder /src/data jika belum ada
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Buat konten file JavaScript
  const fileContent = `
/**
 * This file is auto-generated during the build process.
 * Do not edit it directly.
 * Generated on: ${new Date().toISOString()}
 */
export const allBlogPosts = ${JSON.stringify(allPosts, null, 2)};
`;

  // Tulis file
  fs.writeFileSync(outputPath, fileContent);
  console.log('Blog data generated successfully!');
}

generateBlogData();