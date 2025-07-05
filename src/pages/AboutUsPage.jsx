import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaHardHat, FaUsers, FaRegLightbulb, FaAward, FaLinkedin, FaTwitter, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

// Custom counter hook for statistics
const useCounter = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      }
    };
    
    window.requestAnimationFrame(animateCount);
  }, [end, start, duration, isInView]);
  
  return [count, setIsInView];
};

const AboutUsPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  // Counter states
  const [projectCount, setProjectCountInView] = useCounter(250);
  const [clientCount, setClientCountInView] = useCounter(120);
  const [experienceCount, setExperienceCount] = useCounter(13);
  const [awardsCount, setAwardsCount] = useCounter(15);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'stats-section') {
              setProjectCountInView(true);
              setClientCountInView(true);
              setExperienceCount(true);
              setAwardsCount(true);
            }
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
        title="Tentang Kami"
        description="Pelajari tentang sejarah, misi, visi Wareng Jaya Teknik, dan tim berbakat di balik keunggulan teknik kami."
        canonicalUrl="https://warengjayteknik.com/about"
        keywords={['tentang Wareng Jaya Teknik', 'tim teknik', 'sejarah perusahaan', 'ahli fabrikasi logam']}
      />
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('/images/workshop-hero.jpg')", 
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
              Menempa Keunggulan dalam Pengerjaan Logam
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Sejak 2010, Wareng Jaya Teknik telah menghadirkan solusi pengerjaan logam presisi dan rekayasa teknik yang tahan uji waktu.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-10 mt-10">
          {/* Statistics Section */}
          <section id="stats-section" className="scroll-animate -mt-16 md:-mt-24 mb-20 opacity-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: <FaHardHat />, count: projectCount, label: "Proyek Selesai" },
                { icon: <FaUsers />, count: clientCount, label: "Klien Puas" },
                { icon: <FaRegLightbulb />, count: experienceCount, label: "Tahun Pengalaman" },
                { icon: <FaAward />, count: awardsCount, label: "Penghargaan Diterima" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 md:p-8 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  <div className={`text-3xl md:text-4xl mb-4 ${isDark ? 'text-blue-400' : 'text-blue-500'} flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{stat.count}+</div>
                  <div className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission and Vision */}
          <section className="scroll-animate grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 opacity-0">
            <div className="order-2 md:order-1">
              <div className={`p-6 md:p-8 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} shadow-lg`}>
                <h2 className={`text-4xl font-bold mb-6 inline-block relative after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mt-2`}>Misi Kami</h2>
                <p className="text-lg mb-6 leading-relaxed">
                  Menghadirkan solusi fabrikasi logam unggulan yang memadukan ketahanan dengan keunggulan estetika, memastikan setiap proyek mencerminkan komitmen kami terhadap kualitas dan kepuasan klien.
                </p>
                <h2 className={`text-4xl font-bold mb-6 mt-10 inline-block relative after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mt-2`}>Visi Kami</h2>
                <p className="text-lg leading-relaxed">
                  Menjadi bengkel logam paling terpercaya dan inovatif di wilayah ini, dikenal karena keahlian pengerjaan, keandalan, dan dedikasi kami dalam mendorong batas-batas desain.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <img 
                  src="/images/placeholder.svg" 
                  alt="Interior Bengkel" 
                  className="rounded-lg shadow-2xl w-full h-auto object-cover z-10 relative"
                />
                <div className={`absolute top-8 -right-8 bottom-8 -left-8 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'} -z-10`}></div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="scroll-animate mb-20 opacity-0">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>Nilai Inti Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <FaHardHat size={28} />, title: "Keunggulan", desc: "Kami berusaha mencapai kesempurnaan dalam setiap pengelasan, pemotongan, dan desain." },
                { icon: <FaUsers size={28} />, title: "Kolaborasi", desc: "Kami percaya pada kemitraan yang kuat dengan klien dan di dalam tim kami." },
                { icon: <FaRegLightbulb size={28} />, title: "Inovasi", desc: "Kami terus mengembangkan teknik dan merangkul teknologi baru." },
                { icon: <FaCheckCircle size={28} />, title: "Integritas", desc: "Kami menepati janji dan menjaga transparansi dalam semua yang kami lakukan." },
              ].map((value, index) => (
                <div 
                  key={index} 
                  className={`${isDark ? 'bg-gray-800 hover:bg-gray-800/80' : 'bg-white hover:bg-gray-50'} p-6 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 border-b-4 border-blue-500`}
                >
                  <div className={`${isDark ? 'text-blue-400' : 'text-blue-500'} mb-4`}>{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Company Timeline - Enhanced */}
          <section className="scroll-animate mb-20 opacity-0">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>Perjalanan Kami</h2>
            <div className={`relative border-l-4 ${isDark ? 'border-gray-600' : 'border-gray-300'} ml-4 md:ml-0 md:max-w-3xl md:mx-auto`}>
              {[
                { year: "2010", title: "Awal Mula", content: "Wareng Jaya Teknik didirikan dengan tim kecil, bengkel sederhana, dan impian besar untuk memberikan pengerjaan logam yang luar biasa." },
                { year: "2015", title: "Proyek Besar Pertama", content: "Menyelesaikan proyek fabrikasi industri skala besar pertama kami, membangun reputasi untuk kualitas dan kehandalan." },
                { year: "2018", title: "Pencapaian Sertifikasi", content: "Memperoleh sertifikasi ISO 9001, meresmikan komitmen kami terhadap sistem manajemen kualitas." },
                { year: "2020", title: "Perluasan Bengkel", content: "Memperluas fasilitas kami menjadi 2.500 meter persegi, menggabungkan teknologi baru dan meningkatkan kapasitas produksi." },
                { year: "2023", title: "Peningkatan Teknologi", content: "Berinvestasi dalam mesin CNC canggih dan perangkat lunak pemodelan 3D untuk meningkatkan presisi dan kemampuan desain." }
              ].map((milestone, index) => (
                <div className="mb-12 ml-8 group" key={index}>
                  <div className={`absolute -left-[18px] flex items-center justify-center w-9 h-9 bg-blue-500 rounded-full group-hover:scale-110 transition-all duration-300 ${index % 2 === 0 ? 'animate-pulse' : ''}`}>
                    <span className="text-xs font-bold text-white">{milestone.year}</span>
                  </div>
                  <div className={`p-6 rounded-lg transition-all duration-300 transform group-hover:-translate-y-1 ${isDark ? 'bg-gray-800/70 shadow-gray-800/30' : 'bg-white shadow-lg'}`}>
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{milestone.title}</h3>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{milestone.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Meet the Team - Enhanced */}
          <section className="scroll-animate opacity-0">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>Kenali Tim Inti Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Ahmad Sanjaya", 
                  role: "Pendiri & Kepala Fabrikasi",
                  image: "/images/placeholder.svg",
                  bio: "Dengan pengalaman lebih dari 20 tahun dalam fabrikasi logam, Ahmad memimpin tim kami dengan presisi dan semangat.",
                  social: { linkedin: "#", twitter: "#" }
                },
                { 
                  name: "Dewi Pratama", 
                  role: "Manajer Proyek",
                  image: "/images/placeholder.svg",
                  bio: "Dewi memastikan setiap proyek berjalan lancar dari konsep hingga pengiriman dengan perhatian detail yang tajam.",
                  social: { linkedin: "#", twitter: "#" }
                },
                { 
                  name: "Budi Wibowo", 
                  role: "Kepala Desainer",
                  image: "/images/placeholder.svg",
                  bio: "Budi menerjemahkan visi klien menjadi desain yang menakjubkan dan fungsional menggunakan teknologi pemodelan 3D terbaru.",
                  social: { linkedin: "#", twitter: "#" }
                }
              ].map((member, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  <div className="overflow-hidden h-64">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className={`p-6 border-t-4 ${isDark ? 'border-blue-500' : 'border-blue-500'}`}>
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className={`${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>{member.role}</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors">
                        <FaLinkedin size={20} />
                      </a>
                      <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <FaTwitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="scroll-animate mb-20 opacity-0 mt-20">
            <h2 className={`text-4xl font-bold text-center mb-12 inline-block relative after:content-[''] after:block after:w-24 after:h-1 after:bg-blue-500 after:mt-2 after:mx-auto`}>Testimoni Klien</h2>
            <div className={`p-8 md:p-12 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} relative`}>
              <div className="text-5xl opacity-20 absolute top-4 left-4">"</div>
              <div className="md:text-center">
                <p className="text-xl md:text-2xl italic mb-6 md:px-12">
                  "Wareng Jaya Teknik mengubah konsep kami menjadi kenyataan dengan keahlian pengerjaan yang luar biasa. Perhatian mereka terhadap detail dan komitmen terhadap kualitas melebihi harapan kami."
                </p>
                <div className="flex items-center justify-center">
                  <img src="/images/placeholder.svg" alt="Klien" className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <div>
                    <p className="font-bold">PT Industri Maju Bersama</p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Klien Manufaktur</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="scroll-animate mb-20 opacity-0">
            <div className={`p-8 md:p-12 rounded-xl text-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Mari berkolaborasi untuk mewujudkan visi Anda dengan pengerjaan logam presisi dan keunggulan teknik.
              </p>
              <button className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-blue-500 text-gray-900 hover:bg-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                Hubungi Kami Sekarang
              </button>
            </div>
          </section>
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

export default AboutUsPage;
