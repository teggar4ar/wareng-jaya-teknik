import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '6281398427309'; // Nomor telepon tanpa '+' atau '0' di depan
  const message = 'Halo, saya tertarik dengan layanan dari Wareng Jaya Teknik. Bisa minta informasi lebih lanjut?';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 ease-in-out duration-300 flex items-center justify-center"
      aria-label="Hubungi kami via WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
