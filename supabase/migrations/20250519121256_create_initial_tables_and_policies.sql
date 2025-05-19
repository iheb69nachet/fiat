-- INSERT: WITH CHECK only
CREATE POLICY "Allow everyone to insert cars"
  ON cars
  FOR INSERT
  TO public
  WITH CHECK (true);

-- SELECT: USING only
CREATE POLICY "Allow everyone to select cars"
  ON cars
  FOR SELECT
  TO public
  USING (true);

-- UPDATE: USING and WITH CHECK
CREATE POLICY "Allow everyone to update cars"
  ON cars
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- DELETE: USING only

