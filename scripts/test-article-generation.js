#!/usr/bin/env node

/**
 * Test script for article generation
 * This script tests the AI article generation functionality
 */

import { ArticleGenerator } from './generate-article.js';

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
Fokus pada aspek estetika dan fungsionalitas untuk rumah minimalis. Sertakan informasi tentang material yang cocok dan tips perawatan.

**🎯 Target Audience:**
Pemilik rumah minimalis yang ingin menambah kanopi
`;

async function testArticleGeneration() {
  console.log('🧪 Testing Article Generation...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is required');
    console.log('Please set your Gemini API key:');
    console.log('export GEMINI_API_KEY="your-api-key-here"');
    process.exit(1);
  }

  try {
    const generator = new ArticleGenerator(apiKey);
    
    console.log('📝 Generating article...');
    const result = await generator.generateCompleteArticle(testIssueBody);
    
    console.log('✅ Article Generated Successfully!');
    console.log(`📄 Title: ${result.title}`);
    console.log(`📁 Filename: ${result.filename}`);
    console.log(`📏 Content Length: ${result.content.length} characters`);
    
    // Save article locally for testing
    const savedPath = generator.saveArticle(result, './test-output');
    console.log(`💾 Article saved to: ${savedPath}`);
    
    // Show first 500 characters of content
    console.log('\n📖 Content Preview:');
    console.log('=' * 50);
    console.log(result.content.substring(0, 500) + '...');
    console.log('=' * 50);
    
    return result;
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.message.includes('API key')) {
      console.log('\n💡 Tip: Make sure your Gemini API key is valid and has sufficient quota');
    }
    process.exit(1);
  }
}

// Run the test
testArticleGeneration()
  .then(() => {
    console.log('\n🎉 Test completed successfully!');
    console.log('📋 Next steps:');
    console.log('1. Review the generated article');
    console.log('2. Set up GitHub secrets for GEMINI_API_KEY');
    console.log('3. Create the GitHub Actions workflow');
    console.log('4. Test with a real GitHub issue');
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });