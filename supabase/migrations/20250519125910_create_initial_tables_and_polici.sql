CREATE POLICY "Allow everyone add booking"
  ON test_drive_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);