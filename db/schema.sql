DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id SERIAL UNIQUE PRIMARY KEY,
  maker TEXT NOT NULL,
  title TEXT NOT NULL,
  img VARCHAR(64) NOT NULL,
  medium TEXT,
  year TEXT,
  location TEXT
);
