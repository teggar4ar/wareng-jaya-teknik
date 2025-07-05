import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { FaDoorOpen, FaShieldAlt, FaWindowRestore, FaWarehouse, FaIndustry, 
  FaStepForward, FaRulerVertical, FaWater, FaTools, FaClock, FaAward, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const services = [
  { 
    name: 'Pintu Besi', 
    description: 'Pintu keamanan yang dirancang khusus sesuai spesifikasi Anda. Pintu besi kami menggabungkan kekuatan superior dengan tampilan estetis, tersedia dalam berbagai finishing dan desain untuk melengkapi properti Anda.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaDoorOpen size={32} />,
    features: ['Desain yang dapat disesuaikan', 'Pilihan keamanan tinggi', 'Tahan cuaca', 'Tersedia dalam berbagai finishing']
  },
  { 
    name: 'Pagar & Gerbang', 
    description: 'Lindungi dan tingkatkan properti Anda dengan solusi pagar khusus kami. Dari pagar dekoratif yang mewah hingga penghalang keamanan yang kuat, kami menciptakan batas yang tahan lama dan menarik.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaShieldAlt size={32} />,
    features: ['Ketinggian dan desain kustom', 'Fokus dekoratif atau keamanan', 'Perawatan anti-korosi', 'Opsi gerbang otomatis']
  },
  { 
    name: 'Teralis Jendela', 
    description: 'Amankan jendela Anda tanpa mengorbankan gaya. Teralis jendela kami menawarkan perlindungan sambil meningkatkan daya tarik estetika properti Anda dengan desain dekoratif atau minimalis.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaWindowRestore size={32} />,
    features: ['Dibuat khusus untuk jendela mana pun', 'Tersedia pola dekoratif', 'Opsi pelepasan cepat untuk keamanan', 'Finishing powder coating']
  },
  { 
    name: 'Kanopi', 
    description: 'Tambahkan tempat berlindung dan ketertarikan arsitektur dengan kanopi logam khusus kami. Dirancang untuk bertahan dari elemen sambil memberikan perlindungan dari matahari dan hujan.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaWarehouse size={32} />,
    features: ['Konstruksi tahan cuaca', 'Ukuran dan bentuk khusus', 'Pencahayaan terintegrasi opsional', 'Berbagai material atap']
  },
  { 
    name: 'Konstruksi Logam', 
    description: 'Dari dukungan struktural hingga elemen dekoratif, konstruksi logam khusus kami dirancang untuk ketahanan dan presisi. Kami bekerja dengan berbagai logam untuk menciptakan apa yang Anda butuhkan.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaIndustry size={32} />,
    features: ['Analisis struktural', 'Rekayasa khusus', 'Beberapa pilihan logam', 'Pemasangan di lokasi']
  },
  { 
    name: 'Tangga Spiral', 
    description: 'Hemat ruang dengan tangga spiral elegan kami. Dibuat khusus sesuai spesifikasi Anda, tangga spiral kami menggabungkan bentuk dan fungsi dengan keahlian pengerjaan yang luar biasa.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaStepForward size={32} />,
    features: ['Desain hemat ruang', 'Railing dan pijakan kustom', 'Opsi dalam atau luar ruangan', 'Berbagai pilihan finishing']
  },
  { 
    name: 'Railing Tangga', 
    description: 'Tingkatkan keamanan dan gaya dengan railing tangga khusus kami. Tersedia dalam berbagai desain dari minimalis modern hingga gaya tradisional yang mewah untuk cocok dengan preferensi estetika Anda.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaRulerVertical size={32} />,
    features: ['Opsi aman untuk anak-anak', 'Desain dekoratif atau minimalis', 'Varian dalam dan luar ruangan', 'Konstruksi sesuai kode']
  },
  { 
    name: 'Tower Air', 
    description: 'Solusi penyimpanan air yang tahan lama dan andal untuk properti residensial atau komersial. Tower air kami dirancang untuk umur panjang dengan bahan tahan korosi dan dukungan struktural yang tepat.', 
    imageUrl: '/images/placeholder.svg',
    icon: <FaWater size={32} />,
    features: ['Kustomisasi kapasitas', 'Perawatan anti-korosi', 'Opsi ditinggikan atau tingkat tanah', 'Titik akses pemeliharaan']
  },
];

const ServicesPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      <SEO 
        title="Layanan"
        description="Jelajahi rangkaian lengkap layanan pengerjaan logam kami termasuk pintu besi, pagar, teralis jendela, kanopi, dan banyak lagi."
        canonicalUrl="https://brave-beach-0ec172500.1.azurestaticapps.net/services"
        keywords={['pintu besi', 'pagar', 'teralis jendela', 'kanopi', 'konstruksi logam', 'tangga spiral', 'railing tangga', 'tower air']}
      />
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/services-hero.jpg')", 
                filter: isDark ? 'brightness(0.4)' : 'brightness(0.7)'
              }}
            ></div>
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-black/70 to-gray-900/70' : 'bg-gradient-to-r from-blue-500/30 to-gray-900/50'}`}></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Layanan Kami
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Solusi pengerjaan logam presisi yang dibuat dengan keahlian dan perhatian terhadap detail
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Service Introduction */}
          <div className="scroll-animate opacity-0 max-w-4xl mx-auto text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>
              Layanan Fabrikasi Logam Komprehensif
            </h2>
            <p className="text-lg">
              Di Wareng Jaya Teknik, kami mengkhususkan diri dalam mengubah logam menjadi solusi fungsional, tahan lama, dan estetis untuk aplikasi perumahan, komersial, dan industri. 
              Tim pengrajin terampil kami menggabungkan teknik tradisional dengan teknologi modern untuk memberikan hasil yang luar biasa.
            </p>
          </div>

          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
                variants={fadeInUp}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute top-0 right-0 p-3 ${isDark ? 'bg-blue-500/80' : 'bg-blue-600'} text-white rounded-bl-lg`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className={`mr-2 mt-1 text-blue-500`}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors ${isDark ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}>
                    Minta Penawaran
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Our Process Section */}
          <div className="scroll-animate opacity-0 mb-24">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>
              Proses Kami
            </h2>
            
            <div className={`relative py-8 px-4 md:px-12 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { 
                    title: "Konsultasi", 
                    description: "Kami mendiskusikan kebutuhan, anggaran, dan timeline untuk memahami kebutuhan proyek Anda secara penuh.", 
                    icon: <FaHandshake size={32} className={`${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  },
                  { 
                    title: "Desain & Perencanaan", 
                    description: "Tim kami membuat desain terperinci dan spesifikasi yang disesuaikan dengan kebutuhan proyek Anda.", 
                    icon: <FaTools size={32} className={`${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  },
                  { 
                    title: "Fabrikasi", 
                    description: "Kami membuat setiap komponen dengan presisi menggunakan material dan teknik berkualitas.", 
                    icon: <FaIndustry size={32} className={`${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  },
                  { 
                    title: "Pemasangan", 
                    description: "Tim terampil kami memasang logam khusus Anda dengan memperhatikan detail dan kualitas.", 
                    icon: <FaAward size={32} className={`${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  }
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-white'} border-4 ${isDark ? 'border-blue-500' : 'border-blue-500'} relative z-10`}>
                      {step.icon}
                    </div>
                    <div className={`text-center ${isDark ? 'bg-gray-700/50' : 'bg-white'} p-5 rounded-lg shadow-md`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="scroll-animate opacity-0 mb-24 max-w-5xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>
              Mengapa Memilih Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Kualitas Pengerjaan",
                  description: "Setiap proyek dilaksanakan dengan presisi dan perhatian terhadap detail oleh pekerja logam terampil kami.",
                  icon: <FaAward size={42} />
                },
                {
                  title: "Pengiriman Tepat Waktu",
                  description: "Kami menghargai waktu Anda dan berusaha menyelesaikan semua proyek dalam kerangka waktu yang disepakati.",
                  icon: <FaClock size={42} />
                },
                {
                  title: "Kustomisasi",
                  description: "Setiap bagian disesuaikan dengan kebutuhan spesifik Anda, memastikan kesesuaian yang sempurna untuk kebutuhan Anda.",
                  icon: <FaTools size={42} />
                }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full ${isDark ? 'text-blue-400 bg-blue-900/20' : 'text-blue-500 bg-blue-100'}`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="scroll-animate opacity-0">
            <div className={`p-8 md:p-12 rounded-xl text-center ${isDark ? 'bg-gradient-to-br from-blue-900/40 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Hubungi kami hari ini untuk mendiskusikan kebutuhan Anda dan dapatkan penawaran gratis. Kami siap mewujudkan visi Anda.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${isDark ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  Hubungi Kami
                </Link>
                <Link to="/gallery" className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'border-2 border-blue-600 hover:bg-blue-50 text-blue-600'}`}>
                  Lihat Proyek Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global CSS for animations */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default ServicesPage;