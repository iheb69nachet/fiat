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
  make text NOT NULL,
  model text NOT NULL,
  trim text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  msrp numeric,
  engine text NOT NULL,
  transmission text NOT NULL,
  mpg text NOT NULL,
  image text NOT NULL,
  images text[] NOT NULL,
  description text NOT NULL,
  featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  features jsonb NOT NULL,
  specifications jsonb NOT NULL,
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
  car_id uuid REFERENCES cars(id) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  comments text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE test_drive_bookings ENABLE ROW LEVEL SECURITY;

-- Service bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_details jsonb NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  services uuid[] NOT NULL,
  status text DEFAULT 'pending',
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cars
CREATE POLICY "Anyone can view cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify cars"
  ON cars
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for services
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for test drive bookings
CREATE POLICY "Anyone can create test drive bookings"
  ON test_drive_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view and modify test drive bookings"
  ON test_drive_bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for service bookings
CREATE POLICY "Anyone can create service bookings"
  ON service_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view and modify service bookings"
  ON service_bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );