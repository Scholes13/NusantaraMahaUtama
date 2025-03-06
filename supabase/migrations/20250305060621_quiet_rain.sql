/*
  # Create admin content tables

  1. New Tables
    - `about_us`
      - Content for the About Us page
      - Includes title, description, mission, vision, values, and statistics
    - `contact_us`
      - Contact information and gallery images
      - Includes email, phone, address, map URL, and image gallery

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
*/

-- About Us Table
CREATE TABLE IF NOT EXISTS about_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  mission text NOT NULL,
  vision text NOT NULL,
  values text NOT NULL,
  team_members jsonb DEFAULT '[]'::jsonb,
  statistics jsonb DEFAULT '{"projects": 0, "clients": 0, "awards": 0}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage about_us content"
  ON about_us
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact Us Table
CREATE TABLE IF NOT EXISTS contact_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  map_url text,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_us ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to manage contact_us content"
  ON contact_us
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);