import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaWarehouse,
  FaShieldAlt,
  FaBorderAll,
  FaRulerCombined,
  FaIndustry,
  FaDoorOpen,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

const MARQUEE_SERVICES = [
  'Kanopi',
  'Pagar',
  'Teralis',
  'Railing',
  'Konstruksi Baja',
  'Pintu Besi',
];

const SERVICES = [
  {
    icon: FaWarehouse,
    title: 'Kanopi',
    description:
      'Kanopi untuk carport, teras, atau halaman. Atapnya bisa spandek, alderon, polikarbonat, atau kaca.',
  },
  {
    icon: FaShieldAlt,
    title: 'Pagar & Gerbang',
    description:
      'Pagar dan gerbang besi yang kuat. Modelnya mengikuti selera Anda, dari minimalis sampai klasik.',
  },
  {
    icon: FaBorderAll,
    title: 'Teralis',
    description:
      'Teralis jendela dan pintu, dibuat pas dengan ukuran kusen dan gaya rumah Anda.',
  },
  {
    icon: FaRulerCombined,
    title: 'Railing',
    description:
      'Railing tangga dan balkon yang kuat dipegang dan rapi sambungannya.',
  },
  {
    icon: FaIndustry,
    title: 'Konstruksi Baja',
    description:
      'Rangka baja untuk rumah, ruko, gudang, sampai tower air.',
  },
  {
    icon: FaDoorOpen,
    title: 'Pintu Besi',
    description:
      'Pintu besi dan pintu lipat berbagai model, dicat anti karat supaya awet.',
  },
];

const FEATURED_PROJECTS = [
  {
    title: 'Pintu Lipat Besi Modern',
    caption: 'Pintu lipat besi untuk rumah pribadi',
    image: '/images/project-1.webp',
  },
  {
    title: 'Railing Tangga Minimalis',
    caption: 'Railing tangga desain minimalis',
    image: '/images/project-2.webp',
  },
  {
    title: 'Kanopi Outdoor',
    caption: 'Kanopi area outdoor hunian',
    image: '/images/project-3.webp',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Survei & Ukur',
    description:
      'Kami datang ke lokasi, ukur langsung, dan dengarkan apa yang Anda mau.',
  },
  {
    title: 'Penawaran',
    description:
      'Rincian material dan harga kami kirim dulu. Tidak ada biaya tersembunyi.',
  },
  {
    title: 'Pengerjaan & Garansi',
    description:
      'Dikerjakan sesuai kesepakatan. Hasil las kami garansi.',
  },
];

const HomePage = () => {
  return (
    <>
      <SEO
        title="Beranda"
        description="Wareng Jaya Teknik - Bengkel las di Tajurhalang, Bogor. Melayani pembuatan kanopi, pagar, teralis, railing, pintu besi, dan konstruksi baja."
        canonicalUrl="https://warengjayateknik.my.id/"
        keywords={['bengkel las', 'kanopi', 'pagar besi', 'teralis', 'konstruksi baja', 'Tajurhalang', 'Bogor', 'Wareng Jaya Teknik']}
      />

      {/* Hero */}
      <section className="border-b border-line bg-paper py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <Reveal priority>
            <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
              Bengkel Las — Tajurhalang, Bogor
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl text-balance">
              Las, Kanopi &amp; Konstruksi Baja
            </h1>
            <p className="mt-6 max-w-lg text-base text-ink-muted md:text-lg">
              Butuh kanopi, pagar, atau rangka baja? Kami kerjakan sendiri di{' '}
              <Link
                to="/about"
                className="text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
              >
                bengkel kami di Tajurhalang
              </Link>
              , dari ukur sampai pasang.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/6281398427309"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={20} aria-hidden="true" />
                Hubungi via WhatsApp
              </Button>
              <Button variant="outline" size="lg" to="/gallery">
                Lihat Hasil Kerja
              </Button>
            </div>
          </Reveal>
          <Reveal priority delay={0.1} className="relative">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full border border-accent"
              aria-hidden="true"
            ></div>
            <img
              src="/images/hero-new.webp"
              alt="Tukang las sedang mengelas rangka besi dengan percikan api"
              className="relative aspect-[4/3] w-full object-cover"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="1200"
              height="675"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
          </Reveal>
        </Container>
      </section>

      {/* Services marquee band */}
      <section className="bg-ink py-6">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8">
            {MARQUEE_SERVICES.map((service, index) => (
              <li
                key={service}
                className="flex items-center gap-x-6 font-display text-lg font-semibold uppercase tracking-wide text-paper md:gap-x-8 md:text-xl"
              >
                {index > 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true"></span>
                )}
                {service}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="01" label="Layanan" title="Apa yang Kami Kerjakan" />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.05}>
                  <Card hover className="h-full">
                    <Link to="/services" className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between">
                        <Icon size={28} className="text-accent" aria-hidden="true" />
                        <span className="font-mono text-sm text-ink-muted">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-tight text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {service.description}
                      </p>
                    </Link>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured work */}
      <section className="border-y border-line bg-surface py-16 md:py-24">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading index="02" label="Hasil Kerja" title="Proyek Terbaru" />
            <Link
              to="/gallery"
              className="inline-flex min-h-11 items-center font-mono text-sm font-medium uppercase tracking-wider text-accent hover:underline"
            >
              Semua proyek →
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURED_PROJECTS.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <figure>
                  <img
                    src={project.image}
                    alt={project.title}
                    width="1200"
                    height="900"
                    className="aspect-[4/3] w-full border border-line object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.svg';
                    }}
                  />
                  <figcaption className="mt-3">
                    <p className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                      {project.title}
                    </p>
                    <p className="font-mono text-xs text-ink-muted">{project.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Cara kerja */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="03" label="Cara Kerja" title="Prosesnya Sederhana" />
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.05}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl font-medium text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true"></span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Final CTA */}
      <div className="stripe" aria-hidden="true"></div>
      <section className="bg-ink py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper md:text-5xl text-balance">
              Punya Proyek? Diskusikan Gratis.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">
              Ceritakan saja rencananya. Kami bantu ukur dan hitung, penawarannya
              gratis. Belum yakin mau mulai dari mana? Baca dulu{' '}
              <Link to="/blog" className="text-accent underline underline-offset-2">
                artikel kami
              </Link>{' '}
              atau lihat{' '}
              <Link to="/contact" className="text-accent underline underline-offset-2">
                cara menghubungi kami
              </Link>
              .
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
                href="tel:+6281398427309"
                className="border-paper/40 text-paper hover:border-accent hover:text-accent"
              >
                Telepon Kami
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
