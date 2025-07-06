import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * StructuredData component for adding structured data to improve SEO
 * 
 * @param {Object} props - Component props
 * @param {Object} props.blogPost - Blog post data (optional)
 * @param {Object} props.data - Custom structured data (optional)
 */
const StructuredData = ({ blogPost, data }) => {
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  
  // Base organization/business structured data
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Wareng Jaya Teknik",
    "image": "https://wareng-jaya-teknik.vercel.app/images/hero-new.webp",
    "url": "https://wareng-jaya-teknik.vercel.app/",
    "logo": "https://wareng-jaya-teknik.vercel.app/favicon.svg",
    "description": "Jasa pembuatan kanopi, teralis, pagar, railing, tangga dan konstruksi baja berkualitas dengan pengalaman lebih dari 10 tahun di bidang pengerjaan logam dan konstruksi.",
    "telephone": "+6281234567890",
    "email": "info@warengjayateknik.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Kaliurang KM 13.5",
      "addressLocality": "Sleman",
      "addressRegion": "DI Yogyakarta",
      "postalCode": "55584",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.6894264",
      "longitude": "110.4160642"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/warengjayteknik",
      "https://www.instagram.com/warengjayteknik"
    ]
  };
  
  // Blog post structured data
  const blogPostStructuredData = blogPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "headline": blogPost.title,
    "description": blogPost.description || blogPost.excerpt,
    "image": blogPost.coverImage 
      ? window.location.origin + blogPost.coverImage 
      : window.location.origin + "/images/placeholder.svg",
    "author": {
      "@type": "Person",
      "name": blogPost.author || "Tim Wareng Jaya Teknik"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wareng Jaya Teknik",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + "/favicon.svg"
      }
    },
    "datePublished": blogPost.isoDate || blogPost.date,
    "dateModified": blogPost.updatedAt || blogPost.isoDate || blogPost.date,
    "keywords": blogPost.keywords || "",
    "wordCount": blogPost.wordCount || (blogPost.content ? blogPost.content.split(/\s+/).length : 0),
    "timeRequired": `PT${blogPost.readingTime || 5}M`,
    "articleBody": blogPost.content // Include full content for better indexing
  } : null;

  return (
    <Helmet>
      {/* Use custom structured data if provided, otherwise use default business data */}
      <script type="application/ld+json">
        {JSON.stringify(data || businessStructuredData)}
      </script>
      
      {/* If it's a blog post and we're not using custom data, add the blog post structured data */}
      {blogPost && !data && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default StructuredData;
