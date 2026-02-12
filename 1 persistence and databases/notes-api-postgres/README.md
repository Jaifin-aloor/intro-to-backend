# Notes API (PostgreSQL + TypeScript + Express)

A RESTful Notes API built with **Node.js, Express, TypeScript** and **PostgreSQL**, Using a layered architecture (Router -> Controller -> Repository -> ORM).

This project demonstrates backend structure sutable for production style applications, including database persistance, validation and modular organisation.

## Tech Stack

- Node.js
- TypeScript
- Express
- dotenv
- postgreSQL
- Sequelize ORM
  
## Features

- Create a note
- Get all notes
- Get note by id
- Update note
- Delete note
- Schema-based request validation
- Environment based configuration
- Layered architecture
  
## Project Structure

```graphql
src/
│
├── config/         # Database configuration
├── controller/     # HTTP request handling
├── repository/     # Database access logic
├── router/         # Route definitions
├── model/          # Sequelize models
├── schema/         # Validation schemas
├── helper/         # Utility functions
├── index.ts        # Application entry point
```

## API Endpoints

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /notes     | Get all notes  |
| GET    | /notes/:id | Get note by ID |
| POST   | /notes     | Create note    |
| PUT    | /notes/:id | Update note    |
| DELETE | /notes/:id | Delete note    |
