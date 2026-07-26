import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import StructuredData from '../components/StructuredData';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import { allBlogPosts } from '../data/blogPosts.js';
import { searchPosts } from '../utils/blogUtils';

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const blogPosts = allBlogPosts;

  const categories = [...new Set(blogPosts.flatMap((post) => post.categories || []))];
  const tags = [
    ...new Set(
      blogPosts.flatMap((post) =>
        post.keywords
          ? typeof post.keywords === 'string'
            ? post.keywords.split(',').map((t) => t.trim())
            : post.keywords
          : []
      )
    ),
  ];

  const queryCategory = searchParams.get('category');
  const queryTag = searchParams.get('tag');
  const querySearch = searchParams.get('q');
  const queryPage = parseInt(searchParams.get('page')) || 1;

  const [activeCategory, setActiveCategory] = useState(queryCategory || 'all');
  const [activeTag, setActiveTag] = useState(queryTag || 'all');
  const [searchTerm, setSearchTerm] = useState(querySearch || '');
  const [showTags, setShowTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(queryPage);

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
      setSearchParams({});
    }
  }, [activeCategory, activeTag, searchTerm, currentPage, setSearchParams, location.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTag, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  let filteredPosts = [...blogPosts];

  if (activeCategory !== 'all') {
    filteredPosts = filteredPosts.filter((post) => {
      if (!post.categories) return false;
      const postCategories = Array.isArray(post.categories)
        ? post.categories
        : post.categories.split(',').map((c) => c.trim());
      return postCategories.includes(activeCategory);
    });
  }

  if (activeTag !== 'all') {
    filteredPosts = filteredPosts.filter((post) => {
      if (!post.keywords) return false;
      const postTags = Array.isArray(post.keywords)
        ? post.keywords
        : post.keywords.split(',').map((t) => t.trim());
      return postTags.includes(activeTag);
    });
  }

  if (searchTerm) {
    filteredPosts = searchPosts(filteredPosts, searchTerm);
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const hasActiveFilter = activeCategory !== 'all' || activeTag !== 'all' || Boolean(searchTerm);
  const featuredPost = !hasActiveFilter && currentPage === 1 ? currentPosts[0] : null;
  const listPosts = featuredPost ? currentPosts.slice(1) : currentPosts;

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveTag('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFirstCategory = (post) =>
    post.categories
      ? Array.isArray(post.categories)
        ? post.categories[0]
        : post.categories.split(',')[0].trim()
      : null;

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

      {/* Page header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Blog
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Artikel & Panduan
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Tips dan panduan seputar konstruksi, pengerjaan logam, kanopi,
            teralis, dan pagar dari bengkel kami.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            role="search"
          >
            <div className="relative flex-grow">
              <FaSearch
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                size={14}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="min-h-11 w-full rounded-btn border border-line bg-surface py-2.5 pl-9 pr-4 text-base text-ink placeholder:text-ink-muted"
                aria-label="Pencarian artikel"
              />
            </div>
            <button
              type="submit"
              className="min-h-11 rounded-btn bg-accent px-5 font-sans text-sm font-semibold tracking-wide text-accent-ink transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98] motion-reduce:active:scale-100"
            >
              Cari
            </button>
          </form>

          {/* Category chips */}
          {categories.length > 0 && (
            <div
              className="mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter kategori artikel"
            >
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                aria-pressed={activeCategory === 'all'}
                className={`min-h-11 rounded-btn border px-4 font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                  activeCategory === 'all'
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                }`}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`min-h-11 rounded-btn border px-4 font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                    activeCategory === category
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Tag filter */}
          {tags.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowTags(!showTags)}
                aria-expanded={showTags}
                aria-controls="tag-list"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-ink-muted transition-colors duration-150 hover:text-accent"
              >
                {showTags ? 'Sembunyikan Tag' : `Tampilkan Tag (${tags.length})`}
                <FaChevronDown
                  size={10}
                  aria-hidden="true"
                  className={`transition-transform duration-150 ${showTags ? 'rotate-180' : ''}`}
                />
              </button>

              {showTags && (
                <div id="tag-list" className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTag('all')}
                    aria-pressed={activeTag === 'all'}
                    className={`min-h-11 rounded-btn border px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                      activeTag === 'all'
                        ? 'border-accent bg-accent text-accent-ink'
                        : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                    }`}
                  >
                    Semua Tag
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      aria-pressed={activeTag === tag}
                      className={`min-h-11 rounded-btn border px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
                        activeTag === tag
                          ? 'border-accent bg-accent text-accent-ink'
                          : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Posts */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          {filteredPosts.length > 0 ? (
            <>
              {hasActiveFilter && (
                <div className="mb-10 border border-line bg-surface p-4">
                  <p className="font-mono text-sm text-ink-muted" aria-live="polite">
                    {totalPosts} artikel
                    {activeCategory !== 'all' && ` — kategori "${activeCategory}"`}
                    {activeTag !== 'all' && ` — tag "${activeTag}"`}
                    {searchTerm && ` — pencarian "${searchTerm}"`}
                    {totalPages > 1 && ` — halaman ${currentPage}/${totalPages}`}
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 inline-flex min-h-11 items-center font-mono text-xs font-medium uppercase tracking-wider text-accent hover:underline"
                  >
                    Tampilkan semua artikel
                  </button>
                </div>
              )}

              {/* Featured post */}
              {featuredPost && (
                <Reveal as="article" className="border-b border-line pb-12">
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="group grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10"
                  >
                    <span className="block overflow-hidden border border-line">
                      <img
                        src={featuredPost.coverImage || '/images/placeholder.svg'}
                        alt={featuredPost.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-150 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                        width="600"
                        height="375"
                      />
                    </span>
                    <span className="block">
                      <span className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
                        <span className="text-accent">Terbaru</span>
                        {getFirstCategory(featuredPost) && (
                          <span>{getFirstCategory(featuredPost)}</span>
                        )}
                        <span>{featuredPost.formattedDate}</span>
                        <span>{featuredPost.readingTime} mnt</span>
                      </span>
                      <span className="mt-3 block font-display text-2xl font-semibold uppercase tracking-tight text-ink transition-colors duration-150 group-hover:text-accent md:text-3xl text-balance">
                        {featuredPost.title}
                      </span>
                      <span className="mt-3 block text-base text-ink-muted">
                        {featuredPost.excerpt}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              )}

              {/* Post rows */}
              <div className="divide-y divide-line">
                {listPosts.map((post) => (
                  <Reveal as="article" key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group grid grid-cols-1 gap-4 py-8 sm:grid-cols-[200px_1fr] sm:gap-6 md:grid-cols-[240px_1fr]"
                    >
                      <span className="block overflow-hidden border border-line">
                        <img
                          src={post.coverImage || '/images/placeholder.svg'}
                          alt={post.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-150 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                          loading="lazy"
                          width="240"
                          height="150"
                        />
                      </span>
                      <span className="block">
                        <span className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
                          {getFirstCategory(post) && <span>{getFirstCategory(post)}</span>}
                          <span>{post.formattedDate}</span>
                          <span>{post.readingTime} mnt</span>
                        </span>
                        <span className="mt-2 block font-display text-xl font-semibold uppercase tracking-tight text-ink transition-colors duration-150 group-hover:text-accent md:text-2xl text-balance">
                          {post.title}
                        </span>
                        <span className="mt-2 block text-base text-ink-muted line-clamp-2">
                          {post.excerpt}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Navigasi halaman"
                  className="mt-12 flex items-center justify-center gap-1"
                >
                  <button
                    type="button"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Halaman sebelumnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
                  >
                    <FaChevronLeft size={12} aria-hidden="true" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
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
                          type="button"
                          onClick={() => paginate(pageNumber)}
                          aria-label={`Halaman ${pageNumber}`}
                          aria-current={pageNumber === currentPage ? 'page' : undefined}
                          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border font-mono text-sm transition-colors duration-150 ${
                            pageNumber === currentPage
                              ? 'border-accent bg-accent text-accent-ink'
                              : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="px-2 font-mono text-sm text-ink-muted"
                          aria-hidden="true"
                        >
                          …
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    type="button"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Halaman berikutnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
                  >
                    <FaChevronRight size={12} aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="border border-line bg-surface p-8 text-center">
              {hasActiveFilter ? (
                <>
                  <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                    Tidak Ada Hasil
                  </h2>
                  <p className="mt-2 text-base text-ink-muted">
                    Tidak ada artikel yang sesuai. Coba ubah filter atau kata
                    kunci pencarian Anda.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-btn bg-accent px-5 font-sans text-sm font-semibold tracking-wide text-accent-ink transition-[filter] duration-150 hover:brightness-110"
                  >
                    Tampilkan Semua Artikel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                    Belum Ada Artikel
                  </h2>
                  <p className="mt-2 text-base text-ink-muted">
                    Silakan kembali lagi nanti untuk melihat konten terbaru dari
                    kami.
                  </p>
                </>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default BlogPage;
