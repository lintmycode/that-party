-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Create the Categories table
drop table contributions;
drop table categories;
create table
  categories (
    id SERIAL primary key,
    name varchar(255) not null unique
  );

-- Create the Contributions table
create table
  contributions (
    id SERIAL primary key,
    category_id INTEGER REFERENCES Categories(id),
    name varchar(255) not null,
    qty integer not null
  );

-- Create the Attendees table
drop table attendees;
create table
  attendees (
    id SERIAL primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    guests text[], -- Array to store names of both children and adults added by the main attendee
    contributions text[] -- Array to store names of contributions chosen by the attendee
  );