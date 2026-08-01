import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaChevronDown,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import Breadcrumbs from '../components/Breadcrumbs';
import LoadingSpinner from '../components/LoadingSpinner';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { allBlogPosts } from '../data/blogPosts.js';
import { getRelatedPosts } from '../utils/blogUtils';
import { absoluteUrl } from '../config/site';

const headingId = (children) =>
  children
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

const customRenderers = {
  // Markdown bodies start with a `#` title, but the page already renders the
  // post title as the single <h1>. Downgrade to <h2> so each page has exactly
  // one <h1> and the heading hierarchy stays valid.
  h1: ({ node, ...props }) => (
    <h2
      id={headingId(props.children)}
      className="mt-10 mb-4 border-b border-line pb-2 font-display text-2xl font-semibold uppercase tracking-tight text-ink sm:text-3xl"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      id={headingId(props.children)}
      className="mt-9 mb-3 font-display text-xl font-semibold uppercase tracking-tight text-ink sm:text-2xl"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      id={headingId(props.children)}
      className="mt-7 mb-2 font-display text-lg font-semibold uppercase tracking-tight text-ink sm:text-xl"
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      id={headingId(props.children)}
      className="mt-6 mb-2 font-display text-base font-semibold uppercase tracking-tight text-ink sm:text-lg"
      {...props}
    />
  ),
  p: ({ node, ...props }) => <p className="mb-5 leading-relaxed" {...props} />,
  a: ({ node, ...props }) => (
    <a
      className="text-accent underline decoration-accent/50 underline-offset-2 transition-colors duration-150 hover:decoration-accent"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => <ul className="mb-5 list-disc space-y-1 pl-5" {...props} />,
  ol: ({ node, ...props }) => <ol className="mb-5 list-decimal space-y-1 pl-5" {...props} />,
  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-5 border-l-2 border-accent bg-surface py-2 pl-4 italic text-ink-muted"
      {...props}
    />
  ),
  code: ({ node, inline, ...props }) =>
    inline ? (
      <code
        className="rounded-btn bg-surface px-1.5 py-0.5 font-mono text-sm text-accent"
        {...props}
      />
    ) : (
      <code
        className="my-5 block overflow-x-auto rounded-card border border-line bg-surface p-3 font-mono text-sm text-ink"
        {...props}
      />
    ),
  img: ({ node, ...props }) => (
    <figure className="my-8">
      <img
        className="mx-auto h-auto max-w-full border border-line"
        style={{ maxHeight: '500px' }}
        loading="lazy"
        {...props}
      />
      {props.alt && props.alt !== props.src && (
        <figcaption className="mt-2 text-center font-mono text-sm text-ink-muted">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ node, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="border border-line bg-surface px-4 py-2 text-left font-display text-sm font-semibold uppercase tracking-wide text-ink"
      {...props}
    />
  ),
  td: ({ node, ...props }) => <td className="border border-line px-4 py-2" {...props} />,
};

const extractFAQs = (content) => {
  const questionRegex = /^(#{1,6})\s+(.*\?)\s*$/gm;
  const faqs = [];
  let match;
  let lastQuestionIndex = -1;

  while ((match = questionRegex.exec(content)) !== null) {
    const questionIndex = match.index;

    if (lastQuestionIndex !== -1) {
      const previousQuestionMatch = content
        .substring(lastQuestionIndex)
        .match(/^(#{1,6})\s+(.*\?)\s*$/m);
      if (previousQuestionMatch) {
        const previousQuestion = previousQuestionMatch[0];
        const answerStartIndex = lastQuestionIndex + previousQuestion.length;
        const answerText = content.substring(answerStartIndex, questionIndex).trim();

        faqs.push({
          question: content
            .substring(lastQuestionIndex)
            .match(/^(?:#{1,6})\s+(.*\?)\s*$/m)[1]
            .trim(),
          answer: answerText,
        });
      }
    }

    lastQuestionIndex = questionIndex;
  }

  if (lastQuestionIndex !== -1) {
    const lastQuestionMatch = content
      .substring(lastQuestionIndex)
      .match(/^(#{1,6})\s+(.*\?)\s*$/m);
    if (lastQuestionMatch) {
      const lastQuestion = lastQuestionMatch[0];
      const answerStartIndex = lastQuestionIndex + lastQuestion.length;
      const answerText = content.substring(answerStartIndex).trim();

      faqs.push({
        question: content
          .substring(lastQuestionIndex)
          .match(/^(?:#{1,6})\s+(.*\?)\s*$/m)[1]
          .trim(),
        answer: answerText,
      });
    }
  }

  return faqs;
};

const buildTableOfContents = (content) => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const tocItems = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    tocItems.push({ text, id, level });
  }

  return tocItems;
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  // Derived synchronously during render: the post data is bundled at build
  // time, so there is nothing to await. Doing this in an effect instead would
  // make the prerendered HTML contain only a loading spinner.
  const post = useMemo(
    () => allBlogPosts.find((p) => p.slug === slug) || null,
    [slug]
  );

  const tableOfContents = useMemo(
    () => (post ? buildTableOfContents(post.content) : []),
    [post]
  );

  const faqItems = useMemo(() => (post ? extractFAQs(post.content) : []), [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const keywords = post.keywords
      ? typeof post.keywords === 'string'
        ? post.keywords.split(',').map((k) => k.trim())
        : post.keywords
      : [];
    return getRelatedPosts(allBlogPosts, slug, keywords, 3);
  }, [post, slug]);

  useEffect(() => {
    setCopied(false);
  }, [slug]);

  // Unknown slug: only reachable client-side (every real slug is prerendered).
  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
  }, [post, navigate]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Gagal menyalin tautan:', error);
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <LoadingSpinner />
      </div>
    );
  }

  const postCategories = post.categories
    ? Array.isArray(post.categories)
      ? post.categories
      : post.categories.split(',').map((c) => c.trim())
    : [];

  const postUrl = absoluteUrl(`/blog/${slug}`);

  return (
    <>
      <SEO
        title={post.title}
        description={post.description || post.excerpt}
        canonicalUrl={absoluteUrl(`/blog/${slug}`)}
        ogImage={absoluteUrl(post.coverImage || '/images/placeholder.svg')}
        ogType="article"
        keywords={post.keywords ? post.keywords.split(',').map((k) => k.trim()) : []}
        publishedTime={post.isoDate}
        modifiedTime={post.updatedAt || post.isoDate}
        author={post.author || 'Tim Wareng Jaya Teknik'}
        section={post.categories ? post.categories.split(',')[0].trim() : 'Konstruksi'}
      />

      <StructuredData blogPost={post} />

      {faqItems.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((faq) => ({
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

      {/* Article header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
          <Link
            to="/blog"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-ink-muted transition-colors duration-150 hover:text-accent"
          >
            <FaArrowLeft size={10} aria-hidden="true" />
            Kembali ke Blog
          </Link>

          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl text-balance">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-ink-muted">
            <span>{post.author || 'Tim Wareng Jaya Teknik'}</span>
            <span aria-hidden="true">/</span>
            <span>{post.formattedDate}</span>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime} menit membaca</span>
          </div>

          {postCategories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {postCategories.map((category) => (
                <Link
                  key={category}
                  to={`/blog?category=${encodeURIComponent(category)}`}
                  className="inline-flex min-h-11 items-center rounded-btn border border-line bg-surface px-3 font-mono text-xs font-medium uppercase tracking-wider text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="bg-paper pt-8">
          <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full border border-line object-cover"
              style={{ maxHeight: '450px', objectPosition: 'center' }}
              width="1200"
              height="630"
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="bg-paper py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* TOC — desktop */}
            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block lg:w-1/4">
                <nav
                  aria-label="Daftar isi"
                  className="sticky top-24 rounded-card border border-line bg-surface p-4"
                >
                  <p className="border-b border-line pb-2 font-display text-base font-semibold uppercase tracking-wide text-ink">
                    Daftar Isi
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {tableOfContents.map((item, index) => (
                      <li
                        key={index}
                        style={{ marginLeft: `${(item.level - 1) * 10}px` }}
                      >
                        <a
                          href={`#${item.id}`}
                          className="block py-0.5 text-sm text-ink-muted transition-colors duration-150 hover:text-accent hover:underline"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            <div className={tableOfContents.length > 0 ? 'lg:w-3/4' : 'w-full'}>
              {/* TOC — mobile */}
              {tableOfContents.length > 0 && (
                <details className="mb-8 rounded-card border border-line bg-surface p-4 lg:hidden">
                  <summary className="flex min-h-11 cursor-pointer items-center justify-between font-display text-base font-semibold uppercase tracking-wide text-ink">
                    Daftar Isi
                    <FaChevronDown size={12} aria-hidden="true" />
                  </summary>
                  <ul className="mt-3 space-y-1.5">
                    {tableOfContents.map((item, index) => (
                      <li
                        key={index}
                        style={{ marginLeft: `${(item.level - 1) * 10}px` }}
                      >
                        <a
                          href={`#${item.id}`}
                          className="block py-0.5 text-sm text-ink-muted transition-colors duration-150 hover:text-accent hover:underline"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <article>
                <div className="mx-auto max-w-[65ch] text-lg leading-relaxed text-ink">
                  <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                {post.keywords && (
                  <div className="mt-12 border-t border-line pt-6">
                    <p className="font-mono text-sm font-medium uppercase tracking-widest text-ink-muted">
                      Tags
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.keywords.split(',').map((keyword, index) => (
                        <Link
                          key={index}
                          to={`/blog?tag=${encodeURIComponent(keyword.trim())}`}
                          className="inline-flex min-h-11 items-center rounded-btn border border-line bg-surface px-3 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                        >
                          {keyword.trim()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 border-t border-line pt-6">
                  <p className="font-mono text-sm font-medium uppercase tracking-widest text-ink-muted">
                    Bagikan Artikel
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Bagikan ke Facebook"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      <FaFacebookF size={16} aria-hidden="true" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Bagikan ke Twitter"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      <FaTwitter size={16} aria-hidden="true" />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Bagikan via WhatsApp"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      <FaWhatsapp size={16} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      aria-label="Salin tautan artikel"
                      className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-line bg-surface px-3 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      <FaLink size={14} aria-hidden="true" />
                      Salin Link
                    </button>
                    <span aria-live="polite" className="font-mono text-xs text-accent">
                      {copied ? 'Tersalin!' : ''}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <Container>
            <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
              Artikel Terkait
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-ink md:text-3xl">
              Baca Juga
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Reveal key={relatedPost.slug}>
                  <Card as="article" hover className="h-full overflow-hidden">
                    <Link to={`/blog/${relatedPost.slug}`} className="group block h-full">
                      <span className="block overflow-hidden border-b border-line">
                        <img
                          src={relatedPost.coverImage || '/images/placeholder.svg'}
                          alt={relatedPost.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-150 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                          loading="lazy"
                          width="400"
                          height="250"
                        />
                      </span>
                      <span className="block p-4">
                        <span className="block font-mono text-xs uppercase tracking-wider text-ink-muted">
                          {relatedPost.formattedDate}
                        </span>
                        <span className="mt-2 block font-display text-lg font-semibold uppercase tracking-tight text-ink transition-colors duration-150 group-hover:text-accent line-clamp-2">
                          {relatedPost.title}
                        </span>
                        <span className="mt-2 block text-sm text-ink-muted line-clamp-2">
                          {relatedPost.excerpt}
                        </span>
                      </span>
                    </Link>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <div className="stripe" aria-hidden="true"></div>
      <section className="bg-ink py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper md:text-4xl text-balance">
              Butuh Jasa Las & Konstruksi?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">
              Mau buat kanopi, pagar, teralis, atau konstruksi baja? Tanya-tanya
              dulu saja, gratis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/6281398427309"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Chat WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/services"
                className="border-paper/40 text-paper hover:border-accent hover:text-accent"
              >
                Lihat Layanan
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
};

export default BlogPostPage;
