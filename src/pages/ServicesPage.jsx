import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';

const WA_NUMBER = '6281398427309';

const waLink = (serviceName) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo, saya ingin bertanya tentang layanan ${serviceName}.`
  )}`;

const SERVICES = [
  {
    name: 'Kanopi',
    description:
      'Kanopi untuk carport, teras, atau halaman belakang. Kami ukur dulu lokasinya, lalu Anda pilih rangka dan atap yang cocok dengan anggaran.',
    image: '/images/project-8.webp',
    alt: 'Kanopi besi dengan atap tahan cuaca hasil pengerjaan bengkel',
    specs: [
      'Rangka: besi hollow / baja ringan',
      'Atap: spandek / alderon / polikarbonat / kaca',
      'Finishing: cat anti karat / duco',
      'Ukuran dibuat sesuai lokasi',
    ],
  },
  {
    name: 'Pagar & Gerbang',
    description:
      'Pagar dan gerbang besi untuk rumah atau usaha. Modelnya bebas: minimalis, klasik, gerbang dorong, atau lipat.',
    image: '/images/project-7.webp',
    alt: 'Pagar besi minimalis hasil pengerjaan bengkel',
    specs: [
      'Material: besi hollow / plat / galvanis',
      'Model: minimalis / klasik / kombinasi',
      'Opsi: gerbang dorong, lipat, atau ayun',
      'Finishing: cat duco / powder coating',
    ],
  },
  {
    name: 'Teralis',
    description:
      'Teralis jendela dan pintu supaya rumah lebih aman. Kami buat pas dengan ukuran kusen, polanya bisa disesuaikan dengan gaya rumah.',
    image: '/images/project-5.webp',
    alt: 'Teralis jendela besi dengan pola dekoratif',
    specs: [
      'Material: besi tempa / hollow / nako',
      'Pola: minimalis / dekoratif / klasik',
      'Dibuat presisi sesuai ukuran kusen',
      'Finishing: cat anti karat / duco',
    ],
  },
  {
    name: 'Railing',
    description:
      'Railing tangga dan balkon dari besi atau stainless. Bisa untuk dalam maupun luar rumah.',
    image: '/images/project-2.webp',
    alt: 'Railing tangga besi desain minimalis',
    specs: [
      'Material: besi hollow / stainless steel',
      'Untuk tangga, balkon, dan void',
      'Model minimalis atau kombinasi kayu',
      'Pemasangan interior & eksterior',
    ],
  },
  {
    name: 'Konstruksi Baja',
    description:
      'Rangka bangunan, mezzanine, gudang, sampai tower air. Strukturnya kami hitung dulu sebelum dikerjakan.',
    image: '/images/project-9.webp',
    alt: 'Konstruksi rangka baja untuk bangunan',
    specs: [
      'Rangka bangunan, mezzanine, gudang',
      'Tower air / toren dengan struktur kokoh',
      'Material: baja WF / CNP / siku / pipa',
      'Pengerjaan dan pemasangan di lokasi',
    ],
  },
  {
    name: 'Pintu Besi',
    description:
      'Pintu besi dan pintu lipat (harmonika) untuk rumah, ruko, atau gudang. Kuat, dan tampilannya tetap rapi.',
    image: '/images/project-4.webp',
    alt: 'Pintu besi kokoh untuk keamanan rumah',
    specs: [
      'Model: swing / lipat / dorong',
      'Material: plat besi / hollow / kombinasi',
      'Untuk rumah, ruko, dan gudang',
      'Finishing: cat duco / anti karat',
    ],
  },
  {
    name: 'Tangga Spiral',
    description:
      'Tangga spiral untuk lahan yang sempit. Dibuat mengikuti tinggi lantai dan lebar area yang tersedia.',
    image: '/images/project-10.webp',
    alt: 'Tangga spiral besi hemat ruang',
    specs: [
      'Hemat ruang, sesuai tinggi lantai',
      'Pijakan: plat bordes / kayu',
      'Railing menyatu, aman digunakan',
      'Untuk dalam maupun luar ruangan',
    ],
  },
  {
    name: 'Tower Air',
    description:
      'Penopang toren air untuk rumah atau usaha. Tingginya menyesuaikan tekanan air yang Anda butuhkan.',
    image: '/images/project-6.webp',
    alt: 'Tower penopang toren air dari rangka besi',
    specs: [
      'Ketinggian sesuai kebutuhan tekanan air',
      'Material: besi siku / UNP / pipa',
      'Kapasitas menyesuaikan ukuran toren',
      'Finishing cat anti karat',
    ],
  },
];

const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Layanan"
        description="Layanan bengkel las Wareng Jaya Teknik: kanopi, pagar, teralis, railing, pintu besi, tangga spiral, tower air, dan konstruksi baja."
        canonicalUrl="https://warengjayateknik.my.id/services"
        keywords={['pintu besi', 'pagar', 'teralis jendela', 'kanopi', 'konstruksi logam', 'tangga spiral', 'railing tangga', 'tower air']}
      />

      {/* Page header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Layanan
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Apa yang Kami Kerjakan
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Semua dikerjakan di bengkel kami sendiri di Tajurhalang. Kami yang
            ukur, kami yang buat, kami juga yang pasang.
          </p>
        </Container>
      </section>

      {/* Services zigzag rows */}
      <section className="bg-paper py-16 md:py-24">
        <Container className="space-y-16 md:space-y-24">
          {SERVICES.map((service, index) => (
            <Reveal
              as="article"
              key={service.name}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div
                  className="absolute -bottom-3 -right-3 h-full w-full border border-accent"
                  aria-hidden="true"
                ></div>
                <img
                  src={service.image}
                  alt={service.alt}
                  className="relative aspect-[4/3] w-full border border-line object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.svg';
                  }}
                />
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="font-mono text-sm font-medium text-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-ink md:text-3xl">
                  {service.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-l-2 border-accent pl-4 font-mono text-sm text-ink">
                  {service.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
                <Button
                  variant="whatsapp"
                  className="mt-8"
                  href={waLink(service.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={18} aria-hidden="true" />
                  Tanya {service.name}
                </Button>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Final CTA */}
      <div className="stripe" aria-hidden="true"></div>
      <section className="bg-ink py-16 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-paper md:text-4xl text-balance">
              Butuh yang Lain? Tanyakan Saja.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-paper/70">
              Di luar daftar ini pun bisa. Kirim saja foto atau sketsanya lewat
              WhatsApp, nanti kami hitung.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                variant="whatsapp"
                size="lg"
                href={`https://wa.me/${WA_NUMBER}`}
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

export default ServicesPage;
