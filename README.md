## Setup

* Clone the repo

### Postgres Setup

Install postgres

```
$ sudo apt-get update
```

```
sudo apt-get istall postgres postgres-contrib
```

CREATE DATABASE

```
$ sudo -u postgres psql
$ CREATE DATABASE cts;
$ \c cts
$ CREATE TABLE users (id INT PRIMARY KEY NOT NULL, password TEXT NOT NULL, roles INT NOT NULL);
```

### For backend

Install all modules

```
$ npm install
```

To run the backend

```
$ npm run dev
```

### For Routes

* For registeration of admin

    http://localhost:8000/api/v1/admin-view/register (POST request)  (Create new user in data base)

* For login

    http://localhost:8000/api/v1/admin-view/login  (POST Request)  (Verifies user and returns a access and refresh token)

* For getting refresh token back

    http://localhost:8000/api/v1/admin-view/refresh  (Get Request)  (Returns an access token)

* For logging out / deleting refresh token
  * http://localhost:8000/api/v1/admin-view/refresh (DELETE request) (Deletes the resfresh token from the cookie)
