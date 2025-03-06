/*
  # Add default data for about_us table

  1. Changes
    - Insert default content for about_us table
*/

-- Insert default about_us content if it doesn't exist
INSERT INTO about_us (
  title,
  description,
  mission,
  vision,
  values,
  team_members,
  statistics
) VALUES (
  'Who We Are',
  'Yukti Persada Nadi is a company working in travel and event management based in Jogja. We will serve you an ultimate travel experience which will be remembered. Get yourself ready with the luxury yet humble service of ours.',
  'We will serve you an ultimate travel experience which will be remembered',
  'Our excellent service is the reason why people choose us to support their event',
  'Get yourself ready with the luxury yet humble service of ours',
  '[
    {
      "name": "Team Member 1",
      "position": "Position",
      "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      "name": "Team Member 2",
      "position": "Position",
      "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      "name": "Team Member 3",
      "position": "Position",
      "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ]'::jsonb,
  '{
    "projects": 90,
    "clients": 120,
    "awards": 2
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;