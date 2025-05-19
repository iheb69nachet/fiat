/*
  # Create tables for cars, services, and bookings

  1. New Tables
    - `cars` - Store car information
    - `services` - Store service types
    - `test_drive_bookings` - Store test drive requests
    - `service_bookings` - Store service appointments
    
  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text  NULL,
  model text  NULL,
  trim text  NULL,
  year integer  NULL,
  price numeric  NULL,
  msrp numeric,
  engine text  NULL,
  transmission text  NULL,
  mpg text  NULL,
  image text  NULL,
  images text[]  NULL,
  description text  NULL,
  featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  features jsonb  NULL,
  specifications jsonb  NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  estimated_time text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Test drive bookings table
CREATE TABLE IF NOT EXISTS test_drive_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id)  NULL,
  first_name text  NULL,
  last_name text  NULL,
  email text  NULL,
  phone text  NULL,
  date date  NULL,
  time text  NULL,
  location text  NULL,
  comments text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE test_drive_bookings ENABLE ROW LEVEL SECURITY;

-- Service bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_details jsonb  NULL,
  first_name text  NULL,
  last_name text  NULL,
  email text  NULL,
  phone text  NULL,
  date date  NULL,
  time text  NULL,
  location text  NULL,
  services uuid[]  NULL,
  status text DEFAULT 'pending',
  total_amount numeric  NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
