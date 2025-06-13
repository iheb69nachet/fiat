-- Drop the existing services array column
ALTER TABLE service_bookings
  DROP COLUMN services;

-- Rename total_amount to total_price for consistency
ALTER TABLE service_bookings
  RENAME COLUMN total_amount TO total_price;

-- Add new columns for car details
ALTER TABLE service_bookings
  ADD COLUMN car_make text NULL,
  ADD COLUMN car_model text NULL,
  ADD COLUMN car_year integer NULL,
  ADD COLUMN car_mileage text NULL,
  ADD COLUMN car_vin text NULL;

-- Drop the car_details jsonb column
ALTER TABLE service_bookings
  DROP COLUMN car_details;

-- Rename date to appointment_date for clarity
ALTER TABLE service_bookings
  RENAME COLUMN date TO appointment_date;

-- Rename time to appointment_time for clarity
ALTER TABLE service_bookings
  RENAME COLUMN time TO appointment_time;

-- Create junction table for service bookings and services
CREATE TABLE IF NOT EXISTS service_booking_services (
  booking_id uuid REFERENCES service_bookings(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (booking_id, service_id)
);

-- Enable RLS on the new junction table
ALTER TABLE service_booking_services ENABLE ROW LEVEL SECURITY;
