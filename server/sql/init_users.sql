CREATE TABLE IF NOT EXISTS users (
  "id" integer PRIMARY KEY default nextval('users_seq'),
  "name" varchar(30) DEFAULT NULL,
  "email" varchar(128) DEFAULT NULL
)