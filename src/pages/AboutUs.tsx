import React from 'react';
import { Navigation } from '../components/Navigation';
import { Users, Target, Star, Award } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="min-h-screen">
      <Navigation alwaysShowBackground={true} />

      {/* Who We Are Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-serif mb-8">Who We Are</h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nusantara Maha Utama is a company working in travel and event management based in Surabaya. We will serve you an ultimate travel experience which will be remembered. Get yourself ready with the luxury yet humble service of ours.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nusantara Maha Utama Event Management focuses on the professionalism arrangement of Meeting, Conference, Exhibition, Conventions, and other activities which referred to meeting. Besides, our Nusantara Maha Utama Travel Management focuses on giving the best and memorable Incentive trip which can be both local and international.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our excellent service is the reason why people choose us to support their event.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Business Meeting"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
              <p className="text-gray-600">
                We will serve you an ultimate travel experience which will be remembered
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">Our Vision</h2>
              <p className="text-gray-600">
                Our excellent service is the reason why people choose us to support their event
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">Our Values</h2>
              <p className="text-gray-600">
                Get yourself ready with the luxury yet humble service of ours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-serif text-center mb-16">Find us</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.824330220901!2d112.694569484443!3d-7.330736962003107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fcbf7343e573%3A0xf5bff854fd07d1a2!2sGrand%20Harvest!5e0!3m2!1sen!2sid!4v1741245767386!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
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
                Nusantara Maha Utama - Your trusted partner in MICE and travel management services.
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