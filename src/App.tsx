import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAboutUs } from './pages/admin/AdminAboutUs';
import { AdminContactUs } from './pages/admin/AdminContactUs';
import { AdminLandingPage } from './pages/admin/AdminLandingPage';
import { Navigation } from './components/Navigation';
import { Globe, Phone, Users, MapPin } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { ScrollGallery } from './components/ScrollGallery';
import { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect

function HomePage() {
  const galleryImages = [
    {
      url: "/Image-Gallery/AHA00542.JPG",
      alt: "Image AHA00542"
    },
    {
      url: "/Image-Gallery/DSC02404.jpg",
      alt: "Image DSC02404"
    },
    {
      url: "/Image-Gallery/IMG_1817.jpg",
      alt: "Image IMG_1817"
    },
    {
      url: "/Image-Gallery/Rapat KKKS Jan 2024-139.jpg",
      alt: "Image Rapat KKKS Jan 2024-139"
    },
    {
      url: "/Image-Gallery/YSF03201.jpg",
      alt: "Image YSF03201"
    }
  ];

  const heroRef = useRef<HTMLDivElement>(null); // Ref for the hero section
  const [heroHeight, setHeroHeight] = useState(0); // State for hero height

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Navigation heroHeight={heroHeight} /> {/* Pass heroHeight as prop */}

      {/* Hero Section */}
      <div id="home" className="relative h-screen" ref={heroRef}> {/* Add ref */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Header/Header Website.png')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl text-white mb-4">
              Nusantara Maha Utama
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              MICE & Travel Management
            </p>
            <button className="bg-[#1570b0] text-white px-6 py-2 text-xs rounded-md hover:bg-[#BE8400] transition duration-300">
              REQUEST OUR COMPANY PROFILE
            </button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">ABOUT US</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
              Our company is focused on delivering service to bring quality and client satisfaction in designing & organizing events with experienced professionals and unique concepts for both indoor & outbound activities. Our legal form is a limited liability company (Perseroan Terbatas/PT) under the name of PT. Nusantara Maha Utama, a company focused on MICE event organizing.
              </p>
              <p className="text-gray-600 leading-relaxed">
              We progress with innovation and a thirst to evolve over time. We study trends to stay ahead of them. We integrate creativity, experience, technology, and local values into our service to bring unique concepts to events.
              </p>
            </div>
            <div>
              <img
                src="/about-us/high-angle-shot-of-businesspeople-having-a-meeting-2023-11-27-05-03-17-utc.jpg"
                alt="Business Meeting"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-4 gap-12">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto text-[#1570b0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meeting</h3>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-[#1570b0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Conference</h3>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto text-[#1570b0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Incentive</h3>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto text-[#1570b0] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exhibition</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Our Work</h2>
          <ScrollGallery images={galleryImages} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#BE8400] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-8">Let's talk about your next project</h2>
          <button className="bg-white text-[#BE8400] px-6 py-2 text-sm rounded-md hover:bg-gray-100 transition duration-300">
            CONTACT US
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
              Our company is focused on delivering service to bring quality and client satisfaction in designing & organizing events with experienced professionals and unique concepts for both indoor & outbound activities. Our legal form is a limited liability company (Perseroan Terbatas/PT) under the name of PT. Nusantara Maha Utama, a company focused on MICE event organizing.
              </p>
              <p className="text-gray-400 mt-4">
              We progress with innovation and a thirst to evolve over time. We study trends to stay ahead of them. We integrate creativity, experience, technology, and local values into our service to bring unique concepts to events.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact us</h3>
              <div className="space-y-2">
                <p className="text-gray-400">Email: admin@nusantaramahautama.com</p>
                <p className="text-gray-400">Phone: 62 811-2700-9887</p>
                <p className="text-gray-400">Address: Ruko Grand Harvest Blok HO-22, Kecamatan Wiyung, Kelurahan Balas Klumprik, RW 1, RT 3, Kota Surabaya.</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Nusantara Maha Utama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/landing-page" element={<AdminLandingPage />} />
        <Route path="/admin/about-us" element={<AdminAboutUs />} />
        <Route path="/admin/contact-us" element={<AdminContactUs />} />
      </Routes>
    </>
  );
}

export default App;