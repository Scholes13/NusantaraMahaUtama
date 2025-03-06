import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import toast from 'react-hot-toast';

interface ContactUsContent {
  id: string;
  email: string;
  phone: string;
  address: string;
  mapUrl: string;
  images: string[];
  created_at?: string;
  updated_at?: string;
}

export function AdminContactUs() {
  const navigate = useNavigate();
  const [content, setContent] = useState<ContactUsContent>({
    id: '',
    email: '',
    phone: '',
    address: '',
    mapUrl: '',
    images: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      let { data, error } = await supabase
        .from('contact_us')
        .select('*')
        .single();

      if (error) throw error;
      
      if (data) {
        setContent(data);
      } else {
        // If no data exists, create default data
        const defaultContent = {
          id: '',
          email: 'director@yukti.co.id',
          phone: '0877-3971-4850',
          address: 'Jl. Suryodiningratan no.56, Pugeran 55141',
          mapUrl: '',
          images: []
        };
        
        const { data: newData, error: insertError } = await supabase
          .from('contact_us')
          .insert([defaultContent])
          .select()
          .single();
          
        if (insertError) throw insertError;
        if (newData) {
          setContent(newData);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Error fetching content');
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('contact_us')
        .upsert(content);

      if (error) throw error;
      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content');
    }
  };

  const handleImageUpload = (url: string) => {
    setContent({
      ...content,
      images: [...content.images, url]
    });
  };

  const removeImage = (index: number) => {
    const newImages = content.images.filter((_, i) => i !== index);
    setContent({
      ...content,
      images: newImages
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Edit Contact Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={content.email}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={content.address}
                onChange={(e) => setContent({ ...content, address: e.target.value })}
                rows={3}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps URL
              </label>
              <input
                type="url"
                value={content.mapUrl}
                onChange={(e) => setContent({ ...content, mapUrl: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gallery Images
                </label>
                <ImageUpload
                  onUpload={handleImageUpload}
                  className="w-40"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {content.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}