/*
  # Create admin profiles table

  1. New Tables
    - `admin_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admin_profiles` table
    - Add policies for:
      - Authenticated admins can read all profiles
      - Authenticated admins can insert their own profile
      - Authenticated admins can update their own profile
*/

CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy to allow admins to read all profiles
CREATE POLICY "Admins can read all profiles"
  ON admin_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy to allow admins to insert their own profile
CREATE POLICY "Admins can insert own profile"
  ON admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy to allow admins to update their own profile
CREATE POLICY "Admins can update own profile"
  ON admin_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);