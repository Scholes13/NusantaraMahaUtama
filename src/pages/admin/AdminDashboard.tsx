import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Settings, Users, Phone, LogOut, Home } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/admin/landing-page"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center">
              <Home className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Landing Page</h2>
                <p className="text-gray-600">Manage landing page content</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/about-us"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">About Us</h2>
                <p className="text-gray-600">Manage about us page content</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/contact-us"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center">
              <Phone className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p className="text-gray-600">Manage contact information</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}