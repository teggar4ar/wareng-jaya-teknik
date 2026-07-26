import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

const WORK_VALUES = [
  {
    title: 'Ukur Dulu, Baru Hitung',
    description:
      'Kami survei dan ukur langsung di lokasi sebelum memberi harga — penawaran yang Anda terima sesuai kondisi nyata, bukan perkiraan.',
  },
  {
    title: 'Material Sesuai Kesepakatan',
    description:
      'Jenis dan ketebalan material kami tulis jelas di penawaran, dan itu yang kami pakai saat pengerjaan.',
  },
  {
    title: 'Pengerjaan Rapi',
    description:
      'Sambungan las digerinda halus, finishing cat merata, dan area kerja kami bersihkan sebelum serah terima.',
  },
  {
    title: 'Garansi Hasil Las',
    description:
      'Kalau ada sambungan yang bermasalah setelah pemasangan, kami datang dan perbaiki.',
  },
];

const SERVICE_AREAS = [
  'Tajurhalang',
  'Bojonggede',
  'Citayam',
  'Cibinong',
  'Depok',
  'Bogor & sekitarnya',
];

const AboutUsPage = () => {
  return (
    <>
      <SEO
        title="Tentang Kami"
        description="Pelajari tentang Wareng Jaya Teknik, bengkel las di Tajurhalang, Bogor — cara kami bekerja dan area yang kami layani."
        canonicalUrl="https://warengjayateknik.my.id/about"
        keywords={['tentang Wareng Jaya Teknik', 'bengkel las Tajurhalang', 'bengkel las Bogor', 'jasa las']}
      />

      {/* Page header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Tentang Kami
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Bengkel Las Tajurhalang
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Wareng Jaya Teknik adalah bengkel las di Tajurhalang, Kabupaten
            Bogor — melayani pembuatan kanopi, pagar, teralis, railing, pintu
            besi, dan konstruksi baja.
          </p>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-paper py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <SectionHeading index="01" label="Cerita Kami" title="Dikerjakan Langsung, Bukan Diperantarai" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Semua pesanan dikerjakan langsung di bengkel kami — dari
                pemotongan, pengelasan, sampai finishing. Anda berkomunikasi
                langsung dengan orang yang mengerjakan, tanpa perantara,
                sehingga detail permintaan tidak hilang di tengah jalan.
              </p>
              <p>
                Kami melayani rumah tinggal, ruko, hingga kebutuhan usaha di
                Tajurhalang dan sekitarnya. Skala pekerjaan menyesuaikan: dari
                teralis satu jendela sampai konstruksi baja untuk bangunan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full border border-accent"
              aria-hidden="true"
            ></div>
            <img
              src="/images/welding.webp"
              alt="Proses pengelasan rangka besi di bengkel Wareng Jaya Teknik"
              className="relative aspect-[4/3] w-full border border-line object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
          </Reveal>
        </Container>
      </section>

      {/* Cara kami bekerja */}
      <section className="border-y border-line bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="02" label="Cara Kami Bekerja" title="Yang Bisa Anda Pegang" />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {WORK_VALUES.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl font-medium text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true"></span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service area */}
      <section className="bg-paper py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal className="relative md:order-2">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full border border-accent"
              aria-hidden="true"
            ></div>
            <img
              src="/images/bengkel-bojonggede.webp"
              alt="Hasil pengerjaan bengkel las untuk area Bojonggede dan sekitarnya"
              className="relative aspect-[4/3] w-full border border-line object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder.svg';
              }}
            />
          </Reveal>
          <Reveal delay={0.1} className="md:order-1">
            <SectionHeading index="03" label="Area Layanan" title="Melayani Bogor & Sekitarnya" />
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              Bengkel kami berada di Jl. Raya Kalisuren, Tajurhalang. Untuk
              survei dan pemasangan, kami rutin melayani area berikut:
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 font-mono text-sm text-ink">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-accent" aria-hidden="true"></span>
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA */}
      <div className="stripe" aria-hidden="true"></div>
      <section className="bg-ink py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper md:text-4xl text-balance">
              Mau Lihat Cara Kami Bekerja?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">
              Lihat hasil pengerjaan kami, atau langsung diskusikan kebutuhan
              Anda lewat WhatsApp.
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
                to="/gallery"
                className="border-paper/40 text-paper hover:border-accent hover:text-accent"
              >
                Lihat Hasil Kerja
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
};

export default AboutUsPage;
