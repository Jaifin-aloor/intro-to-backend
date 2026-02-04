# In-Memory Todo API
### CRUD todo list stored in memory using REST API endpoints - with Node.js, TypeScript and Express

this backend project focuses on backend fundamentals and request/response design - with no backend database or external infrastructure.

**Goals of this project**
 - learn Http request/response flow
 - design clean REST routes
 - implement full CRUD
 - pratice validation and status codes
 - get familiar with Typescript, Git and Thunder Client

**Tech Stack**
- Node.js
- Express
- Typescript
- Nodemon
- ts-node

**project structure**
- index.ts -> route wiring + server bootstrap
- todoStore -> in-memory data store
- createItem.ts -> POST handler
- getAllItems.ts -> GET all handler
- getOneItem.ts -> GET by id handler
- updateitem.ts -> PUT handler
- deleteitem.ts -> DELETE handler

**data model**
```ts
Item {
  id: string
  content: string
  state: boolean
  createdAt: number
  updatedAt: number
}
```

***API Endpoints***
- create item -> POST /items
- get all items -> GET /items
- get single item -> GET /items/:id
- update item -> PUT /items/:id
- delete item -> DELETE /items/:id

this project is mostly a copy of the in-memory notes api project. i did this project to get more familiar with the language, http and basic backend thinking. 
