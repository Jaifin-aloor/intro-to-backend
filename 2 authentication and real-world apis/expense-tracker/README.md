# 💰 Expense Tracker API

A backend service for managing personal expenses with **authentication**, **secure access**, and **user-specific data isolation**. Built using **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Sequelize**.

---

## 🚀 Features

* User Authentication (Signup / Login)
* Password hashing using bcrypt
* JWT-based authorization
* Create, Read, Update, Delete (CRUD) expenses
* User-specific expense access (no cross-user data leaks)
* Global error handling middleware
* Clean layered architecture (Controller → Service → Model)

---

## 🛠 Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Sequelize ORM
* JWT (jsonwebtoken)
* bcrypt

---

## 📁 Project Structure

```
src/
│
├── config/            # Database configuration
├── controllers/       # Route handlers
├── middlewares/       # Auth + error middleware
├── models/            # Sequelize models
├── routes/            # Express routes
├── services/          # Business logic
├── types/             # TypeScript type definitions
├── utils/             # Helpers (JWT, password, errors)
│
├── app.ts             # Express app setup
└── server.ts          # Entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=expense_tracker

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

---

## 🧪 Setup & Run

### 1. Install dependencies

```
npm install
```

### 2. Run the server (development)

```
npm run dev
```

### 3. Server runs on:

```
http://localhost:3000
```

---

## 🔐 Authentication Endpoints

### Signup

```
POST /auth/signup
```

Body:

```
{
  "email": "user@gmail.com",
  "password": "password123"
}
```

---

### Login

```
POST /auth/login
```

Returns JWT token.

---

## 📊 Expense Endpoints

> All routes require Authorization header:

```
Authorization: Bearer <token>
```

---

### Create Expense

```
POST /expenses
```

```
{
  "amount": 500,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-01-01"
}
```

---

### Get All Expenses

```
GET /expenses
```

---

### Get Single Expense

```
GET /expenses/:id
```

---

### Update Expense

```
PUT /expenses/:id
```

---

### Delete Expense

```
DELETE /expenses/:id
```

---

## 🧱 Architecture

```
Routes → Controllers → Services → Models → Database
```

* **Controllers**: Handle request/response
* **Services**: Business logic
* **Models**: Database schema
* **Middleware**: Auth + error handling

---

## ⚠️ Notes

* Uses `sequelize.sync()` for schema creation (development only)
* No migrations used (kept simple for learning)
* All expense data is scoped per user

---

## 📌 Future Improvements

* Pagination & filtering
* Category management
* Expense analytics (monthly reports)
* Migrations & seeders
* Input validation (Zod / Joi)
* Docker setup

---

## 📄 License

This project is for educational purposes.
