import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaClock } from 'react-icons/fa';

const NAV_LINKS = [
  { name: 'Beranda', path: '/' },
  { name: 'Tentang Kami', path: '/about' },
  { name: 'Layanan', path: '/services' },
  { name: 'Galeri', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Kontak', path: '/contact' },
];

const SERVICE_AREAS = [
  'Tajurhalang',
  'Bojonggede',
  'Citayam',
  'Cibinong',
  'Depok',
  'Bogor & sekitarnya',
];

const Footer = () => {
  return (
    <footer className="bg-ink text-paper">
      <div className="stripe" aria-hidden="true"></div>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <p className="font-display text-4xl font-bold uppercase leading-none tracking-tight md:text-6xl text-balance">
          Wareng Jaya Teknik
        </p>
        <p className="mt-3 max-w-xl text-sm text-paper/70">
          Bengkel las di Tajurhalang, Bogor. Melayani pembuatan kanopi, pagar,
          teralis, railing, pintu besi, dan konstruksi baja.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
              Kontak
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  Jl. Raya Kalisuren, Kp. Kandang Panjang, Kec. Tajur Halang,
                  Kabupaten Bogor, Jawa Barat 16320
                </span>
              </li>
              <li>
                <a
                  href="tel:+6281398427309"
                  className="flex min-h-11 items-center gap-3 hover:text-accent"
                >
                  <FaPhone className="shrink-0 text-accent" aria-hidden="true" />
                  +62 813-9842-7309
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281398427309"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 hover:text-accent"
                >
                  <FaWhatsapp className="shrink-0 text-accent" aria-hidden="true" />
                  Chat via WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="shrink-0 text-accent" aria-hidden="true" />
                <span>Setiap hari: 08.00 – 17.00</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
              Navigasi
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex min-h-11 items-center hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
              Area Layanan
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-accent" aria-hidden="true"></span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-paper/15 pt-6 font-mono text-xs text-paper/60">
          © {new Date().getFullYear()} Wareng Jaya Teknik — Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
