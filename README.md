# 🧠 Krazy Kanban Board

A full-stack Kanban task management application built with TypeScript, PostgreSQL, JWT authentication, and a React + Vite frontend. This app allows users to securely log in and manage tickets across Todo, In Progress, and Done swimlanes.

---

## Deployed Site
https://kanban-board-1-n6t9.onrender.com/

## 🚀 Features

- 🔐 **JWT Authentication** (login only, no registration required)
- 🧾 **Token Storage in localStorage**
- ✅ **Protected API Routes**
- 📋 **Kanban-style task management**
- 🔄 **Drag-and-drop ticket interface (coming soon)**
- 🌐 **Deployed via Render (frontend & backend)**

---

## 🛠️ Tech Stack

### Client
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- LocalStorage

### Server
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 🔐 Authentication Flow

- User logs in via the login form
- If the user doesn't exist, it is automatically created
- The server returns a **JWT token**, which is stored in `localStorage`
- Token is included in the `Authorization` header for all protected API requests
- Routes like `/api/users` and `/api/tickets` require a valid token

---