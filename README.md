# TerveApp
CS/C3170

Hi, this is Terve App an app for tracking your daily lifestyle info.

You can track:

  * Sleep duration
  * Sleep quality
  * Time spent on sports and exercise
  * Time spent studying
  * Regularity and quality of eating
  * Generic mood

The app uses Deno - Oak v6.3.2 and PostgresDB

## Deployment instructions

### Prepare your database:

Create the following tables:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));
```


```
CREATE TABLE morning (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    userId INTEGER REFERENCES users(id),
    sleepDuration FLOAT NOT NULL,
    sleepQuality INTEGER NOT NULL,
    genericMood INTEGER NOT NULL
);
```

```
CREATE TABLE evening (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    userId INTEGER REFERENCES users(id),
    sportsTime FLOAT NOT NULL,
    studyTime FLOAT NOT NULL,
    eatingRegularity INTEGER NOT NULL,
    genericMood INTEGER NOT NULL
);
```

### Run the app locally:

Use enviromental variables to insert your database credentials

`PGPORT=$yourDBPortNumber PGHOST=yourDBHostURL PGDATABASE=yourDBName PGUSER=yourDBUser PGPASSWORD=yourDBPassword deno run --allow-all --unstable app.js`

URL: [localhost:7777](localhost:7777)


### Access the app online:

URL: [https://terveapp.herokuapp.com/](https://terveapp.herokuapp.com/)

## Using the app

Duplicated records reported for morning or evening are not allowed by the system.

## Endpoints

`/` Index

`/home` Home

`/auth/login` Authentication site

`/auth/registration` Registration site

`/auth/logout` Logs out

`/behavior/reporting` Reporting site

`/behavior/summary` Summary site

### API

Unfortunately the API is not ready yet
