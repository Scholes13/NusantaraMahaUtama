import React from 'react';
import { Navigation } from '../components/Navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactUs() {
  return (
    <div className="min-h-screen">
      <Navigation heroHeight={300} />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">Contact</h1>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">admin@nusantaramhaautama.com</p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+62 811-2700-9887</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">Ruko Grand Harvest Blok HO-22, Kecamatan Wiyung, Kelurahan Balas Klumprik, RW 1, RT 3, Kota Surabaya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Send Us a Message!</h2>
          <div className="max-w-3xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="url"
                  placeholder="Your Website"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <textarea
                placeholder="Your message"
                rows={6}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <div className="text-right">
                <button className="bg-blue-600 text-white px-6 py-2 text-sm rounded-md hover:bg-blue-700 transition duration-300">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Our company is focused on delivering service to bring quality and client satisfaction in designing & organising event with experienced professionals with unique concept for both indoors & outbound activities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact us</h3>
              <p className="text-gray-400">Ruko Grand Harvest Blok HO-22, Kecamatan Wiyung, Kelurahan Balas Klumprik, RW 1, RT 3, Kota Surabaya.</p>
              <p className="text-gray-400">Phone: +62 811-2700-9887</p>
              <p className="text-gray-400">Email: admin@nusantaramahautama.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>© 2025 Nusantara Maha Utama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}