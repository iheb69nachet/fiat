-- Create car parts table
create table car_parts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  price decimal(10,2) not null,
  category text not null,
  compatibility text[] not null,
  image text not null,
  images text[],
  stock_quantity integer not null,
  brand text not null,
  part_number text not null,
  is_accessory boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up row level security
alter table car_parts enable row level security;

