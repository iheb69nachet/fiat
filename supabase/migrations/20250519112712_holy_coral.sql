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


