-- Save Data SP

CREATE OR REPLACE FUNCTION save_data(
  attendee_data jsonb,
  guests_data jsonb[],
  contributions_data jsonb[]
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  attendee_id INTEGER;
  guest_record jsonb;
  contribution_record jsonb;
BEGIN

  -- Insert attendee data
  INSERT INTO attendees (name, email, message)
  VALUES (
    attendee_data->>'name',
    attendee_data->>'email',
    attendee_data->>'message'
  )
  RETURNING id INTO attendee_id;

  -- Insert guest records
  FOREACH guest_record IN ARRAY guests_data
  LOOP
    INSERT INTO guests(name, isChild, attendee_id) 
    VALUES (
      guest_record->>'name', 
      (guest_record->>'isChild')::boolean, 
      attendee_id
    );
  END LOOP;
 
  -- Insert/Update attendee contributions
  FOREACH contribution_record IN ARRAY contributions_data
  LOOP
    -- Update the qty in the contributions table
    UPDATE contributions 
    SET qty = (contribution_record->>'qty')::integer
    WHERE id = (contribution_record->>'id')::integer;

    -- Link the attendee to their contribution
    INSERT INTO attendee_contributions(name, attendee_id, contribution_id) 
    VALUES (
      contribution_record->>'name', 
      attendee_id, 
      (contribution_record->>'id')::integer
    );
  END LOOP;

  RETURN;
END;
$$;
