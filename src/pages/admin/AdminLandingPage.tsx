import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import toast from 'react-hot-toast';

interface LandingPageContent {
  id: string;
  hero_section: {
    title: string;
    subtitle: string;
    background_image: string;
    cta_text: string;
  };
  services_section: {
    title: string;
    services: Array<{
      name: string;
      icon: string;
    }>;
  };
  gallery_section: {
    title: string;
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  cta_section: {
    title: string;
    button_text: string;
  };
  footer_section: {
    about_text: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  };
  created_at?: string;
  updated_at?: string;
}

export function AdminLandingPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<LandingPageContent>({
    id: '',
    hero_section: {
      title: '',
      subtitle: '',
      background_image: '',
      cta_text: ''
    },
    services_section: {
      title: '',
      services: []
    },
    gallery_section: {
      title: '',
      images: []
    },
    cta_section: {
      title: '',
      button_text: ''
    },
    footer_section: {
      about_text: '',
      contact: {
        email: '',
        phone: '',
        address: ''
      }
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_page')
        .select('*')
        .single();

      if (error) throw error;
      if (data) setContent(data);
    } catch (error) {
      toast.error('Error fetching content');
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('landing_page')
        .upsert(content);

      if (error) throw error;
      toast.success('Content saved successfully');
    } catch (error) {
      toast.error('Error saving content');
    }
  };

  const handleHeroImageUpload = (url: string) => {
    setContent({
      ...content,
      hero_section: {
        ...content.hero_section,
        background_image: url
      }
    });
  };

  const handleGalleryImageUpload = (url: string) => {
    setContent({
      ...content,
      gallery_section: {
        ...content.gallery_section,
        images: [...content.gallery_section.images, { url, alt: '' }]
      }
    });
  };

  const removeGalleryImage = (index: number) => {
    const newImages = content.gallery_section.images.filter((_, i) => i !== index);
    setContent({
      ...content,
      gallery_section: {
        ...content.gallery_section,
        images: newImages
      }
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
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.hero_section.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero_section: { ...content.hero_section, title: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={content.hero_section.subtitle}
                  onChange={(e) => setContent({
                    ...content,
                    hero_section: { ...content.hero_section, subtitle: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image
                </label>
                <div className="space-y-4">
                  {content.hero_section.background_image && (
                    <div className="relative group">
                      <img
                        src={content.hero_section.background_image}
                        alt="Hero Background"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        onClick={() => setContent({
                          ...content,
                          hero_section: { ...content.hero_section, background_image: '' }
                        })}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {!content.hero_section.background_image && (
                    <ImageUpload
                      onUpload={handleHeroImageUpload}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={content.hero_section.cta_text}
                  onChange={(e) => setContent({
                    ...content,
                    hero_section: { ...content.hero_section, cta_text: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Services Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.services_section.title}
                  onChange={(e) => setContent({
                    ...content,
                    services_section: { ...content.services_section, title: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                {content.services_section.services.map((service, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => {
                        const newServices = [...content.services_section.services];
                        newServices[index] = { ...service, name: e.target.value };
                        setContent({
                          ...content,
                          services_section: { ...content.services_section, services: newServices }
                        });
                      }}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="Service name"
                    />
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => {
                        const newServices = [...content.services_section.services];
                        newServices[index] = { ...service, icon: e.target.value };
                        setContent({
                          ...content,
                          services_section: { ...content.services_section, services: newServices }
                        });
                      }}
                      className="w-32 p-2 border rounded-md"
                      placeholder="Icon name"
                    />
                    <button
                      onClick={() => {
                        const newServices = content.services_section.services.filter((_, i) => i !== index);
                        setContent({
                          ...content,
                          services_section: { ...content.services_section, services: newServices }
                        });
                      }}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newServices = [...content.services_section.services, { name: '', icon: '' }];
                    setContent({
                      ...content,
                      services_section: { ...content.services_section, services: newServices }
                    });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Service
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Gallery Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.gallery_section.title}
                  onChange={(e) => setContent({
                    ...content,
                    gallery_section: { ...content.gallery_section, title: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {content.gallery_section.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => {
                            const newImages = [...content.gallery_section.images];
                            newImages[index] = { ...image, alt: e.target.value };
                            setContent({
                              ...content,
                              gallery_section: { ...content.gallery_section, images: newImages }
                            });
                          }}
                          className="px-2 py-1 bg-white rounded text-sm"
                          placeholder="Alt text"
                        />
                        <button
                          onClick={() => removeGalleryImage(index)}
                          className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <ImageUpload
                    onUpload={handleGalleryImageUpload}
                    className="h-48"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">CTA Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.cta_section.title}
                  onChange={(e) => setContent({
                    ...content,
                    cta_section: { ...content.cta_section, title: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content.cta_section.button_text}
                  onChange={(e) => setContent({
                    ...content,
                    cta_section: { ...content.cta_section, button_text: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Footer Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Text
                </label>
                <textarea
                  value={content.footer_section.about_text}
                  onChange={(e) => setContent({
                    ...content,
                    footer_section: { ...content.footer_section, about_text: e.target.value }
                  })}
                  rows={4}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information
                </label>
                <div className="space-y-4">
                  <input
                    type="email"
                    value={content.footer_section.contact.email}
                    onChange={(e) => setContent({
                      ...content,
                      footer_section: {
                        ...content.footer_section,
                        contact: { ...content.footer_section.contact, email: e.target.value }
                      }
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={content.footer_section.contact.phone}
                    onChange={(e) => setContent({
                      ...content,
                      footer_section: {
                        ...content.footer_section,
                        contact: { ...content.footer_section.contact, phone: e.target.value }
                      }
                    })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Phone"
                  />
                  <textarea
                    value={content.footer_section.contact.address}
                    onChange={(e) => setContent({
                      ...content,
                      footer_section: {
                        ...content.footer_section,
                        contact: { ...content.footer_section.contact, address: e.target.value }
                      }
                    })}
                    rows={2}
                    className="w-full p-2 border rounded-md"
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}