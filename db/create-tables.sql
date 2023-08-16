-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Create the Categories table
/*
drop table attendee_contributions; 
drop table contributions;
drop table categories;
drop table guests;
drop table attendees;
*/

create table
  categories (
    id SERIAL primary key,
    name varchar(255) not null unique
  );

-- Create the Contributions table
create table
  contributions (
    id SERIAL primary key,
    category_id integer references categories (id),
    name varchar(255) not null,
    qtyPer10Adults integer not null,
    qtyPer10Children integer not null
  );

-- Create the Attendees table
create table
  attendees (
    id SERIAL primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    message text
  );

-- Create the Guests table
create table
  guests (
    id SERIAL primary key,
    name varchar(255) not null,
    isChild boolean not null,
    attendee_id integer references attendees (id)
  );

-- Create the Attendee Contributions table
create table
  attendee_contributions (
    id SERIAL primary key,
    name varchar(255) not null,
    attendee_id integer references attendees (id),
    contribution_id integer references contributions (id)
  );