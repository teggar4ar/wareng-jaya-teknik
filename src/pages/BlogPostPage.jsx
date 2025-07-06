import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeContext } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import Breadcrumbs from '../components/Breadcrumbs';
import { allBlogPosts } from '../data/blogPosts.js';
import { getRelatedPosts } from '../utils/blogUtils';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  
  // Define customRenderers for ReactMarkdown - Enhanced for better styling
  const customRenderers = {
    h1: ({node, ...props}) => {
      const id = props.children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h1 id={id} className="text-2xl sm:text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />;
    },
    h2: ({node, ...props}) => {
      const id = props.children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h2 id={id} className="text-xl sm:text-2xl font-bold mt-7 mb-3" {...props} />;
    },
    h3: ({node, ...props}) => {
      const id = props.children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h3 id={id} className="text-lg sm:text-xl font-bold mt-6 mb-2" {...props} />;
    },
    h4: ({node, ...props}) => {
      const id = props.children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h4 id={id} className="text-md sm:text-lg font-bold mt-5 mb-2" {...props} />;
    },
    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
    a: ({node, ...props}) => <a className={`${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline transition-colors`} target="_blank" rel="noopener noreferrer" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
    li: ({node, ...props}) => <li className="mb-1" {...props} />,
    blockquote: ({node, ...props}) => (
      <blockquote className={`border-l-4 ${isDark ? 'border-blue-400 bg-gray-800' : 'border-blue-600 bg-blue-50'} pl-4 py-2 my-4 italic`} {...props} />
    ),
    code: ({node, inline, ...props}) => (
      inline ? 
        <code className={`${isDark ? 'bg-gray-800 text-blue-300' : 'bg-gray-100 text-blue-700'} px-1.5 py-0.5 rounded text-sm`} {...props} /> :
        <code className={`block ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-3 rounded my-4 overflow-x-auto text-sm`} {...props} />
    ),
    // Fixed image sizing to prevent oversized images
    img: ({node, ...props}) => (
      <div className="my-6">
        <img 
          className="max-w-full h-auto rounded-lg mx-auto shadow-md" 
          style={{ maxHeight: '500px' }}
          loading="lazy" 
          {...props} 
        />
        {props.alt && props.alt !== props.src && (
          <p className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400 italic">{props.alt}</p>
        )}
      </div>
    ),
    table: ({node, ...props}) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    ),
    th: ({node, ...props}) => <th className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border px-4 py-2 text-left`} {...props} />,
    td: ({node, ...props}) => <td className={`${isDark ? 'border-gray-700' : 'border-gray-300'} border px-4 py-2`} {...props} />,
  };
  
  // Function to extract FAQ data from blog post content
  const extractFAQs = (content) => {
    // Match headings that look like questions (ending with ?)
    const questionRegex = /^(#{1,6})\s+(.*\?)\s*$/gm;
    const faqs = [];
    let match;
    let lastQuestionIndex = -1;
    
    // Find question headings
    while ((match = questionRegex.exec(content)) !== null) {
      const questionText = match[2].trim();
      const questionIndex = match.index;
      
      // If we've seen a question before, extract the answer between the last question and this one
      if (lastQuestionIndex !== -1) {
        // Get the text between the last question and this one
        const previousQuestionMatch = content.substring(lastQuestionIndex).match(/^(#{1,6})\s+(.*\?)\s*$/m);
        if (previousQuestionMatch) {
          const previousQuestion = previousQuestionMatch[0];
          const answerStartIndex = lastQuestionIndex + previousQuestion.length;
          const answerText = content.substring(answerStartIndex, questionIndex).trim();
          
          // Add the previous question and its answer
          faqs.push({
            question: content.substring(lastQuestionIndex).match(/^(?:#{1,6})\s+(.*\?)\s*$/m)[1].trim(),
            answer: answerText
          });
        }
      }
      
      // Update the last question index
      lastQuestionIndex = questionIndex;
    }
    
    // Handle the last question's answer (from the last question to the end of the content)
    if (lastQuestionIndex !== -1) {
      const lastQuestionMatch = content.substring(lastQuestionIndex).match(/^(#{1,6})\s+(.*\?)\s*$/m);
      if (lastQuestionMatch) {
        const lastQuestion = lastQuestionMatch[0];
        const answerStartIndex = lastQuestionIndex + lastQuestion.length;
        const answerText = content.substring(answerStartIndex).trim();
        
        // Add the last question and its answer
        faqs.push({
          question: content.substring(lastQuestionIndex).match(/^(?:#{1,6})\s+(.*\?)\s*$/m)[1].trim(),
          answer: answerText
        });
      }
    }
    
    return faqs;
  };
  
    useEffect(() => {
  // Scroll to top when post changes
    window.scrollTo(0, 0);
  
    try {
      // --- PERUBAHAN UTAMA DI SINI ---
      // Ganti baris ini: const postData = getPostBySlug(slug);
      // Menjadi baris ini:
      const postData = allBlogPosts.find(post => post.slug === slug);
      
      if (!postData) {
        navigate('/blog', { replace: true });
        return;
      }
      
      setPost(postData);
      
      // Extract headings for table of contents (h1-h6)
      const headingRegex = /^(#{1,6})\s+(.*)$/gm;
      const tocItems = [];
      let match;
      
      // Pastikan untuk mereset regex sebelum digunakan lagi
      headingRegex.lastIndex = 0;
      while ((match = headingRegex.exec(postData.content)) !== null) {
        const level = match[1].length; // Number of # symbols
        const text = match[2];
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        tocItems.push({ 
          text, 
          id, 
          level 
        });
      }
      
      setTableOfContents(tocItems);
      
      // Get related posts based on keywords from the post's frontmatter
      const keywords = postData.keywords ? 
        (typeof postData.keywords === 'string' ? 
          postData.keywords.split(',').map(k => k.trim()) : 
          postData.keywords) : 
        [];
      
      // Pastikan `allBlogPosts` juga di-pass ke sini
      const related = getRelatedPosts(allBlogPosts, slug, keywords, 3);
      setRelatedPosts(related);
      
      // Extract FAQs if the post contains question headers
      const faqs = extractFAQs(postData.content);
      setFaqItems(faqs);

    } catch (error) {
      console.error("Error loading blog post:", error);
      navigate('/blog', { replace: true });
    } finally {
      setLoading(false);
    }
    }, [slug, navigate]);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariant = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!post) {
    return null; // We'll redirect in useEffect
  }
  
  return (
    <>
      <SEO 
        title={post.title}
        description={post.description || post.excerpt}
        canonicalUrl={`${window.location.origin}/blog/${slug}`}
        ogImage={post.coverImage ? `${window.location.origin}${post.coverImage}` : `${window.location.origin}/images/placeholder.svg`}
        ogType="article"
        keywords={post.keywords ? post.keywords.split(',').map(k => k.trim()) : []}
        publishedTime={post.isoDate}
        modifiedTime={post.updatedAt || post.isoDate}
        author={post.author || "Tim Wareng Jaya Teknik"}
        section={post.categories ? post.categories.split(',')[0].trim() : "Konstruksi"}
      />
      
      <StructuredData blogPost={post} />
      
      {/* Add FAQ schema if we have FAQ items */}
      {faqItems.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        </Helmet>
      )}
      
      <Breadcrumbs blogPost={post} />
      
      {/* Hero Section - Redesigned for better aesthetics */}
      <section className={`relative py-10 px-4 ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <div className="mb-3">
              <Link 
                to="/blog" 
                className={`inline-flex items-center text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kembali ke Blog
              </Link>
            </div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {post.title}
            </h1>
            
            {/* Category badges */}
            {post.categories && (
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {(Array.isArray(post.categories) ? post.categories : post.categories.split(',').map(c => c.trim()))
                  .map((category, index) => (
                    <Link 
                      key={index}
                      to={`/blog?category=${encodeURIComponent(category)}`}
                      className="inline-block px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
              </div>
            )}
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              {/* Author info */}
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 mr-2">
                  <img 
                    src={post.authorImage || '/images/profile.webp'} 
                    alt={post.author || 'Author'} 
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width="32"
                    height="32"
                  />
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.author || 'Tim Wareng Jaya Teknik'}
                </span>
              </div>
              
              <span className={`inline-flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.formattedDate}
              </span>
              <span className={`inline-flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} menit membaca
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Image - Redesigned with better sizing and container */}
      {post.coverImage && (
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} py-6 px-4`}>
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                style={{ maxHeight: '450px', objectPosition: 'center' }}
                width="1200"
                height="630"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Blog Content - Redesigned with better layout */}
      <section className={`py-8 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Desktop - Improved styling */}
            {tableOfContents.length > 0 && (
              <div className="lg:w-1/4 hidden lg:block">
                <div className={`sticky top-24 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-lg font-bold mb-3 pb-2 border-b ${isDark ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'}`}>
                    Daftar Isi
                  </h3>
                  <ul className="space-y-1.5">
                    {tableOfContents.map((item, index) => (
                      <li key={index} style={{ 
                        marginLeft: `${(item.level - 1) * 10}px`,
                        fontSize: `${Math.max(15 - (item.level - 1), 12)}px`
                      }}>
                        <a 
                          href={`#${item.id}`} 
                          className={`hover:underline block py-0.5 transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Main Content */}
            <div className={`lg:w-${tableOfContents.length > 0 ? '3/4' : 'full'}`}>
              {/* Table of Contents - Mobile - Improved accordion */}
              {tableOfContents.length > 0 && (
                <div className="lg:hidden mb-6">
                  <details className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <summary className={`text-lg font-bold cursor-pointer flex items-center justify-between ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <span>Daftar Isi</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <ul className="mt-3 space-y-1.5 pl-1">
                      {tableOfContents.map((item, index) => (
                        <li key={index} style={{ 
                          marginLeft: `${(item.level - 1) * 10}px`,
                          fontSize: `${Math.max(15 - (item.level - 1), 12)}px`
                        }}>
                          <a 
                            href={`#${item.id}`} 
                            className={`hover:underline block py-0.5 transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
              
              <article className="group">
                <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                  <ReactMarkdown 
                    components={customRenderers} 
                    remarkPlugins={[remarkGfm]}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
                
                {/* Keywords/Tags - Improved design */}
                {post.keywords && (
                  <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Tags:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.split(',').map((keyword, index) => (
                        <Link 
                          key={index}
                          to={`/blog?tag=${encodeURIComponent(keyword.trim())}`}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {keyword.trim()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Share Section - Improved design */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Bagikan Artikel:
                  </h3>
                  <div className="flex space-x-4">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link disalin ke clipboard!');
                      }}
                      aria-label="Copy link to clipboard"
                      className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts Section - Improved cards */}
      {relatedPosts.length > 0 && (
        <section className={`py-10 px-4 ${isDark ? 'bg-gradient-to-t from-gray-800 to-gray-900' : 'bg-gradient-to-t from-gray-100 to-white'}`}>
          <div className="container mx-auto max-w-5xl">
            <h2 className={`text-xl font-bold mb-6 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Artikel Terkait
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedPosts.map((relatedPost) => (
                <motion.article 
                  key={relatedPost.slug}
                  variants={cardVariant}
                  className={`rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700 hover:shadow-blue-900/20' : 'bg-white border-gray-200 hover:shadow-lg'}`}
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={relatedPost.coverImage || '/images/placeholder.svg'} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]"
                        loading="lazy"
                        width="400"
                        height="200"
                      />
                      {/* Gradient overlay for better visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-black/40 backdrop-blur-sm rounded-md">
                          {relatedPost.formattedDate}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className={`text-md font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {relatedPost.title}
                      </h3>
                      <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}
      
      {/* CTA Section - Improved layout and visual appeal */}
      <section className={`py-12 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <div className={`rounded-xl shadow-md p-6 border ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-100'}`}>
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Tertarik dengan Layanan Kami?
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto text-sm`}>
                Kami siap membantu Anda mewujudkan proyek konstruksi dan pengerjaan logam dengan kualitas terbaik. Hubungi kami untuk konsultasi gratis.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/contact" 
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-center flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Hubungi Kami
              </Link>
              <Link 
                to="/services" 
                className={`px-6 py-2.5 rounded-lg transition-colors duration-200 text-center flex items-center justify-center ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-blue-600 border border-blue-200'
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Lihat Layanan Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
