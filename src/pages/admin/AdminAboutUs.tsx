import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import toast from 'react-hot-toast';

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface AboutUsContent {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string;
  team_members: TeamMember[];
  statistics: {
    projects: number;
    clients: number;
    awards: number;
  };
}

export function AdminAboutUs() {
  const navigate = useNavigate();
  const [content, setContent] = useState<AboutUsContent>({
    title: '',
    description: '',
    mission: '',
    vision: '',
    values: '',
    team_members: [],
    statistics: {
      projects: 0,
      clients: 0,
      awards: 0
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      let { data, error } = await supabase
        .from('about_us')
        .select('*')
        .limit(1);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setContent(data[0]);
      } else {
        // If no data exists, create default data
        const defaultContent = {
          title: 'Who We Are',
          description: 'Yukti Persada Nadi is a company working in travel and event management based in Jogja.',
          mission: 'We will serve you an ultimate travel experience which will be remembered',
          vision: 'Our excellent service is the reason why people choose us to support their event',
          values: 'Get yourself ready with the luxury yet humble service of ours',
          team_members: [],
          statistics: {
            projects: 0,
            clients: 0,
            awards: 0
          }
        };
        
        const { error: insertError } = await supabase
          .from('about_us')
          .insert([defaultContent]);
          
        if (insertError) throw insertError;
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Error fetching content');
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('about_us')
        .upsert(content);

      if (error) throw error;
      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content');
    }
  };

  const addTeamMember = () => {
    setContent({
      ...content,
      team_members: [
        ...content.team_members,
        {
          name: '',
          position: '',
          image: ''
        }
      ]
    });
  };

  const removeTeamMember = (index: number) => {
    const newTeamMembers = content.team_members.filter((_, i) => i !== index);
    setContent({
      ...content,
      team_members: newTeamMembers
    });
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const newTeamMembers = [...content.team_members];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value
    };
    setContent({
      ...content,
      team_members: newTeamMembers
    });
  };

  const handleImageUpload = (index: number, url: string) => {
    updateTeamMember(index, 'image', url);
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
          <h2 className="text-2xl font-semibold mb-6">Edit About Us Content</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows={4}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission
                </label>
                <textarea
                  value={content.mission}
                  onChange={(e) => setContent({ ...content, mission: e.target.value })}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision
                </label>
                <textarea
                  value={content.vision}
                  onChange={(e) => setContent({ ...content, vision: e.target.value })}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Values
                </label>
                <textarea
                  value={content.values}
                  onChange={(e) => setContent({ ...content, values: e.target.value })}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Team Members
                </label>
                <button
                  onClick={addTeamMember}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Member
                </button>
              </div>
              <div className="space-y-4">
                {content.team_members.map((member, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border rounded-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateTeamMember(index, 'position', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                      </label>
                      <div className="flex gap-2">
                        {member.image ? (
                          <div className="relative group">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                            <button
                              onClick={() => updateTeamMember(index, 'image', '')}
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <ImageUpload
                            onUpload={(url) => handleImageUpload(index, url)}
                            className="w-24"
                          />
                        )}
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects Completed
                </label>
                <input
                  type="number"
                  value={content.statistics.projects}
                  onChange={(e) => setContent({
                    ...content,
                    statistics: { ...content.statistics, projects: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Happy Clients
                </label>
                <input
                  type="number"
                  value={content.statistics.clients}
                  onChange={(e) => setContent({
                    ...content,
                    statistics: { ...content.statistics, clients: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Awards
                </label>
                <input
                  type="number"
                  value={content.statistics.awards}
                  onChange={(e) => setContent({
                    ...content,
                    statistics: { ...content.statistics, awards: parseInt(e.target.value) }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}