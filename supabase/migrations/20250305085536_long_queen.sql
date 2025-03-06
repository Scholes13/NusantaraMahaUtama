/*
  # Add default data for contact_us table

  1. Changes
    - Insert default content for contact_us table
*/

-- Insert default contact_us content if it doesn't exist
INSERT INTO contact_us (
  email,
  phone,
  address,
  map_url,
  images
) VALUES (
  'director@yukti.co.id',
  '0877-3971-4850',
  'Jl. Suryodiningratan no.56, Pugeran 55141',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.6854660963697!2d110.37567931477673!3d-7.824792494367683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a579bd3bdb517%3A0x6f1714b0c4e8ff01!2sJl.%20Suryodiningratan%20No.56%2C%20Suryodiningratan%2C%20Mantrijeron%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta%2055141!5e0!3m2!1sen!2sid!4v1624451234567!5m2!1sen!2sid',
  '[
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;