import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';

const LAST_UPDATED = '1 Agustus 2026';

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEO
        title="Kebijakan Privasi"
        description="Kebijakan privasi Wareng Jaya Teknik: data apa yang kami kumpulkan lewat situs ini, bagaimana kami memakainya, dan hak Anda atas data tersebut."
        canonicalUrl="/privacy"
        keywords={['kebijakan privasi', 'privasi Wareng Jaya Teknik', 'perlindungan data']}
      />

      <Breadcrumbs currentPage="Kebijakan Privasi" />

      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Kebijakan Privasi
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Halaman ini menjelaskan data apa yang kami kumpulkan lewat situs
            warengjayateknik.my.id, untuk apa data itu dipakai, dan apa yang
            bisa Anda minta dari kami.
          </p>
          <p className="mt-4 font-mono text-xs text-ink-muted">
            Terakhir diperbarui: {LAST_UPDATED}
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container className="max-w-3xl">
          <SectionHeading index="01" label="Ringkas" title="Intinya" />
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            Situs ini tidak punya sistem pendaftaran akun, tidak menyimpan data
            Anda di server kami, dan tidak menjual data ke siapa pun. Formulir
            kontak di situs ini tidak mengirim data ke server kami, isinya
            langsung diteruskan ke aplikasi WhatsApp di perangkat Anda, dan Anda
            sendiri yang menekan tombol kirim.
          </p>

          <SectionHeading
            className="mt-16"
            index="02"
            label="Data"
            title="Data yang Kami Terima"
          />
          <div className="mt-6 space-y-6 text-base leading-relaxed text-ink-muted">
            <div>
              <p className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                Data yang Anda kirim sendiri
              </p>
              <p className="mt-2">
                Kalau Anda menghubungi kami lewat WhatsApp atau telepon, kami
                menerima nama, nomor telepon, dan keterangan proyek yang Anda
                sampaikan. Data ini kami pakai hanya untuk menyiapkan penawaran
                dan mengerjakan pesanan Anda. Riwayat percakapan WhatsApp
                tersimpan di aplikasi WhatsApp kami, tunduk pada kebijakan
                privasi WhatsApp.
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                Data kunjungan situs
              </p>
              <p className="mt-2">
                Kami memakai Google Analytics untuk melihat halaman mana yang
                banyak dibuka dan dari mana pengunjung datang. Yang kami lihat
                hanya statistik gabungan, bukan identitas per orang. Google
                menyimpan cookie di peramban Anda untuk keperluan ini dan dapat
                mencatat alamat IP serta jenis perangkat. Detailnya ada di{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:no-underline"
                >
                  kebijakan privasi Google
                </a>
                .
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
                Preferensi tampilan
              </p>
              <p className="mt-2">
                Pilihan mode terang/gelap Anda disimpan di penyimpanan lokal
                peramban Anda sendiri. Data itu tidak pernah dikirim ke kami.
              </p>
            </div>
          </div>

          <SectionHeading
            className="mt-16"
            index="03"
            label="Pihak Ketiga"
            title="Layanan Luar yang Kami Pakai"
          />
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            <li className="flex gap-3">
              <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true"></span>
              <span>
                <strong className="font-medium text-ink">Google Analytics</strong> —
                statistik kunjungan.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true"></span>
              <span>
                <strong className="font-medium text-ink">Google Maps</strong> —
                peta lokasi bengkel di halaman kontak.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true"></span>
              <span>
                <strong className="font-medium text-ink">WhatsApp</strong> —
                saluran komunikasi utama kami.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true"></span>
              <span>
                <strong className="font-medium text-ink">Vercel</strong> — penyedia
                hosting situs ini.
              </span>
            </li>
          </ul>

          <SectionHeading
            className="mt-16"
            index="04"
            label="Hak Anda"
            title="Yang Bisa Anda Minta"
          />
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            Anda berhak meminta kami menghapus data kontak dan riwayat
            percakapan Anda, atau memperbaiki data yang keliru. Cukup hubungi
            kami lewat nomor di halaman{' '}
            <Link to="/contact" className="text-accent underline hover:no-underline">
              Kontak
            </Link>
            . Untuk menolak Google Analytics, Anda bisa memakai{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:no-underline"
            >
              add-on penolakan Google Analytics
            </a>{' '}
            atau memblokir cookie lewat pengaturan peramban Anda.
          </p>

          <SectionHeading
            className="mt-16"
            index="05"
            label="Perubahan"
            title="Pembaruan Kebijakan"
          />
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            Kalau ada perubahan pada kebijakan ini, tanggal &ldquo;terakhir
            diperbarui&rdquo; di atas akan kami sesuaikan. Kebijakan versi
            terbaru selalu tersedia di halaman ini.
          </p>

          <div className="mt-16 border border-line bg-surface p-6">
            <p className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
              Ada pertanyaan soal data Anda?
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">
              Hubungi Wareng Jaya Teknik, Jl. Raya Kalisuren, Kp. Kandang
              Panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320.
              Telepon dan WhatsApp:{' '}
              <a
                href="tel:+6281398427309"
                className="text-accent underline hover:no-underline"
              >
                +62 813-9842-7309
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
