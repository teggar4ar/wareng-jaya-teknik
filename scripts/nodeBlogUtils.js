import fs from 'fs';
import path from 'path';
import { format, formatISO } from 'date-fns';
import { id } from 'date-fns/locale';
import matter from 'gray-matter';

// This is a Node.js version of blogUtils used only for sitemap generation
// It's separate from the browser version to avoid Node.js modules in client code

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts with their metadata for sitemap generation
 * @param {boolean} includeDrafts - Whether to include draft posts
 * @param {boolean} useFileModifiedDate - Whether to override frontmatter dates with file modification dates
 * @returns {Array} Array of blog posts with metadata
 */
export function getAllPosts(includeDrafts = false, useFileModifiedDate = false) {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Get file stats for creation/modification date
      const stats = fs.statSync(fullPath);
      
      // Use gray-matter to parse the post metadata section
      const { data: frontmatter, content } = matter(fileContents);
      
      // Format the date - either from frontmatter or file modification date
      let formattedDate;
      let isoDate;
      
      // Always use the file's modification date if flag is set
      if (useFileModifiedDate) {
        const date = new Date(stats.mtime);
        frontmatter.date = formatISO(date).split('T')[0]; // Store as YYYY-MM-DD format
        formattedDate = format(date, 'd MMMM yyyy', { locale: id });
        isoDate = formatISO(date);
      } else if (frontmatter.date) {
        // Use the date from frontmatter
        const date = new Date(frontmatter.date);
        formattedDate = format(date, 'd MMMM yyyy', { locale: id });
        isoDate = formatISO(date);
      } else {
        // Use the file's modification date as fallback
        const date = new Date(stats.mtime);
        frontmatter.date = formatISO(date).split('T')[0]; // Store as YYYY-MM-DD format
        formattedDate = format(date, 'd MMMM yyyy', { locale: id });
        isoDate = formatISO(date);
      }
      
      // Calculate reading time (estimate: 200 words per minute)
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);
      
      // Combine the data
      return {
        slug,
        ...frontmatter,
        content,
        formattedDate,
        isoDate,
        readingTime, // Add reading time to the blog post data
      };
    })
    .filter(post => includeDrafts || !post.draft)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    
  return allPostsData;
}
