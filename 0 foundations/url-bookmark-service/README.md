
# In-memory url bookmark service API

## CRUD url bookmark service stored in memory using REST api endpoints and tag based indexing - with Node.js, TS and Express

This backend project focuses on backend fundamentals and request/response design - with no database or external infrastructure. 

### Goals of this project

- Source of truth vs derived data
- Secondary indexes
- Correct state transitions
- Clean CRUD semantics
  
### Tech Stack

- Node.js
- Express
- TypeScript
- Nodemon

### Project Structure

- index.ts -> router wiring + server bootstrap
- bookmarkstore.ts -> in-memory data store
- createBookmarks.ts -> POST handler
- readBookmark.ts -> GET all bookmarks handler and GET bookmark by id handler
- readTags.ts -> GET all tags handler and GET bookmarks by tags handler
- updateBookmarks.ts -> PUT handler
- deleteBookmarks.ts -> DELETE handler

### Data model

```ts
Bookmark {
    id: string
    url: string
    name: string
    tags: string[]
    createdAt: number
    updatedAt: number
}
```

- id is the primary identifier
- tags are user controlled
- bookmarks may have zero or more tags
- urls are not required to be unique

#### Internal design

Source of truth

```ts
bookmarks: Bookmark[]
```

Derived index

```ts
tagIndex: Map<string, Set<BookmarkId>>
```

- the bookmarks list is authoritative
- the tagIndex is derived and maintained incrementally
- the tagIndex is updated on bookmark creation/updation/deletion
- no global rebuilds or scans

### Running the project

1. npm install
2. npm run dev
3. http://localhost:3000
