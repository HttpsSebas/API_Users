# Orders API

REST API for user and order management.

## Technologies

* Node.js
* Express
* Prisma
* JWT
* bcrypt

## Installation

```bash
git clone https://github.com/HttpsSebas/api-orders/master
cd api-orders
npm install
```

## Environment variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=3000
HOST=
```

## Run the project

```bash
npm run dev
```

---

## Endpoints

### Base
#### api/v1/

---

### Docs

#### GET /docs

The API's Documentation.
---

### Auth

#### POST /auth/register

Register user

Body:

```json
{
  "name": "John Doe",
  "email": "test@mail.com",
  "password": "123456"
}
```

---

#### POST /auth/login

User login

Body:

```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

---

#### GET /auth/logout

User logout

---

#### GET /auth/refresh

Refresh user's session token

---

### Users

#### GET /users

Get user info

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "test@mail.com"
}
```

---

#### PUT /users

Update user info

Body: 
```json
{
  "name": "John Doe",
  "email": "test@mail.com",
  "password": "123456"
}
```
---

#### DELETE /users

Delete current user

---

### Orders

#### GET /orders

Get user's orders

```json
[
  {
    "id": 0,
    "createdAt": "2026-03-27T19:56:19.182Z",
    "userId": 0,
    "total": 0,
    "status": "PENDING",
    "items": [
      {
        "id": 0,
        "name": "Product 1",
        "price": 19.99,
        "quantity": 2
      }
    ]
  }
]
```

#### POST /orders

Create order

Body:
```json
{
  "items": [
    {
      "id": 0,
      "name": "Product 1",
      "price": 19.99,
      "quantity": 2
    }
  ]
```

#### PATCH /orders/{id}

Update status (pending, delivered, canceled)

Body:
```json
{
  "status": "PENDING"
}
```

---

## Authentication

Use JWT in headers:

```
Cookie: token=TOKEN
```

---

## Features

* Registration and login
* JWT authentication
* Password hashing
* Order CRUD
