import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Article Generation Script for Wareng Jaya Teknik
 * Generates blog articles using Google Gemini AI based on GitHub issue content
 */

class ArticleGenerator {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Parse issue body to extract article requirements
   */
  parseIssueBody(issueBody) {
    const sections = {
      topic: '',
      keywords: '',
      category: '',
      imageUrl: '',
      instructions: '',
      audience: ''
    };

    // Extract content between sections
    const topicMatch = issueBody.match(/\*\*🎯 Topic:\*\*\s*\n([^*]*)/);
    const keywordsMatch = issueBody.match(/\*\*🔑 Target Keywords:\*\*\s*\n([^*]*)/);
    const categoryMatch = issueBody.match(/\*\*📂 Category:\*\*\s*\n([^*]*)/);
    const imageMatch = issueBody.match(/\*\*🖼️ Cover Image:\*\*\s*\n([^*]*)/);
    const instructionsMatch = issueBody.match(/\*\*📋 Special Instructions:\*\*\s*\n([^*]*)/);
    const audienceMatch = issueBody.match(/\*\*🎯 Target Audience:\*\*\s*\n([^*]*)/);

    if (topicMatch) sections.topic = topicMatch[1].trim();
    if (keywordsMatch) sections.keywords = keywordsMatch[1].trim();
    if (categoryMatch) sections.category = categoryMatch[1].trim();
    if (imageMatch) sections.imageUrl = imageMatch[1].trim();
    if (instructionsMatch) sections.instructions = instructionsMatch[1].trim();
    if (audienceMatch) sections.audience = audienceMatch[1].trim();

    return sections;
  }

  /**
   * Generate article content using Gemini AI
   */
  async generateArticleContent(requirements) {
    const { topic, keywords, category, instructions, audience } = requirements;

    const prompt = `
Anda adalah seorang ahli content writer untuk Wareng Jaya Teknik, sebuah bengkel las dan fabrikasi logam di Bogor. 
Tulis artikel blog yang SEO-friendly dan berkualitas tinggi.

INFORMASI ARTIKEL:
- Topik: ${topic}
- Keywords: ${keywords}
- Kategori: ${category}
- Target Audience: ${audience}
- Instruksi khusus: ${instructions}

KONTEKS BISNIS:
Wareng Jaya Teknik adalah bengkel las profesional yang melayani:
- Pembuatan kanopi, pagar, teralis
- Konstruksi baja ringan
- Furniture besi custom
- Pintu dan jendela besi
- Railing tangga
- Tower air
- Melayani area Bogor, Bojonggede, dan sekitarnya

REQUIREMENTS:
1. Minimal 800-1200 kata
2. Gunakan heading H2, H3 dengan struktur yang jelas
3. Sertakan tips praktis dan actionable
4. Sebutkan layanan Wareng Jaya Teknik secara natural
5. Optimasi untuk keywords yang diberikan
6. Gaya penulisan: informatif, mudah dipahami, profesional
7. Sertakan call-to-action di akhir artikel

FORMAT OUTPUT:
Berikan artikel dalam format markdown tanpa frontmatter (hanya konten artikel).

Mulai artikel:
`;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }

  /**
   * Create slug from title
   */
  createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  /**
   * Generate frontmatter for the article
   */
  generateFrontmatter(requirements, title, content) {
    const { keywords, category, imageUrl } = requirements;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Extract excerpt from content (first paragraph)
    const excerptMatch = content.match(/^([^#\n]*(?:\n[^#\n]*)*?)(?:\n\n|\n#|$)/);
    let excerpt = excerptMatch ? excerptMatch[1].trim() : '';
    if (excerpt.length > 160) {
      excerpt = excerpt.substring(0, 157) + '...';
    }

    const frontmatter = `---
title: '${title}'
date: '${currentDate}'
excerpt: '${excerpt}'
coverImage: '${imageUrl || '/images/placeholder.svg'}'
author: 'Tim Wareng Jaya Teknik'
authorImage: '/images/profile.webp'
keywords: '${keywords}'
categories: '${category}'
---

`;

    return frontmatter;
  }

  /**
   * Extract title from generated content
   */
  extractTitle(content) {
    const titleMatch = content.match(/^#\s+(.+)/m);
    return titleMatch ? titleMatch[1].trim() : 'Artikel Baru';
  }

  /**
   * Generate complete article with frontmatter
   */
  async generateCompleteArticle(issueBody) {
    try {
      console.log('Parsing issue requirements...');
      const requirements = this.parseIssueBody(issueBody);
      
      if (!requirements.topic) {
        throw new Error('Topic is required but not found in issue body');
      }

      console.log('Generating article content...');
      const content = await this.generateArticleContent(requirements);
      
      console.log('Processing article...');
      const title = this.extractTitle(content);
      const slug = this.createSlug(title);
      const frontmatter = this.generateFrontmatter(requirements, title, content);
      
      const completeArticle = frontmatter + content;

      return {
        content: completeArticle,
        filename: `${slug}.md`,
        title: title,
        slug: slug
      };

    } catch (error) {
      console.error('Error in generateCompleteArticle:', error);
      throw error;
    }
  }

  /**
   * Save article to file (for local testing)
   */
  saveArticle(articleData, outputDir = './content/blog') {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, articleData.filename);
    fs.writeFileSync(filePath, articleData.content, 'utf8');
    
    console.log(`Article saved to: ${filePath}`);
    return filePath;
  }
}

export { ArticleGenerator };

// For GitHub Actions usage
export async function generateArticleFromIssue(issueBody, geminiApiKey) {
  const generator = new ArticleGenerator(geminiApiKey);
  return await generator.generateCompleteArticle(issueBody);
}

// For testing purposes
if (process.argv[2] === 'test') {
  const testIssueBody = `
**🎯 Topic:**
Tips Memilih Kanopi yang Tepat untuk Rumah Minimalis

**🔑 Target Keywords:**
kanopi rumah minimalis, tips memilih kanopi, kanopi bogor, desain kanopi modern

**📂 Category:**
Tips

**🖼️ Cover Image:**
/images/kanopi.webp

**📋 Special Instructions:**
Fokus pada aspek estetika dan fungsionalitas untuk rumah minimalis

**🎯 Target Audience:**
Pemilik rumah minimalis yang ingin menambah kanopi
`;

  if (process.env.GEMINI_API_KEY) {
    const generator = new ArticleGenerator(process.env.GEMINI_API_KEY);
    generator.generateCompleteArticle(testIssueBody)
      .then(result => {
        console.log('Generated article:', result.title);
        const savedPath = generator.saveArticle(result);
        console.log('Article saved to:', savedPath);
      })
      .catch(error => {
        console.error('Test failed:', error);
      });
  } else {
    console.error('GEMINI_API_KEY environment variable is required for testing');
  }
}