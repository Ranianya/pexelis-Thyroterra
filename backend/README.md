# 🚀 Backend API – Clean Architecture (Node.js, Express, Prisma, MySQL)

A scalable and modular backend API built with **Node.js**, **Express.js**, **Prisma ORM**, and **MySQL**, following **Clean Architecture principles** for maintainability, testability, and long-term growth.

---

## 📌 Features

* Clean Architecture & modular structure
* User Authentication (JWT)
* Task Management (CRUD)
* Gamification System
* Prisma ORM with MySQL
* Input validation & centralized error handling
* Secure password hashing
* Environment-based configuration

---

## 🏗 Architecture Overview

```
Presentation Layer → Routes & Controllers
Application Layer  → Services (Use Cases)
Domain Layer       → Entities
Infrastructure     → Repositories & Prisma
```

Flow:

```
Client → Routes → Controller → Service → Repository → Database
```

---

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── env.js
│   │   └── database.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tasks/
│   │   └── gamification/
│   │
│   ├── shared/
│   │   ├── middleware/
│   │   ├── errors/
│   │   └── utils/
│   │
│   └── routes.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Requirements

* Node.js v18+
* MySQL
* npm or yarn

---

## 📦 Installation

```bash
git clone <repository-url>
cd backend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
JWT_SECRET="your_jwt_secret"
PORT=4000
```

---

## 🗄 Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

(Optional GUI)

```bash
npx prisma studio
```

---

## ▶ Run Project

Development mode:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs at:

```
http://localhost:4000
```

---

## 🧪 Example API Endpoints

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
```

### Users

```
GET    /api/users/profile
```

### Tasks

```
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Gamification

```
GET    /api/gamification/status
POST   /api/gamification/progress
```

---

## 🔒 Security

* Passwords hashed with bcrypt
* JWT authentication
* Environment variables for secrets
* Centralized error handling

---

## 🧠 Coding Conventions

* One module per feature
* Controllers contain no business logic
* Services contain use-case logic
* Repositories handle DB only

---

