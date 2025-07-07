import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Kontak', path: '/contact' },
  ];

  const services = [
    'Instalasi & Perbaikan Pintu Logam',
    'Pagar & Gerbang',
    'Teralis Jendela',
    'Kanopi',
    'Konstruksi Logam'
  ];

  return (
    <footer className={`${theme === 'dark' 
      ? 'bg-gradient-to-b from-gray-900 to-black' 
      : 'bg-gradient-to-b from-blue-800 to-blue-900'} text-white`}>
      
      {/* Top wave decoration */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`w-full h-12 ${theme === 'dark' ? 'fill-gray-800' : 'fill-blue-700'}`}
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          ></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-700'}`}
              >
                <FaTools className="text-white" size={20} />
              </motion.div>
              <h3 className="text-xl font-bold">Wareng Jaya Teknik</h3>
            </div>
            <p className="text-sm opacity-80">
              Bengkel Las profesional untuk semua kebutuhan konstruksi Anda. Kami menyediakan layanan perawatan, 
              instalasi, dan perbaikan dengan kualitas tinggi.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-sm">
                <FaMapMarkerAlt className={theme === 'dark' ? 'text-gray-400' : 'text-blue-300'} />
                <span>Jl. Raya Kalisuren, Kp. Kandang Panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaPhone className={theme === 'dark' ? 'text-gray-400' : 'text-blue-300'} />
                <span>+62 813-9842-7309</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FaEnvelope className={theme === 'dark' ? 'text-gray-400' : 'text-blue-300'} />
                <span>info@warengjayateknik.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-opacity-30 pb-2 inline-block">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-sm hover:underline flex items-center space-x-1"
                  >
                    <span>›</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-opacity-30 pb-2 inline-block">
              Layanan Kami
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm flex items-center space-x-1"
                >
                  <span>›</span>
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-opacity-30 pb-2 inline-block">
              Berlangganan
            </h3>
            <p className="text-sm opacity-80">
              Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang layanan dan promosi.
            </p>
            <form className="mt-2 space-y-2">
              <input 
                type="email" 
                placeholder="Alamat Email Anda"
                className={`w-full px-3 py-2 rounded text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-blue-700 border-blue-600'
                } border focus:outline-none focus:ring-1 focus:ring-white`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-2 px-4 py-2 rounded text-sm w-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-blue-600 hover:bg-blue-500'
                } transition-colors duration-200`}
              >
                Berlangganan
              </motion.button>
            </form>
          </div>
        </div>
        
        {/* Social media links */}
        <div className="border-t border-opacity-20 pt-6 pb-4">
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-blue-700 hover:bg-blue-600'
                } transition-colors`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm opacity-80 pt-4">
          <p>&copy; {new Date().getFullYear()} Wareng Jaya Teknik. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;