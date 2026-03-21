# Auth + Private Notes API

A backend REST API built with **Node.js, Express, TypeScript, PostgreSQL, and Sequelize** that provides:

* User authentication (signup/login)
* JWT-based authorization
* Role-based access control
* Private notes CRUD system with ownership enforcement

---

## Tech Stack

* **Node.js**
* **Express**
* **TypeScript**
* **PostgreSQL**
* **Sequelize ORM**
* **JWT (jsonwebtoken)**
* **bcrypt**

---

## Features

### Authentication

* User signup with hashed passwords
* User login with JWT token generation
* Secure password storage using bcrypt

### Authorization

* JWT-based authentication middleware
* Protected routes
* Role-based access control (user/admin)

### Notes System

* Create, read, update, delete notes
* Each note is **owned by a user**
* Users can only access their own notes

### Error Handling

* Centralized error middleware
* Custom error class (`AppError`)

---

## Project Structure

```
src/
│
├── config/
│   └── database.ts
│
├── models/
│   ├── user.model.ts
│   └── note.model.ts
│
├── controllers/
│   ├── auth.controller.ts
│   └── note.controller.ts
│
├── services/
│   ├── auth.service.ts
│   └── note.service.ts
│
├── routes/
│   ├── auth.routes.ts
│   └── note.routes.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
│
├── utils/
│   ├── jwt.ts
│   ├── password.ts
│   └── AppError.ts
│
├── types/
│   └── express.d.ts
│
├── app.ts
└── server.ts
```

---

## Environment Variables

Create a `.env` file in the root:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=auth_service

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

---

## Installation

```bash
npm install
```

---

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## API Endpoints

### Auth Routes

#### Signup

```
POST /auth/signup
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

#### Login

```
POST /auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Notes Routes (Protected)

All routes require:

```
Authorization: Bearer <token>
```

---

#### Create Note

```
POST /notes
```

```json
{
  "title": "My Note",
  "content": "Some content"
}
```

---

#### Get All Notes

```
GET /notes
```

---

#### Get Single Note

```
GET /notes/:id
```

---

#### Update Note

```
PUT /notes/:id
```

---

#### Delete Note

```
DELETE /notes/:id
```

---

## Key Concepts Implemented

* Authentication vs Authorization
* JWT-based session handling
* Password hashing with bcrypt
* Middleware architecture
* Service-controller separation
* Relational data modeling (User ↔ Notes)
* Ownership validation
* Centralized error handling

---

## Learning Outcomes

This project demonstrates:

* Building a production-style backend architecture
* Designing secure authentication systems
* Implementing protected APIs
* Handling relational data with Sequelize
* Structuring scalable backend code

---

## Future Improvements

* Input validation (Zod / Joi)
* Pagination & filtering
* Refresh tokens
* Rate limiting
* Dockerization & deployment
* Unit & integration testing

---

## License

MIT
