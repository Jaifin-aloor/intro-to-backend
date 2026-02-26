# Expense Tracker API

A simple RESTful API built with **Node.js, Express, TypeScript, Sequelize, and PostgreSQL** for managing personal expenses.

## Overview

The Expense Tracker API allow users to:

- Create expenses
- View all expenses
- View a single expense by ID
- Update expense details
- Delete expenses

This project focuses on building a clean backend architecture using foundational backend concepts:

- RESTful routing
- MVC structure
- Request validation
- Error handling
- Database integration with Sequelize ORM
- TypeScript type safety

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize ORM
- dotenv
- Nodemon

## Project Structure

```code
expense-tracker/
│
├── src/
│   ├── config/
│   │   └── database.ts
│   │
│   ├── models/
│   │   └── expense.model.ts
│   │
│   ├── routes/
│   │   └── expense.routes.ts
│   │
│   ├── utils/
│   │   └── validate.ts
│   │
│   └── index.ts
│
├── .env
├── package.json
└── tsconfig.json
```

## Core Concepts Implemented

- Sequelize model definition with typed attributes
- Environment-based configuration
- Async/Await for database operations
- Custom validation middleware
- Structured error handling
- TypeScript control-flow narrowing
- Partial updates using nullish coalescing (**??**)

## API Endpoints

- Create Expense -> POST /expenses
- Get all expenses -> GET /expenses
- Get expense by id -> GET /expenses/:id
- Update expense -> PUT /expenses/:id
- Delete expense -> DELETE /expenses/:id
