/*
  # Add landing page content management

  1. New Tables
    - `landing_page`
      - `id` (uuid, primary key)
      - `hero_section` (jsonb) - Hero section content
      - `services_section` (jsonb) - Services section content
      - `gallery_section` (jsonb) - Gallery section content
      - `cta_section` (jsonb) - CTA section content
      - `footer_section` (jsonb) - Footer section content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `landing_page` table
    - Add policy for authenticated users to manage content
    - Insert default admin user
*/

-- Landing Page Table
CREATE TABLE IF NOT EXISTS landing_page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_section jsonb DEFAULT '{
    "title": "Yukti Persada Nadi",
    "subtitle": "MICE & Travel Management",
    "background_image": "https://yukti.co.id/wp-content/uploads/2020/01/photo_2020-01-31_17-51-57.jpg",
    "cta_text": "REQUEST OUR COMPANY PROFILE"
  }'::jsonb,
  services_section jsonb DEFAULT '{
    "title": "Our Services",
    "services": [
      {"name": "Meeting", "icon": "Users"},
      {"name": "Conference", "icon": "MapPin"},
      {"name": "Incentive", "icon": "Globe"},
      {"name": "Exhibition", "icon": "Users"}
    ]
  }'::jsonb,
  gallery_section jsonb DEFAULT '{
    "title": "Our Work",
    "images": [
      {"url": "https://yukti.co.id/wp-content/uploads/2020/01/photo_2020-01-31_17-52-04.jpg", "alt": "Yukti Event 1"},
      {"url": "https://yukti.co.id/wp-content/uploads/2020/01/photo_2020-01-31_17-54-47.jpg", "alt": "Yukti Event 2"},
      {"url": "https://yukti.co.id/wp-content/uploads/2020/01/photo_2020-01-31_17-54-49.jpg", "alt": "Yukti Event 3"},
      {"url": "https://yukti.co.id/wp-content/uploads/2020/01/photo_2020-01-31_17-55-03.jpg", "alt": "Yukti Event 4"}
    ]
  }'::jsonb,
  cta_section jsonb DEFAULT '{
    "title": "Let''s talk about your next project",
    "button_text": "CONTACT US"
  }'::jsonb,
  footer_section jsonb DEFAULT '{
    "about_text": "Our company is focused on delivering service to bring quality and client satisfaction in designing & organising event with experienced professionals with unique concept for both indoors & outbound activities. Our legal form is a limited liability company (Perseroan Terbatas/ PT) under the name of PT. Yukti Persada Nadi, a company focused on MICE event organizer.",
    "contact": {
      "email": "director@yukti.co.id",
      "phone": "0877-3971-4850",
      "address": "Jl. Suryodiningratan no.56, Pugeran 55141"
    }
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_page ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated users to manage landing page content"
  ON landing_page
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default landing page content
INSERT INTO landing_page DEFAULT VALUES;

-- Create default admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'default@werkudara.com',
  crypt('werkudara88', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);