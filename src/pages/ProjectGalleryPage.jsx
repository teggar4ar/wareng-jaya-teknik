import React, { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

const PROJECTS = [
  {
    id: 1,
    title: 'Gerbang Lipat Besi',
    description: 'Gerbang lipat besi untuk akses masuk properti.',
    category: 'Pagar & Gerbang',
    src: '/images/gallery/lipat.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: 2,
    title: 'Teralis Jendela',
    description: 'Teralis pelindung jendela dengan pola dekoratif.',
    category: 'Teralis',
    src: '/images/gallery/teralis.jpg',
    width: 800,
    height: 1200,
  },
  {
    id: 3,
    title: 'Kanopi Rumah',
    description: 'Kanopi rangka besi untuk perlindungan cuaca area rumah.',
    category: 'Kanopi',
    src: '/images/gallery/kanopi.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: 4,
    title: 'Tangga Spiral',
    description: 'Tangga spiral hemat ruang dengan railing menyatu.',
    category: 'Tangga & Railing',
    src: '/images/gallery/spiral.jpg',
    width: 800,
    height: 1200,
  },
  {
    id: 5,
    title: 'Railing Tangga',
    description: 'Railing tangga untuk interior rumah.',
    category: 'Tangga & Railing',
    src: '/images/gallery/railing.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: 6,
    title: 'Pintu Teralis',
    description: 'Pintu teralis yang menggabungkan keamanan dan tampilan.',
    category: 'Pintu Besi',
    src: '/images/gallery/pintu.jpg',
    width: 800,
    height: 1200,
  },
  {
    id: 7,
    title: 'Railing Balkon',
    description: 'Railing balkon besi untuk rumah tinggal.',
    category: 'Tangga & Railing',
    src: '/images/gallery/pagar.jpg',
    width: 1200,
    height: 800,
  },
  {
    id: 8,
    title: 'Tower Air',
    description: 'Struktur penopang toren air dari rangka besi.',
    category: 'Konstruksi Baja',
    src: '/images/gallery/toren.jpeg',
    width: 800,
    height: 1200,
  },
  {
    id: 9,
    title: 'Pintu Dorong',
    description: 'Pintu dorong besi untuk rumah pribadi.',
    category: 'Pintu Besi',
    src: '/images/gallery/pintudorong.jpg',
    width: 1200,
    height: 800,
  },
];

const CATEGORIES = ['Semua', ...new Set(PROJECTS.map((project) => project.category))];

const ProjectGalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('Semua');

  const filteredProjects = useMemo(
    () =>
      filterCategory === 'Semua'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === filterCategory),
    [filterCategory]
  );

  const slides = filteredProjects.map((project) => ({
    src: project.src,
    title: project.title,
    description: project.description,
    width: project.width,
    height: project.height,
  }));

  const openLightbox = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <SEO
        title="Galeri Proyek"
        description="Jelajahi galeri proyek yang telah selesai yang menampilkan keahlian kami dalam fabrikasi logam, pintu, pagar, kanopi, dan pengerjaan logam khusus lainnya."
        canonicalUrl="https://warengjayateknik.my.id/gallery"
        keywords={['galeri proyek', 'portofolio pengerjaan logam', 'proyek yang telah selesai', 'contoh fabrikasi logam khusus']}
        ogType="article"
      />

      {/* Page header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Galeri
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Hasil Kerja Kami
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Dokumentasi proyek yang sudah kami kerjakan — klik foto untuk
            melihat lebih besar.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container>
          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter kategori proyek"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilterCategory(category)}
                aria-pressed={filterCategory === category}
                className={`min-h-11 rounded-btn border px-4 font-mono text-xs font-medium uppercase tracking-wider transition-colors duration-150 ${
                  filterCategory === category
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line bg-surface text-ink-muted hover:border-accent hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <Reveal key={project.id}>
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  aria-label={`Lihat foto ${project.title} lebih besar`}
                  className="group block w-full text-left"
                >
                  <span className="block overflow-hidden border border-line">
                    <img
                      src={project.src}
                      alt={project.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-150 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.svg';
                      }}
                    />
                  </span>
                  <span className="mt-3 block">
                    <span className="block font-display text-lg font-semibold uppercase tracking-tight text-ink">
                      {project.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-ink-muted">
                      {project.category}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="mt-10 border border-line bg-surface p-8 text-center">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
                Tidak Ada Proyek
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Saat ini tidak ada proyek dalam kategori "{filterCategory}".
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setFilterCategory('Semua')}
              >
                Lihat Semua Proyek
              </Button>
            </div>
          )}

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            index={index}
            plugins={[Captions, Zoom]}
            captions={{ showToggle: true, descriptionTextAlign: 'center' }}
            styles={{
              container: { backgroundColor: 'rgba(0, 0, 0, .9)' },
              captionsTitle: { fontSize: '1.25rem', fontWeight: 'bold' },
              captionsDescription: { fontSize: '1rem' },
            }}
          />
        </Container>
      </section>

      {/* Final CTA */}
      <div className="stripe" aria-hidden="true"></div>
      <section className="bg-ink py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper md:text-4xl text-balance">
              Ingin Hasil Seperti Ini?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">
              Kirim foto lokasi atau referensi desain Anda — kami bantu ukur
              dan beri penawaran.
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

export default ProjectGalleryPage;
