import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';

const WhatsAppButton = () => {
  const reduceMotion = useReducedMotion();
  const phoneNumber = '6281398427309';
  const message = 'Halo, saya tertarik dengan layanan dari Wareng Jaya Teknik. Bisa minta informasi lebih lanjut?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white transition-[filter] duration-150 hover:brightness-110 active:scale-[0.98] motion-reduce:active:scale-100"
      aria-label="Chat via WhatsApp"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </motion.a>
  );
};

export default WhatsAppButton;
