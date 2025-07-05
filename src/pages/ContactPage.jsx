import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    { 
      question: "Area mana saja yang Anda layani?", 
      answer: "Kami menyediakan layanan teknik kami di seluruh wilayah Jabodetabek dan sekitarnya." 
    },
    { 
      question: "Seberapa cepat Anda dapat memberikan penawaran?", 
      answer: "Untuk proyek standar, kami biasanya memberikan penawaran dalam 24-48 jam. Proyek yang kompleks mungkin memerlukan waktu tambahan untuk penilaian." 
    },
    { 
      question: "Apakah Anda menawarkan layanan darurat?", 
      answer: "Ya, kami menawarkan layanan fabrikasi dan perbaikan darurat. Silakan hubungi kami melalui WhatsApp untuk hal-hal yang mendesak." 
    },
  ];

  return (
    <>
      <SEO 
        title="Hubungi Kami"
        description="Hubungi Wareng Jaya Teknik untuk penawaran, pertanyaan, atau untuk mendiskusikan kebutuhan proyek Anda. Kami tersedia melalui WhatsApp selama jam kerja."
        canonicalUrl="https://warengjayateknik.com/contact"
        keywords={['kontak Wareng Jaya Teknik', 'kontak layanan teknik', 'penawaran fabrikasi logam', 'kontak WhatsApp']}
      />
      <div className={`min-h-screen py-16 px-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="container mx-auto">
          <motion.h1 
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Hubungi Kami
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className="text-3xl font-bold mb-8 border-b pb-4">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <FaClock className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">Jam Kerja</p>
                    <p className="text-lg">Senin - Sabtu: 08:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                    <FaWhatsapp className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a href="https://wa.me/6281398427309" className="text-lg hover:underline transition">+62 8123 456 7890</a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-red-900' : 'bg-red-100'}`}>
                    <FaPhone className="text-red-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">Telepon</p>
                    <a href="tel:+6281234567890" className="text-lg hover:underline transition">+62 8123 456 7890</a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                    <FaEnvelope className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@warengjayateknik.com" className="text-lg hover:underline transition">info@warengjayateknik.com</a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                    <FaMapMarkerAlt className="text-yellow-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">Alamat Bengkel</p>
                    <p className="text-lg">Jl. Raya Wareng, Bogor, Jawa Barat</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a 
                  href="https://wa.me/6281398427309" 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 inline-flex items-center"
                >
                  <FaWhatsapp className="mr-3" size={24}/>
                  Chat dengan Kami di WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className="text-3xl font-bold mb-8 border-b pb-4">Kirim Pesan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium" htmlFor="name">Nama Anda</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium" htmlFor="email">Email Anda</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium" htmlFor="subject">Subjek</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange} 
                    required
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="Permintaan Proyek"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium" htmlFor="message">Pesan Anda</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                    placeholder="Ceritakan tentang proyek atau pertanyaan Anda..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg font-bold transition duration-300 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className={`mt-16 p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`border rounded-lg overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    className="flex items-center justify-between w-full p-5 text-left font-medium"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-2xl">{activeAccordion === index ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === index && (
                    <div className={`p-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Temukan Bengkel Kami</h2>
            <div className="w-full overflow-hidden rounded-xl shadow-lg h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d521.5542716748337!2d106.75164242480491!3d-6.475875875630104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c2975f778335%3A0x85306c23190a4568!2sBengkel%20Las%20Wareng%20Jaya%20Teknik!5e1!3m2!1sid!2sid!4v1751718533131!5m2!1sid!2sid" 
                className="w-full h-full"
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Bengkel Las Wareng Jaya Teknik"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;