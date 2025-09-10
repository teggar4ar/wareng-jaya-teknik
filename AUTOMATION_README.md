# 🤖 Automated Article Generation System

This system enables automatic article creation for the Wareng Jaya Teknik blog using AI and GitHub automation.

## 🚀 Quick Start

### 1. Set Up API Key
You need a Google Gemini API key to use this system:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. For GitHub Actions: Add it as a repository secret named `GEMINI_API_KEY`
3. For local testing: Set environment variable `export GEMINI_API_KEY="your-key"`

### 2. Test Locally

```bash
# Install dependencies
npm install

# Test article generation
npm run test-article

# Or run the test script directly
node scripts/test-article-generation.js
```

### 3. Create Article via GitHub Issue

1. Go to **Issues** → **New Issue**
2. Choose **"Article Creation Request"** template
3. Fill in the required information:
   - Topic
   - Target keywords
   - Category
   - Cover image URL
   - Special instructions
   - Target audience
4. Add the `auto-article` label
5. Submit the issue

The automation will:
- Generate the article using AI
- Save it to `content/blog/`
- Update the blog data
- Commit the changes
- Comment on the issue with results
- Close the issue

## 📋 Article Requirements

### Required Information
- **Topic**: Main subject of the article
- **Keywords**: SEO keywords (comma-separated)
- **Category**: One of: Konstruksi, Pengerjaan Logam, Tips, Panduan, Layanan
- **Cover Image**: URL to image (use `/images/filename.webp`)

### Optional Information  
- **Special Instructions**: Specific requirements or focus points
- **Target Audience**: Who the article is for

### AI Content Features
- 800-1200 words automatically
- SEO-optimized structure
- Professional tone for construction industry
- Natural mentions of Wareng Jaya Teknik services
- Actionable tips and practical advice
- Call-to-action included

## 🔧 System Components

### 1. Article Generator (`scripts/generate-article.js`)
- Main AI content generation logic
- Uses Google Gemini AI
- Handles frontmatter creation
- Slug generation and file naming

### 2. GitHub Issue Template (`.github/ISSUE_TEMPLATE/article-request.md`)
- Structured form for article requests
- Ensures all required information is provided
- Automatically adds `auto-article` label

### 3. GitHub Actions Workflow (`.github/workflows/auto-article-generation.yml`)
- Triggers on new issues with `auto-article` label
- Processes issue content
- Generates and commits article
- Provides feedback to user

### 4. Test Scripts
- `scripts/test-article-generation.js`: Local testing
- `npm run test-article`: Quick test command

## 📊 Content Quality Features

### SEO Optimization
- Keyword integration in headers and content
- Meta descriptions from content excerpts
- Structured heading hierarchy (H2, H3)
- Internal linking opportunities

### Business Integration
- Natural mentions of Wareng Jaya Teknik services
- Local SEO focus (Bogor, Bojonggede area)
- Industry-specific terminology
- Call-to-action for lead generation

### Content Structure
- Clear introduction and conclusion
- Numbered lists and bullet points
- Practical tips and actionable advice
- Professional but accessible tone

## 🛠️ Customization

### Modify AI Prompts
Edit the prompt in `scripts/generate-article.js` to adjust:
- Writing style
- Content structure
- Service mentions
- Keyword integration

### Add New Categories
Update the category options in:
- Issue template
- Article generator validation
- Blog system categories

### Adjust Content Length
Modify the word count requirements in the AI prompt (currently 800-1200 words).

## 🚨 Troubleshooting

### Common Issues

**"GEMINI_API_KEY is not set"**
- Add the API key to repository secrets
- For local testing, set environment variable

**"Topic is required but not found"**
- Ensure the issue follows the template format
- Check that the topic field is properly filled

**"API quota exceeded"**
- Check your Gemini API usage limits
- Wait for quota reset or upgrade plan

**"Generation failed"**
- Check workflow logs in GitHub Actions
- Verify API key is valid
- Ensure topic is appropriate for AI generation

### Manual Workflow Trigger

You can manually trigger article generation:

1. Go to **Actions** → **Auto Article Generation**
2. Click **Run workflow**
3. Enter the issue number to process
4. Click **Run workflow**

## 📈 Future Enhancements

### Planned Features
- Image processing and optimization
- Multiple language support
- Content scheduling
- Performance analytics integration
- Automatic internal linking
- SEO keyword research integration

### Integration Opportunities
- Telegram bot for mobile article requests
- Content calendar integration
- Social media auto-posting
- Analytics tracking for generated content

## 🔐 Security Notes

- API keys are stored securely in GitHub Secrets
- Workflow only runs for authorized users
- Generated content is reviewed before publication
- All commits are tracked and attributable

---

*This automation system significantly reduces content creation time while maintaining quality and SEO optimization for the Wareng Jaya Teknik blog.*