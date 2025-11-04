CREATE TABLE messages (
  id bigserial primary key,
  text text not null,
  sender text not null,
  meta jsonb,
  created_at timestamptz default now()
);
