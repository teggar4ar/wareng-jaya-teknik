import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * NOTE: This is a CLIENT-SIDE utility file.
 * It should NOT contain any Node.js specific modules like 'fs' or 'path'.
 * The data (posts) should be fetched during the build process and passed to the components.
 * This file should only contain utility functions that can run in the browser.
 */

/**
Â * Parse markdown content with frontmatter (Client-side version)
 * This function can be used if raw markdown content is passed to the client.
Â * @param {string} fileContents - Raw markdown file contents
Â */
export function parseMarkdownWithFrontmatter(fileContents) {
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Format the date
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Convert date to ISO format for SEO
  const isoDate = date.toISOString();

  // Calculate reading time (estimate: 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  // Get slug from filename
  const slug = data.slug || '';

  // Create a post object
  return {
    slug,
    content,
    readingTime,
    formattedDate,
    isoDate,
    ...data
  };
}

/**
Â * Convert markdown to HTML
Â * @param {string} markdown - Markdown content
Â * @returns {Promise<string>} - HTML content
Â */
export async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

/**
Â * Get related posts based on keywords (Client-side version)
 * This function expects allPosts to be passed as an argument.
Â * @param {Array} allPosts - Array of all blog posts (passed from server/build)
Â * @param {string} currentSlug - Current post slug (to exclude)
Â * @param {Array} keywords - Keywords to match
Â * @param {number} limit - Maximum number of posts to return
Â * @returns {Array} - Array of related post objects
Â */
export function getRelatedPosts(allPosts, currentSlug, keywords = [], limit = 3) {
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

  if (!keywords.length) {
    // If no keywords, just return recent posts (assuming allPosts is sorted by date)
    return otherPosts.slice(0, limit);
  }

  // Score posts based on keyword matches
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    const postKeywords = post.keywords ?
      (typeof post.keywords === 'string' ? post.keywords.split(',').map(k => k.trim().toLowerCase()) : post.keywords)
      : [];

    // Check for keyword matches
    keywords.forEach(keyword => {
      if (postKeywords.some(pk => pk.toLowerCase().includes(keyword.toLowerCase()))) {
        score += 2;
      }
      if (post.title.toLowerCase().includes(keyword.toLowerCase())) {
        score += 2;
      }
      if (post.excerpt && post.excerpt.toLowerCase().includes(keyword.toLowerCase())) {
        score += 1;
      }
    });

    return { ...post, score };
  });

  // Sort by score (highest first) and then by date if scores are equal
  return scoredPosts
    .sort((a, b) => {
      if (b.score === a.score) {
        return new Date(b.date) - new Date(a.date);
      }
      return b.score - a.score;
    })
    .slice(0, limit);
}

/**
Â * Search posts by query string (Client-side version)
 * This function expects allPosts to be passed as an argument.
Â * @param {Array} allPosts - Array of all blog posts (passed from server/build)
Â * @param {string} query - The search query
Â * @returns {Array} Matching posts
Â */
export function searchPosts(allPosts, query) {
  if (!query || query.trim() === '') {
    return allPosts;
  }

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  if (searchTerms.length === 0) return allPosts;

  return allPosts
    .map(post => {
      let score = 0;
      const searchableContent = `
        ${post.title || ''} 
        ${post.excerpt || ''} 
        ${post.description || ''} 
        ${post.keywords || ''} 
        ${post.categories || ''}
      `.toLowerCase();

      searchTerms.forEach(term => {
        // Count occurrences
        const matches = (searchableContent.match(new RegExp(term, 'g')) || []).length;
        score += matches;

        // Bonus points for matches in title
        if (post.title?.toLowerCase().includes(term)) {
          score += 5;
        }

        // Bonus points for matches in keywords/tags
        if (post.keywords?.toLowerCase().includes(term)) {
          score += 3;
        }
      });

      return { ...post, searchScore: score };
    })
    .filter(post => post.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
}
