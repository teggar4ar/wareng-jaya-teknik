import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component for dynamically setting meta tags on each page
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: 'website')
 * @param {string[]} props.keywords - Keywords for meta tag
 * @param {string} props.publishedTime - ISO date when content was published
 * @param {string} props.modifiedTime - ISO date when content was modified
 * @param {string} props.author - Content author name
 * @param {string} props.section - Content section/category
 */
const SEO = ({ 
  title,
  description,
  canonicalUrl,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  keywords = [],
  publishedTime,
  modifiedTime,
  author,
  section
}) => {
  const siteName = 'Wareng Jaya Teknik';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const keywordString = keywords.join(', ');
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Viewport meta tag to control layout on mobile browsers */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* If article, add article specific Open Graph tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {ogType === 'article' && keywords && keywords.map((keyword, index) => (
        <meta property="article:tag" content={keyword} key={index} />
      ))}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO enhancements */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      {author && <meta name="author" content={author} />}
    </Helmet>
  );
};

export default SEO;
