import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StructuredData from './StructuredData';

const PATH_NAMES = {
  blog: 'Blog',
  about: 'Tentang Kami',
  services: 'Layanan',
  gallery: 'Galeri',
  contact: 'Kontak',
};

/**
 * Breadcrumbs component for better navigation and SEO
 * @param {Object} props - Component props
 * @param {string} props.currentPage - Current page name (override auto-detection)
 * @param {Object} props.blogPost - Blog post data for blog post pages
 */
const Breadcrumbs = ({ currentPage, blogPost }) => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);
  const isRoot = paths.length === 0;

  const breadcrumbItems = [{ name: 'Beranda', path: '/', position: 1 }];
  let accumulatedPath = '';

  paths.forEach((path, index) => {
    accumulatedPath += `/${path}`;

    let name = PATH_NAMES[path] || path.charAt(0).toUpperCase() + path.slice(1);

    if (blogPost && index === paths.length - 1 && paths[0] === 'blog') {
      name = blogPost.title;
    }

    if (currentPage && index === paths.length - 1) {
      name = currentPage;
    }

    breadcrumbItems.push({
      name,
      path: accumulatedPath,
      position: index + 2,
      current: index === paths.length - 1,
    });
  });

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item) => ({
      '@type': 'ListItem',
      'position': item.position,
      'name': item.name,
      'item': `${window.location.origin}${item.path}`,
    })),
  };

  if (isRoot) {
    return null;
  }

  return (
    <>
      <StructuredData data={breadcrumbStructuredData} />

      <nav
        className="border-b border-line bg-surface px-4 py-2 md:px-6"
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex w-full max-w-6xl items-center overflow-x-auto whitespace-nowrap font-mono text-xs text-ink-muted md:text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-line" aria-hidden="true">
                  /
                </span>
              )}
              {item.current ? (
                <span
                  className="max-w-[200px] truncate font-medium text-ink md:max-w-[400px]"
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="inline-flex min-h-8 items-center transition-colors duration-150 hover:text-accent"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
