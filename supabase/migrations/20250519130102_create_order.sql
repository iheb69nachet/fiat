create table orders  (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  part_id uuid references car_parts(id),
  quantity integer not null,
  total_price decimal(10,2) not null,
  shipping_address text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

