# Blog API - Relational Backend with Postgresql

A RESTful backend service build using **Node.js, Express, TypeScript, and PostgreSQL,** modeling a relational blog system with users, posts, and comments.

This project focuses on **relational database design, foreign key integrity, and structured backend architecture.**

## Tech Stack

- Node.js
- Express
- TypeScript
- postgreSQL
- sequelize (ORM)
- dotenv

## Architecture Overview

The system models three core entities:
User -> Post -> Comment

## Relationships

- A User can create multiple Posts.
- A Post belongs to one User.
- A Post can have multiple Comments.
- A Comment belongs to one Post.

Foreign keys enforce relational integrity:

- posts.userId -> users.id
- comments.postId -> posts.id

Cascade deletion ensures data consistency:

- Deleting a post automatically deletes its comments.

## Project Structure

```code
src/
│
├── database.ts
├── index.ts
│
├── models/
│   ├── user.model.ts
│   ├── post.model.ts
│   └── comment.model.ts
│
├── routes/
│   ├── user.routes.ts
│   ├── post.routes.ts
│   └── comment.routes.ts
│
└── utils/
    └── validate.ts
```

Architecture flow:

```code
Route -> Model -> Sequelize -> PostgreSQL
```

## API Endpoints

### Users

```code
POST /users
GET /users
GET /users/:id
```

### Posts

```code
POST /posts
GET /posts
GET /posts/:id
PUT /posts/:id
DELETE /posts/:id
```

### Comments

```code
POST /comments
GET /comments
GET /comments/:id
DELETE /comments/:id
```

## Key Concepts Demonstrated

- Relational schema design
- One-to-many associations
- Foreign key constraints
- Cascade deletion
- RESTful API design
- Type-safe backend development
- Asynchronous request handling
- Input validation

