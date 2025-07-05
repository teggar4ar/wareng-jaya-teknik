import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Sample project data - replace with actual data in production
const projects = [
  { 
    id: 1,
    title: 'Gerbang Keamanan Modern',
    description: 'Gerbang keamanan yang dirancang khusus untuk properti perumahan dengan estetika modern dan konstruksi tahan lama.',
    category: 'Gerbang',
    client: 'Perumahan Pribadi',
    location: 'Jakarta',
    completionDate: '2023',
    src: '/images/placeholder.svg', 
    width: 1200,
    height: 800
  },
  { 
    id: 2,
    title: 'Teralis Jendela Dekoratif',
    description: 'Teralis pelindung jendela ornamental yang meningkatkan keamanan sambil menambah nilai estetika pada fasad bangunan.',
    category: 'Teralis Jendela',
    client: 'Kantor Komersial',
    location: 'Bandung',
    completionDate: '2022',
    src: '/images/placeholder.svg',
    width: 800,
    height: 1200 
  },
  { 
    id: 3,
    title: 'Kanopi Industri',
    description: 'Kanopi skala besar untuk fasilitas industri yang memberikan perlindungan cuaca dengan konstruksi logam yang tahan lama.',
    category: 'Kanopi',
    client: 'PT Manufacturing',
    location: 'Surabaya',
    completionDate: '2023',
    src: '/images/placeholder.svg',
    width: 1200,
    height: 800
  },
  { 
    id: 4,
    title: 'Tangga Spiral Khusus',
    description: 'Tangga spiral hemat ruang dengan railing khusus yang dirancang untuk rumah urban yang kompak.',
    category: 'Tangga',
    client: 'Apartemen Urban',
    location: 'Jakarta',
    completionDate: '2022',
    src: '/images/placeholder.svg',
    width: 800,
    height: 1200
  },
  { 
    id: 5,
    title: 'Pagar Taman Dekoratif',
    description: 'Pagar ornamental yang dirancang untuk meningkatkan estetika taman sambil memberikan keamanan dan pembatasan properti.',
    category: 'Pagar',
    client: 'Vila Mewah',
    location: 'Bali',
    completionDate: '2023',
    src: '/images/placeholder.svg',
    width: 1200,
    height: 800
  },
  { 
    id: 6,
    title: 'Sistem Pintu Keamanan',
    description: 'Pintu keamanan heavy-duty dengan mekanisme penguncian canggih untuk fasilitas komersial.',
    category: 'Pintu',
    client: 'Cabang Bank',
    location: 'Medan',
    completionDate: '2022',
    src: '/images/placeholder.svg',
    width: 800,
    height: 1200
  },
  { 
    id: 7,
    title: 'Railing Balkon Perumahan',
    description: 'Railing balkon khusus yang menggabungkan keamanan dengan desain elegan untuk rumah modern.',
    category: 'Railing',
    client: 'Perumahan Pribadi',
    location: 'Yogyakarta',
    completionDate: '2023',
    src: '/images/placeholder.svg',
    width: 1200,
    height: 800
  },
  { 
    id: 8,
    title: 'Struktur Tower Air',
    description: 'Solusi penyimpanan air yang ditinggikan dengan dukungan struktural yang kuat untuk komunitas pedesaan.',
    category: 'Struktur',
    client: 'Proyek Komunitas',
    location: 'Jawa Barat',
    completionDate: '2022',
    src: '/images/placeholder.svg',
    width: 800,
    height: 1200
  },
  { 
    id: 9,
    title: 'Partisi Logam Dekoratif',
    description: 'Layar partisi logam yang dirancang khusus menciptakan pemisahan visual sambil mempertahankan nuansa terbuka.',
    category: 'Interior',
    client: 'Restoran',
    location: 'Jakarta',
    completionDate: '2023',
    src: '/images/placeholder.svg',
    width: 1200,
    height: 800
  },
];

// Extract unique categories for filter
const allCategories = ['Semua', ...new Set(projects.map(project => project.category))];

const ProjectGalleryPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Filter projects based on selected category
  useEffect(() => {
    if (filterCategory === 'Semua') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filterCategory));
    }
  }, [filterCategory]);

  // Open lightbox with project index
  const openLightbox = (i) => {
    setIndex(i);
    setOpen(true);
  };
  
  // Format projects for lightbox
  const slides = filteredProjects.map(project => ({
    src: project.src,
    title: project.title,
    description: project.description,
    width: project.width,
    height: project.height
  }));

  return (
    <>
      <SEO 
        title="Galeri Proyek"
        description="Jelajahi galeri proyek yang telah selesai yang menampilkan keahlian kami dalam fabrikasi logam, pintu, pagar, dan pengerjaan logam khusus lainnya."
        canonicalUrl="https://brave-beach-0ec172500.1.azurestaticapps.net/gallery"
        keywords={['galeri proyek', 'portofolio pengerjaan logam', 'proyek yang telah selesai', 'contoh fabrikasi logam khusus']}
        ogType="article"
      />
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/gallery-hero.jpg')", 
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
              Galeri Proyek
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Menampilkan keahlian pengerjaan logam terbaik kami di berbagai proyek
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Gallery Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>
              Proyek Kami yang Telah Selesai
            </h2>
            <p className="text-lg">
              Jelajahi portofolio proyek yang telah kami selesaikan yang menampilkan keahlian kami dalam fabrikasi logam.
              Setiap proyek mencerminkan komitmen kami terhadap kualitas, presisi, dan kepuasan pelanggan.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filterCategory === category 
                    ? isDark 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-600 text-white' 
                    : isDark 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Project Grid */}
          <div className="mb-16">
            <AnimatePresence>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    className={`relative group overflow-hidden rounded-lg shadow-lg cursor-pointer ${
                      project.height > project.width ? 'row-span-2' : ''
                    }`}
                    onClick={() => openLightbox(i)}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={project.src} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay with project info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} text-white`}>
                          {project.category}
                        </span>
                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{project.client} • {project.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Tidak ada proyek yang ditemukan</h3>
              <p className="mb-6">Saat ini tidak ada proyek dalam kategori "{filterCategory}".</p>
              <button
                onClick={() => setFilterCategory('Semua')}
                className={`px-6 py-2 rounded-lg ${isDark ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
              >
                Lihat Semua Proyek
              </button>
            </div>
          )}
          
          {/* Enhanced Lightbox */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            index={index}
            plugins={[Captions, Zoom]}
            captions={{ showToggle: true, descriptionTextAlign: "center" }}
            styles={{
              container: { backgroundColor: isDark ? "rgba(0, 0, 0, .9)" : "rgba(0, 0, 0, .8)" },
              captionsTitle: { fontSize: "1.25rem", fontWeight: "bold" },
              captionsDescription: { fontSize: "1rem" },
            }}
          />
          
          {/* Call to Action */}
          <div className={`p-8 md:p-12 rounded-xl ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Siap Membuat Proyek Anda Sendiri?</h2>
              <p className="text-lg mb-8">
                Biarkan kami mengubah visi Anda menjadi kenyataan. Tim ahli kami siap membantu Anda dengan proyek fabrikasi logam berikutnya.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${isDark ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                  Minta Penawaran
                </Link>
                <Link to="/services" className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'border-2 border-blue-600 hover:bg-blue-50 text-blue-600'}`}>
                  Jelajahi Layanan Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectGalleryPage;