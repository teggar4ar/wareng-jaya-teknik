import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import StructuredData from './StructuredData';

/**
 * Breadcrumbs component for better navigation and SEO
 * @param {Object} props - Component props
 * @param {string} props.currentPage - Current page name (override auto-detection)
 * @param {Object} props.blogPost - Blog post data for blog post pages
 */
const Breadcrumbs = ({ currentPage, blogPost }) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const isDark = theme === 'dark';
  
  // Generate breadcrumbs based on URL path
  const paths = location.pathname.split('/').filter(Boolean);
  const isRoot = paths.length === 0;
  
  // Generate breadcrumb items
  const breadcrumbItems = [];
  let accumulatedPath = '';
  
  // Always add home
  breadcrumbItems.push({
    name: 'Beranda',
    path: '/',
    position: 1
  });
  
  // Add intermediate paths
  paths.forEach((path, index) => {
    accumulatedPath += `/${path}`;
    
    // Get human-readable name
    let name = path.charAt(0).toUpperCase() + path.slice(1);
    
    // Special case for common paths
    if (path === 'blog') name = 'Blog';
    if (path === 'about') name = 'Tentang Kami';
    if (path === 'services') name = 'Layanan';
    if (path === 'gallery') name = 'Galeri';
    if (path === 'contact') name = 'Kontak';
    
    // For blog posts, use the title from the blog post data
    if (blogPost && index === paths.length - 1 && paths[0] === 'blog') {
      name = blogPost.title;
    }
    
    // If the current page name is provided, use it for the last item
    if (currentPage && index === paths.length - 1) {
      name = currentPage;
    }
    
    breadcrumbItems.push({
      name,
      path: accumulatedPath,
      position: index + 2 // Home is position 1
    });
  });
  
  // Structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': item.position,
      'name': item.name,
      'item': `${window.location.origin}${item.path}`
    }))
  };
  
  if (isRoot) {
    return null; // Don't show breadcrumbs on home page
  }
  
  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />
      
      <nav 
        className={`py-3 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto">
          <ol 
            className="flex flex-wrap items-center gap-x-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
            // Improved spacing and wrapping for mobile
            style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          >
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {/* Add separator between items (except for the first item) */}
                {index > 0 && (
                  <span className="mx-1 inline-flex items-center text-gray-400 dark:text-gray-500" aria-hidden="true">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
                
                {/* Each breadcrumb item */}
                {item.current ? (
                  // Current page (not a link)
                  <span 
                    className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}
                    // Limit the width of the last item on mobile if it's a blog title
                    style={item.isTruncated ? { 
                      maxWidth: '180px',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    } : {}}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  // Link to previous page
                  <Link
                    to={item.path}
                    className={`hover:text-blue-600 dark:hover:text-blue-400 truncate transition-colors flex items-center`}
                  >
                    {index === 0 && (
                      <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L10 4.414l6.293 6.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    )}
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
