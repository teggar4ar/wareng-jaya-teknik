import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { FaTools, FaDoorOpen, FaWrench, FaHardHat, FaIndustry, FaShieldAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  // Add a pulse animation for the WhatsApp icon
  const pulseAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 1.5, repeat: Infinity }
  };
  
  return (
    <>
      <SEO 
        title="Beranda"
        description="Wareng Jaya Teknik - Mitra terpercaya Anda dalam fabrikasi logam. Kami menyediakan solusi teknik berkualitas tinggi untuk semua kebutuhan teknis Anda."
        canonicalUrl="https://warengjayteknik.com/"
        keywords={['fabrikasi logam', 'solusi teknik', 'jasa pengelasan', 'layanan teknis', 'Wareng Jaya Teknik']}
      />
      <div className={isDark ? 'text-white' : 'text-gray-900'}>
        {/* Hero Section - Enhanced version */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden -mt-16 md:-mt-20">
          {/* Background Image with improved effect */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              <img 
                src="/images/hero.png" 
                alt="Fabrikasi logam pengelasan dengan percikan api" 
                className="w-full h-full object-cover"
                loading="eager"
                width="1920"
                height="1080"
                onError={(e) => {e.target.onerror = null; e.target.src = '/images/fallback-hero.jpg'}}
              />
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/70 to-black/50' : 'bg-gradient-to-b from-black/50 to-black/40'}`}></div>
            </motion.div>
          </div>
          
          {/* Hero Content - Simplified and enhanced */}
          <div className="relative z-10 container mx-auto px-6 md:px-12 grid md:grid-cols-5 gap-12 items-center">
            <motion.div 
              className="md:col-span-3 text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
                variants={fadeInUp}
              >
                <span className="block drop-shadow-lg">Keunggulan Teknik</span> 
                <span className="block drop-shadow-lg">dalam Pengerjaan Logam</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mt-8 text-gray-100 font-medium max-w-xl mx-auto md:mx-0"
                variants={fadeInUp}
              >
                Keahlian presisi dan solusi inovatif untuk semua kebutuhan fabrikasi logam Anda sejak 2005.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
                variants={fadeInUp}
              >
                <a 
                  href="https://wa.me/6281398427309" 
                  className="group relative inline-flex items-center justify-center rounded-lg bg-green-600 px-8 py-3.5 font-bold text-lg shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 hover:scale-105 text-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.div 
                    animate={pulseAnimation} 
                    className="mr-2 group-hover:rotate-12 transition-transform duration-300 relative z-10"
                  >
                    <FaWhatsapp size={20}/>
                  </motion.div>
                  <span className="relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-in-out group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
                    Hubungi Kami Sekarang
                  </span>
                </a>
                
                <Link 
                  to="/services"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-white p-0.5 font-bold text-lg transition-all duration-300 ease-out hover:border-opacity-80"
                >
                  <span className="relative flex items-center justify-center rounded-md px-8 py-3.5 transition-all duration-300 ease-out text-white group-hover:bg-white group-hover:text-gray-900">
                    Jelajahi Layanan
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Why Choose Us section */}
            <motion.div 
              className="md:col-span-2 hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20 mt-18">
                <div className="p-2">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6">
                    <h3 className="text-2xl font-bold mb-2">Mengapa Memilih Kami?</h3>
                    <p className="text-blue-100 mb-6">Kami menyediakan layanan terbaik dengan:</p>
                    
                    <div className="space-y-4">
                      {[
                        { text: "Pengalaman 15+ Tahun", icon: "⏱️" },
                        { text: "Profesional Bersertifikat", icon: "🏆" },
                        { text: "Material Berkualitas", icon: "✓" },
                        { text: "Pengiriman Proyek Tepat Waktu", icon: "📅" },
                        { text: "Harga Bersaing", icon: "💰" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center bg-white/10 p-3 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-600 mr-3 text-sm">
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white text-sm mb-2 opacity-80">Scroll</span>
              <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-white mt-2"
                  animate={{ y: [0, 24, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Tentang Wareng Jaya Teknik</h2>
              <p className="text-lg">
                Sejak 2005, Wareng Jaya Teknik telah menyediakan solusi fabrikasi logam berkualitas tinggi untuk klien 
                residensial dan komersial di seluruh Indonesia. Dengan tim pengrajin terampil dan peralatan modern kami, 
                kami memberikan hasil luar biasa yang tahan uji waktu.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { title: "Proyek", value: "500+", description: "Selesai" },
                { title: "Pengalaman", value: "15+", description: "Tahun" },
                { title: "Klien", value: "350+", description: "Puas" },
                { title: "Tim", value: "25+", description: "Ahli" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="text-5xl font-bold mb-2 text-blue-600">{stat.value}</p>
                  <p className="text-xl font-semibold">{stat.title}</p>
                  <p className="text-gray-500">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">Layanan Kami</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600">
                Kami menawarkan berbagai layanan fabrikasi logam yang disesuaikan untuk memenuhi kebutuhan spesifik Anda.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FaDoorOpen size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Pintu Logam", 
                  description: "Pintu keamanan dengan berbagai gaya dan finishing yang dirancang khusus untuk cocok dengan estetika properti Anda." 
                },
                { 
                  icon: <FaShieldAlt size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Pagar & Gerbang", 
                  description: "Solusi pagar yang tahan lama dan elegan yang memberikan keamanan sambil meningkatkan penampilan properti Anda." 
                },
                { 
                  icon: <FaIndustry size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Kanopi", 
                  description: "Kanopi tahan cuaca yang memberikan tempat berlindung dan menambah daya tarik arsitektur pada bangunan Anda." 
                },
                { 
                  icon: <FaWrench size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Struktur Baja", 
                  description: "Struktur baja khusus untuk aplikasi perumahan, komersial, dan industri." 
                },
                { 
                  icon: <FaTools size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Perbaikan Logam", 
                  description: "Layanan perbaikan ahli untuk memperbaiki komponen logam yang rusak dan memperpanjang umur pakainya." 
                },
                { 
                  icon: <FaHardHat size={48} className="text-blue-500 mb-4 mx-auto" />,
                  title: "Proyek Khusus", 
                  description: "Solusi fabrikasi logam yang dibuat khusus sesuai dengan spesifikasi dan kebutuhan unik Anda." 
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className={`p-8 rounded-lg shadow-lg text-center ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {service.icon}
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>{service.description}</p>
                  <Link 
                    to="/services" 
                    className="inline-block mt-4 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Pelajari lebih lanjut →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Work */}
        <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">Proyek Unggulan</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600">
                Lihat beberapa karya terbaru kami yang menunjukkan kualitas pengerjaan dan perhatian terhadap detail.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item, index) => (
                <motion.div 
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg group relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={`/images/project-${item}.jpg`} 
                    alt={`Proyek ${item}`} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {e.target.onerror = null; e.target.src = '/images/placeholder.svg'}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold">Judul Proyek {item}</h3>
                    <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Fabrikasi logam khusus untuk properti perumahan</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/gallery" 
                className={`inline-block px-8 py-4 rounded-md font-bold ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } transition duration-300`}
              >
                Lihat Semua Proyek
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">Apa Kata Klien Kami</h2>
              <p className="text-lg max-w-3xl mx-auto text-gray-600">
                Jangan hanya percaya kata-kata kami. Inilah yang dikatakan klien puas kami tentang pekerjaan kami.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Budi Santoso",
                  position: "Pemilik Rumah",
                  quote: "Wareng Jaya Teknik memasang pintu keamanan dan teralis jendela khusus untuk rumah saya. Kualitas pekerjaan sangat luar biasa, dan mereka menyelesaikan proyek lebih cepat dari jadwal.",
                  image: "/images/placeholder.svg"
                },
                {
                  name: "PT. Graha Mitra",
                  position: "Pengembang Properti",
                  quote: "Kami telah bekerja sama dengan Wareng Jaya Teknik dalam berbagai proyek perumahan. Perhatian mereka terhadap detail dan komitmen terhadap kualitas menjadikan mereka mitra terpercaya untuk fabrikasi logam.",
                  image: "/images/placeholder.svg"
                },
                {
                  name: "Ahmad Rizki",
                  position: "Pemilik Restoran",
                  quote: "Railing dan elemen dekoratif logam yang mereka buat untuk restoran kami telah menerima banyak pujian dari pelanggan. Layanan profesional dari awal hingga akhir.",
                  image: "/images/placeholder.svg"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {e.target.onerror = null; e.target.src = '/images/avatar-placeholder.jpg'}}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.position}</p>
                    </div>
                  </div>
                  <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.quote}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`py-16 ${isDark ? 'bg-blue-900' : 'bg-blue-600'} text-white`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div 
                className="mb-8 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-2">Siap Memulai Proyek Anda?</h2>
                <p className="text-xl">Hubungi kami hari ini untuk konsultasi dan penawaran gratis.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link 
                  to="/contact" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-md transition duration-300 text-center inline-block"
                >
                  Hubungi Kami
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;