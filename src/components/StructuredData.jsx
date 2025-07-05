import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Wareng Jaya Teknik",
    "image": "https://warengjayateknik.com/images/hero.png",
    "url": "https://warengjayateknik.com",
    "description": "Bengkel Las profesional yang menyediakan solusi berkualitas tinggi untuk semua kebutuhan konstruksi Anda.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Kalisuren No.Kp, kandang panjang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320",
      "addressLocality": "Kecamatan Tajur Halang",
      "addressRegion": "Jawa Barat",
      "postalCode": "16320",
      "addressCountry": "ID"
    },
    "telephone": "+6281234567890",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/warengjayteknik",
      "https://www.instagram.com/warengjayteknik"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
