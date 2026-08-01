import React from 'react';
import Layout from './Layout';
import { allBlogPosts } from './data/blogPosts.js';

/**
 * Route definitions consumed by vite-react-ssg.
 *
 * Every path listed here (plus the paths returned by `getStaticPaths`) is
 * prerendered to a real HTML file at build time, so crawlers and social/AI
 * bots receive fully rendered markup instead of an empty SPA shell.
 */
export const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.jsx',
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/HomePage')),
        entry: 'src/pages/HomePage.jsx',
      },
      {
        path: 'about',
        Component: React.lazy(() => import('./pages/AboutUsPage')),
        entry: 'src/pages/AboutUsPage.jsx',
      },
      {
        path: 'services',
        Component: React.lazy(() => import('./pages/ServicesPage')),
        entry: 'src/pages/ServicesPage.jsx',
      },
      {
        path: 'gallery',
        Component: React.lazy(() => import('./pages/ProjectGalleryPage')),
        entry: 'src/pages/ProjectGalleryPage.jsx',
      },
      {
        path: 'contact',
        Component: React.lazy(() => import('./pages/ContactPage')),
        entry: 'src/pages/ContactPage.jsx',
      },
      {
        path: 'blog',
        Component: React.lazy(() => import('./pages/BlogPage')),
        entry: 'src/pages/BlogPage.jsx',
      },
      {
        path: 'blog/:slug',
        Component: React.lazy(() => import('./pages/BlogPostPage')),
        entry: 'src/pages/BlogPostPage.jsx',
        getStaticPaths: () => allBlogPosts.map((post) => `blog/${post.slug}`),
      },
      {
        path: 'privacy',
        Component: React.lazy(() => import('./pages/PrivacyPolicyPage')),
        entry: 'src/pages/PrivacyPolicyPage.jsx',
      },
      {
        path: '404',
        Component: React.lazy(() => import('./pages/NotFoundPage')),
        entry: 'src/pages/NotFoundPage.jsx',
      },
      {
        path: '*',
        Component: React.lazy(() => import('./pages/NotFoundPage')),
        entry: 'src/pages/NotFoundPage.jsx',
      },
    ],
  },
];

export default routes;
