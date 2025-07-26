---

# 🚀 Project Setup with Docker

This project is containerized using Docker and can be easily run using `docker-compose`.

## 🛠 Prerequisites

* [Docker](https://www.docker.com/get-started) installed
* [Docker Compose](https://docs.docker.com/compose/) installed

## 📦 Install Dependencies

Before starting the app, install Node.js dependencies inside the container:

```bash
docker-compose run --rm web npm install
```

If needed, you can run the installation again:

```bash
docker-compose run --rm web npm install
```

## 📝 Environment Variables

Before running the backend, create a `.env` file inside the `api` folder with the following content:

```env
DATABASE_URL=
JWT_SECRET=
```

Fill in the appropriate values for your database connection and JWT secret.

## ▶️ Start the App

Once dependencies are installed, bring up the services:

```bash
docker-compose up
```

The app will now be accessible from your browser (usually at `http://localhost:3000` or `http://localhost:8000`, depending on your config).

## 🧼 Stop & Clean Up

To stop the app and remove containers:

```bash
docker-compose down
```

---
