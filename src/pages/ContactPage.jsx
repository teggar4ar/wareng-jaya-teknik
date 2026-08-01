import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';

const WA_NUMBER = '6281398427309';

const FAQS = [
  {
    question: 'Area mana saja yang dilayani?',
    answer:
      'Tajurhalang, Bojonggede, Citayam, Cibinong, Depok, dan wilayah Bogor sekitarnya. Kalau lokasi Anda di luar itu, tanyakan dulu lewat WhatsApp — biasanya masih bisa diatur.',
  },
  {
    question: 'Berapa lama penawaran dikirim?',
    answer:
      'Untuk pekerjaan standar, biasanya 1-2 hari setelah survei, atau setelah kami terima ukuran dan foto lokasi.',
  },
  {
    question: 'Survei dan pengukuran bayar tidak?',
    answer:
      'Tidak, selama masih di area layanan kami. Anda baru bayar setelah penawaran disepakati.',
  },
];

const FIELDS = {
  name: 'Nama wajib diisi.',
  phone: 'Nomor telepon wajib diisi.',
  message: 'Pesan wajib diisi.',
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validateField = (name, value) =>
    value.trim() === '' ? FIELDS[name] : undefined;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(FIELDS).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const text = `Halo, saya ${formData.name.trim()} (${formData.phone.trim()}).\n\n${formData.message.trim()}`;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const inputClasses = (field) =>
    `w-full rounded-btn border bg-surface p-3 text-base text-ink placeholder:text-ink-muted/60 ${
      errors[field] ? 'border-accent' : 'border-line'
    }`;

  return (
    <>
      <SEO
        title="Hubungi Kami"
        description="Hubungi Wareng Jaya Teknik untuk tanya harga atau diskusi rencana proyek Anda. Kami bisa dihubungi lewat WhatsApp setiap hari, jam 08.00-17.00."
        canonicalUrl="https://warengjayateknik.my.id/contact"
        keywords={['kontak Wareng Jaya Teknik', 'kontak bengkel las', 'tanya harga las', 'kontak WhatsApp']}
      />

      <Breadcrumbs currentPage="Hubungi Kami" />

      {/* Page header */}
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <Container>
          <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
            Kontak
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl text-balance">
            Hubungi Kami
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
            Paling cepat lewat WhatsApp. Bisa juga lewat formulir di bawah,
            nanti kami balas. Kalau masih menimbang-nimbang, lihat dulu{' '}
            <Link
              to="/services"
              className="text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
            >
              daftar layanan
            </Link>{' '}
            atau{' '}
            <Link
              to="/gallery"
              className="text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
            >
              hasil kerja kami
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Contact channels */}
          <Reveal>
            <SectionHeading index="01" label="Kanal" title="Kontak Langsung" />
            <ul className="mt-8 divide-y divide-line border-y border-line">
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-4 py-4 hover:text-accent"
                >
                  <FaWhatsapp size={22} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-ink-muted">
                      WhatsApp — respon tercepat
                    </span>
                    <span className="mt-1 block text-base font-medium text-ink">
                      +62 813-9842-7309
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281398427309"
                  className="flex min-h-11 items-center gap-4 py-4 hover:text-accent"
                >
                  <FaPhone size={20} className="shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-ink-muted">
                      Telepon
                    </span>
                    <span className="mt-1 block text-base font-medium text-ink">
                      +62 813-9842-7309
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4 py-4">
                <FaMapMarkerAlt size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-mono text-xs uppercase tracking-widest text-ink-muted">
                    Alamat Bengkel
                  </span>
                  <span className="mt-1 block text-base text-ink">
                    Jl. Raya Kalisuren, Kp. Kandang Panjang, Kec. Tajur Halang,
                    Kabupaten Bogor, Jawa Barat 16320
                  </span>
                  <a
                    href="https://maps.google.com/?q=Bengkel+Las+Wareng+Jaya+Teknik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-8 items-center font-mono text-sm font-medium uppercase tracking-wider text-accent hover:underline"
                  >
                    Buka di Google Maps →
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-4 py-4">
                <FaClock size={20} className="shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-mono text-xs uppercase tracking-widest text-ink-muted">
                    Jam Kerja
                  </span>
                  <span className="mt-1 block text-base text-ink">
                    Setiap hari: 08.00 – 17.00
                  </span>
                </span>
              </li>
            </ul>
            <Button
              variant="whatsapp"
              size="lg"
              className="mt-8"
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Chat via WhatsApp
            </Button>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <SectionHeading index="02" label="Formulir" title="Kirim Pesan" />
            <p className="mt-4 text-sm text-ink-muted">
              Isi formulir ini, lalu pesannya terbuka di WhatsApp Anda. Tinggal
              tekan kirim.
            </p>
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block font-mono text-sm font-medium uppercase tracking-wider text-ink" htmlFor="name">
                  Nama Anda
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClasses('name')}
                  placeholder="Nama lengkap"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 font-mono text-xs text-accent">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-mono text-sm font-medium uppercase tracking-wider text-ink" htmlFor="phone">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={inputClasses('phone')}
                  placeholder="08xx xxxx xxxx"
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-2 font-mono text-xs text-accent">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-mono text-sm font-medium uppercase tracking-wider text-ink" htmlFor="message">
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={inputClasses('message')}
                  placeholder="Mau buat apa? Tulis jenis pekerjaan, perkiraan ukuran, dan lokasinya..."
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-2 font-mono text-xs text-accent">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full">
                Kirim via WhatsApp
              </Button>

              <p aria-live="polite" className="font-mono text-sm text-ink-muted">
                {submitted &&
                  'Pesan Anda sudah disiapkan di WhatsApp. Kalau jendelanya tidak terbuka, hubungi kami langsung di +62 813-9842-7309.'}
              </p>
            </form>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-surface py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="03" label="FAQ" title="Yang Sering Ditanyakan" />
          </Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold uppercase tracking-tight text-ink hover:text-accent"
                    >
                      {faq.question}
                      <span className="font-mono text-xl text-accent" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    hidden={!isOpen}
                    className="pb-5"
                  >
                    <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading index="04" label="Lokasi" title="Lokasi Bengkel Kami" />
          </Reveal>
          <div className="mt-10 h-96 w-full overflow-hidden border border-line">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d521.5542716748337!2d106.75164242480491!3d-6.475875875630104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c2975f778335%3A0x85306c23190a4568!2sBengkel%20Las%20Wareng%20Jaya%20Teknik!5e1!3m2!1sid!2sid!4v1751718533131!5m2!1sid!2sid"
              className="h-full w-full"
              width="1152"
              height="384"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Bengkel Las Wareng Jaya Teknik"
            ></iframe>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
