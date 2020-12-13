# TerveApp
 CS/C3170
Hi, this is Terve App an app for tracking your daily lifestyle info.

You can track:

Sleep duration, sleep quality, time spent on sports and exercise, time spent studying, regularity and quality of eating, and generic mood

The app is developed on Deno- Oak v6.3.2 and PostgresDB

Prepare the database:

Create the following tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));



CREATE TABLE morning (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    userId INTEGER REFERENCES users(id),
    sleepDuration INTEGER NOT NULL,
    sleepQuality INTEGER NOT NULL,
    genericMood INTEGER NOT NULL
);



CREATE TABLE evening (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    userId INTEGER REFERENCES users(id),
    sportsTime INTEGER NOT NULL,
    studyTime INTEGER NOT NULL,
    eatingRegularity INTEGER NOT NULL,
    genericMood INTEGER NOT NULL
);


Run the app locally:

Use enviromental variables to insert your database credentials

PGPORT=5432 PGDATABASE=my_db PGHOST=something_at_possibly.elephantsql.com etcetc deno run

URL: localhost:7777



Access the app online:

URL:



