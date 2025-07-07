import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../contexts/ThemeContext';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';

// --- PERUBAHAN DI SINI ---
// 1. Impor data yang sudah di-generate, bukan utility function
import { allBlogPosts } from '../data/blogPosts.js'; 
// 2. Impor hanya fungsi yang dibutuhkan dari blogUtils
import { searchPosts } from '../utils/blogUtils'; 


const BlogPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const blogPosts = allBlogPosts;
  
  // Get query parameters
  const categories = [...new Set(blogPosts.flatMap(post => post.categories || []))];
  const tags = [...new Set(blogPosts.flatMap(post => post.keywords ? (typeof post.keywords === 'string' ? post.keywords.split(',').map(t => t.trim()) : post.keywords) : []))];
  
  const queryCategory = searchParams.get('category');
  const queryTag = searchParams.get('tag');
  const querySearch = searchParams.get('q');
  const queryPage = parseInt(searchParams.get('page')) || 1;

  // State declarations
  const [activeCategory, setActiveCategory] = useState(queryCategory || 'all');
  const [activeTag, setActiveTag] = useState(queryTag || 'all');
  const [searchTerm, setSearchTerm] = useState(querySearch || '');
  const [showTags, setShowTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(queryPage);
  
  // Pagination constants
  const POSTS_PER_PAGE = 6;

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    if (activeTag && activeTag !== 'all') {
      params.set('tag', activeTag);
    }
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    if (currentPage > 1) {
      params.set('page', currentPage);
    }
    
    const newSearch = params.toString();
    if (newSearch) {
      setSearchParams(params);
    } else if (location.search) {
      // Clear search params if all filters are removed
      setSearchParams({});
    }
  }, [activeCategory, activeTag, searchTerm, currentPage, setSearchParams, location.search]);
  
  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTag, searchTerm]);
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Filter posts based on all criteria
  // 1. Mulai dengan semua postingan
  let filteredPosts = [...blogPosts];

  // 2. Terapkan filter KATEGORI terlebih dahulu
  if (activeCategory !== 'all') {
    filteredPosts = filteredPosts.filter(post => {
      if (!post.categories) return false;
      const postCategories = Array.isArray(post.categories) 
        ? post.categories 
        : post.categories.split(',').map(c => c.trim());
      return postCategories.includes(activeCategory);
    });
  }

  // 3. Terapkan filter TAG pada hasil dari filter kategori
  if (activeTag !== 'all') {
    filteredPosts = filteredPosts.filter(post => {
      if (!post.keywords) return false;
      const postTags = Array.isArray(post.keywords)
        ? post.keywords
        : post.keywords.split(',').map(t => t.trim());
      return postTags.includes(activeTag);
    });
  }

  // 4. Terapkan filter PENCARIAN pada hasil dari semua filter sebelumnya
  if (searchTerm) {
    filteredPosts = searchPosts(filteredPosts, searchTerm);
  }
  
  // Calculate pagination values
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Ensure currentPage is valid
  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  // Get current posts for this page
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
  
  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Blog list structured data
  const blogListStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": currentPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": indexOfFirstPost + index + 1,
        "url": `${window.location.origin}/blog/${post.slug}`,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Person",
            "name": post.author || "Tim Wareng Jaya Teknik"
          },
          "datePublished": post.isoDate || post.date,
          "image": post.coverImage ? `${window.location.origin}${post.coverImage}` : `${window.location.origin}/images/placeholder.svg`
        }
      }))
    }
  };
  
  return (
    <>
      <SEO 
        title="Blog - Artikel & Tips Seputar Konstruksi dan Pengerjaan Logam"
        description="Kumpulan artikel, tips, dan panduan lengkap seputar konstruksi, pengerjaan logam, pembuatan kanopi, teralis, pagar, dan berbagai layanan teknik yang kami tawarkan."
        canonicalUrl={`${window.location.origin}/blog${location.search}`}
        keywords={['blog konstruksi', 'tips pengerjaan logam', 'artikel kanopi', 'panduan teralis', 'blog bengkel las']}
      />
      
      <StructuredData data={blogListStructuredData} />
      
      <Breadcrumbs currentPage="Blog" />
      
      {/* Hero Section - Refined with more subtle design */}
      <section className={`relative py-14 px-4 ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center relative z-10"
          >
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Blog Wareng Jaya Teknik
            </h1>
            <p className={`text-lg max-w-3xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Artikel, tips, dan panduan lengkap seputar konstruksi, pengerjaan logam, dan solusi teknik untuk rumah dan bangunan Anda.
            </p>
            
            {/* Search and filter section - Redesigned for better visual appeal */}
            <div className={`max-w-2xl mx-auto rounded-xl shadow-md p-5 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-blue-600'
                    }`}
                    aria-label="Pencarian artikel"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 sm:flex-shrink-0"
                >
                  Cari
                </button>
              </form>
              
              {/* Categories - Redesigned with better spacing and interaction */}
              {categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-blue-600 text-white font-medium'
                        : isDark
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white font-medium'
                          : isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Tags - Improved dropdown interaction */}
              {tags.length > 0 && (
                <div className="mt-4">
                  <button 
                    onClick={() => setShowTags(!showTags)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-300 border ${
                      showTags 
                        ? isDark ? 'bg-blue-600/20 border-blue-500/50' : 'bg-blue-50 border-blue-200' 
                        : isDark ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    aria-expanded={showTags}
                    aria-controls="tag-list"
                  >
                    <div className="flex items-center">
                      <svg 
                        className={`w-5 h-5 mr-2 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {showTags ? 'Sembunyikan Tag' : 'Tampilkan Tag'} 
                        <span className={`ml-1.5 px-2 py-0.5 text-xs rounded-full ${isDark ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                          {tags.length}
                        </span>
                      </span>
                    </div>
                    <div className={`relative ${showTags ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}>
                      <svg 
                        className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {showTags && (
                        <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'} animate-pulse`}></span>
                      )}
                    </div>
                  </button>
                  
                  {showTags && (
                    <motion.div 
                      id="tag-list"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`mt-3 p-4 rounded-lg border shadow-sm ${
                        isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-100'
                      }`}
                    >
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setActiveTag('all')}
                          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 flex items-center ${
                            activeTag === 'all'
                              ? `${isDark ? 'bg-green-600' : 'bg-green-500'} text-white font-medium shadow-sm`
                              : isDark
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center">
                            {activeTag === 'all' && (
                              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            Semua Tag
                          </span>
                        </button>
                        
                        {tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 flex items-center ${
                              activeTag === tag
                                ? `${isDark ? 'bg-green-600' : 'bg-green-500'} text-white font-medium shadow-sm`
                                : isDark
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="flex items-center">
                              {activeTag === tag && (
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Blog Posts Section - Redesigned with improved card layout */}
      <section className={`py-12 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-6xl">
          {filteredPosts.length > 0 ? (
            <>
              {(activeCategory !== 'all' || activeTag !== 'all' || searchTerm) && (
                <div className="mb-8 text-center">
                  <h2 className={`text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Menampilkan {filteredPosts.length} artikel
                    {activeCategory !== 'all' && ` dalam kategori "${activeCategory}"`}
                    {activeTag !== 'all' && ` dengan tag "${activeTag}"`}
                    {searchTerm && ` untuk pencarian "${searchTerm}"`}
                    {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
                  </h2>
                  <button 
                    onClick={() => { 
                      setActiveCategory('all'); 
                      setActiveTag('all'); 
                      setSearchTerm(''); 
                      setCurrentPage(1);
                    }}
                    className={`mt-2 text-sm flex items-center mx-auto ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Tampilkan semua artikel
                  </button>
                </div>
              )}
              
              {/* Enhanced blog card grid */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentPosts.map((post) => (
                  <motion.article 
                    key={post.slug}
                    variants={cardVariant}
                    className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                  >
                    <Link to={`/blog/${post.slug}`} className="block" aria-label={post.title}>
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={post.coverImage || '/images/placeholder.svg'} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="220"
                        />
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Category badge - added for better visual cues */}
                        {post.categories && (
                          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-md">
                            {Array.isArray(post.categories) 
                              ? post.categories[0] 
                              : post.categories.split(',')[0].trim()}
                          </span>
                        )}
                        
                        {/* Date on image bottom for cleaner design */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm rounded-md">
                            {post.formattedDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h2 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {post.title}
                        </h2>
                        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-7 w-7 rounded-full overflow-hidden mr-2 border border-gray-200 dark:border-gray-700">
                              <img 
                                src={post.authorImage || '/images/profile.webp'} 
                                alt={post.author || 'Author'} 
                                className="h-full w-full object-cover"
                                loading="lazy"
                                width="28"
                                height="28"
                              />
                            </div>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {post.author || 'Tim Wareng Jaya'}
                            </span>
                          </div>
                          <span className={`text-xs flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readingTime} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
              
              {/* Pagination Navigation */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav aria-label="Page navigation" className="flex items-center">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`mx-1 px-3 py-2 rounded-md flex items-center ${
                        currentPage === 1
                          ? isDark ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      aria-label="Previous page"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show current page, first page, last page, and pages 1 before/after current page
                      if (
                        pageNumber === currentPage ||
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        pageNumber === currentPage - 1 ||
                        pageNumber === currentPage + 1
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`mx-1 px-4 py-2 rounded-md ${
                              pageNumber === currentPage
                                ? 'bg-blue-600 text-white'
                                : isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        // Show ellipsis for skipped pages
                        return (
                          <span key={pageNumber} className={`mx-1 px-3 py-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`mx-1 px-3 py-2 rounded-md flex items-center ${
                        currentPage === totalPages
                          ? isDark ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      aria-label="Next page"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || activeCategory !== 'all' || activeTag !== 'all' ? (
                <>
                  <p className="text-xl">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
                  <p className="mt-2">Coba ubah filter atau kata kunci pencarian Anda.</p>
                  <button 
                    onClick={() => { 
                      setSearchTerm(''); 
                      setActiveCategory('all'); 
                      setActiveTag('all');
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Tampilkan Semua Artikel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xl">Belum ada artikel yang dipublikasikan.</p>
                  <p className="mt-2">Silakan kembali lagi nanti untuk melihat konten terbaru dari kami.</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section - Redesigned with better visual appeal */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gradient-to-t from-gray-800 to-gray-900' : 'bg-gradient-to-t from-blue-50 to-white'}`}>
        <div className="container mx-auto max-w-4xl">
          <div className={`rounded-xl shadow-lg p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Dapatkan Tips & Update Terbaru
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-lg mx-auto`}>
                Berlangganan newsletter kami untuk mendapatkan artikel terbaru dan tips berguna langsung ke email Anda.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  placeholder="Alamat email Anda" 
                  className={`pl-10 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 focus:ring-blue-600'
                  }`}
                  required
                  aria-label="Email untuk newsletter"
                />
              </div>
              <button 
                type="submit" 
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Berlangganan
              </button>
            </form>
            <p className={`mt-4 text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Kami menghormati privasi Anda. Anda dapat berhenti berlangganan kapan saja.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
