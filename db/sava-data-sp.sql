-- Save Data SP

CREATE OR REPLACE FUNCTION save_data(
  attendees_data jsonb,
  contributions_data jsonb[]
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  attendee_id INTEGER;
  contribution_record jsonb;
BEGIN

  -- Insert attendee data
  INSERT INTO Attendees (name, email, guests, contributions)
  VALUES (
    attendees_data->>'name',
    attendees_data->>'email',
    ARRAY(SELECT jsonb_array_elements_text(attendees_data->'guests')),
    ARRAY(SELECT jsonb_array_elements_text(attendees_data->'contributions'))
  )
  RETURNING id INTO attendee_id;

  -- For each contribution in contributions_data, update qty in Contributions table
  FOREACH contribution_record IN ARRAY contributions_data
  LOOP
    UPDATE Contributions 
    SET qty = (contribution_record->>'qty')::integer
    WHERE name = contribution_record->>'name';
  END LOOP;

  RETURN;
END;
$$;
