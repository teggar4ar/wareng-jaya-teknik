import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const SUGGESTED_LINKS = [
  { path: '/', label: 'Beranda', description: 'Kembali ke halaman utama' },
  { path: '/services', label: 'Layanan', description: 'Kanopi, pagar, teralis, railing, dan konstruksi baja' },
  { path: '/gallery', label: 'Galeri Proyek', description: 'Foto hasil pengerjaan kami' },
  { path: '/blog', label: 'Blog', description: 'Artikel dan tips seputar pengerjaan logam' },
  { path: '/contact', label: 'Kontak', description: 'Tanya harga atau diskusi rencana proyek' },
];

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak ada atau sudah dipindahkan. Lihat daftar halaman utama Wareng Jaya Teknik di bawah."
        noindex
      />

      <section className="bg-paper py-16 md:py-24">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Alamat yang Anda buka tidak ada atau sudah dipindahkan. Coba salah
            satu halaman berikut.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SUGGESTED_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block rounded-card border border-line bg-surface p-4 transition-colors duration-150 hover:border-accent"
                >
                  <span className="block font-display text-lg font-semibold uppercase tracking-tight text-ink">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    {link.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/6281398427309"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Tanya via WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NotFoundPage;
