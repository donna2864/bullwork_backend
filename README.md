# 🚗 Vehicle Management Dashboard (RBAC API)

A secure backend API system built using **Node.js**, **Express**, and **MongoDB** with **JWT Authentication** and **Role-Based Access Control (RBAC)**.
This project enables admins to manage users, vehicles, and vehicle assignments, while normal users can view their own profile and assigned vehicles.

---

## 📌 Features

### 🔐 **Authentication & Authorization**

* Login generates **JWT token**
* Middleware to verify:

  * Authentication (token required)
  * Authorization (admin vs user roles)

### 👥 **User Management (Admin Only)**

* Create user
* View all users
* Update user
* Delete user

### 🚘 **Vehicle Management (Admin Only)**

* Add new vehicle
* View all vehicles
* View single vehicle
* Update vehicle
* Delete vehicle

### 📎 **Vehicle Assignment APIs**

* Assign a vehicle to a user
* Unassign a vehicle
* Get vehicles assigned to a particular user
* Users can get **their own** assigned vehicles

### 👤 **User Self APIs**

* Get profile
* Get my assigned vehicles

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **BCrypt for password hashing**

---

# 📁 Folder Structure

```
/project
│── server.js
│── package.json
│── models/
│    ├── User.js
│    ├── Vehicle.js
│    └── Assignment.js
│── routes/
│    ├── auth.js
│    ├── users.js
│    └── vehicles.js
│── middleware/
     ├── authMiddleware.js
     └── roleMiddleware.js
```

---

# ⚙️ Installation and Setup

### **1️⃣ Clone the repository**

```bash
git clone <repo-url>
cd project-folder
```

### **2️⃣ Install dependencies**

```bash
npm install
```

### **3️⃣ Start MongoDB**

Ensure MongoDB is running locally:

```
mongodb://127.0.0.1:27017
```

### **4️⃣ Start the server**

```bash
npm start
```

You should see:

```
Server running on port 4000
MongoDB connected
```

---

# 🧪 API Testing (Postman)

No environments needed. Use **direct API URLs**.

---

## 🔐 **1. Register a User (Admin Only)**

### **POST** `/api/auth/register`

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}
```

---

## 🔐 **2. Login (Get JWT Token)**

### **POST** `/api/auth/login`

**Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "YOUR_JWT_TOKEN"
}
```

---

## 🔑 Using the Token in Postman

Add this in **Headers**:

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer YOUR_JWT_TOKEN |

---

# 👥 USER APIs

## **Create User (Admin Only)**

`POST /api/users`

## **Get All Users (Admin Only)**

`GET /api/users`

## **Update User**

`PUT /api/users/:id`

## **Delete User**

`DELETE /api/users/:id`

---

# 🚘 VEHICLE APIs

## **Create Vehicle (Admin Only)**

`POST /api/vehicles`

## **Get All Vehicles**

`GET /api/vehicles`

## **Get Vehicle by ID**

`GET /api/vehicles/:id`

## **Update Vehicle**

`PUT /api/vehicles/:id`

## **Delete Vehicle**

`DELETE /api/vehicles/:id`

---

# 📎 VEHICLE ASSIGNMENT APIs

## **Assign Vehicle**

`POST /api/vehicles/:id/assign`

```json
{
  "userId": "USER_ID"
}
```

## **Unassign Vehicle**

`POST /api/vehicles/:id/unassign`

## **Get Vehicles for a User (Admin)**

`GET /api/users/:userId/vehicles`

## **Get My Vehicles (User)**

`GET /api/my/vehicles`

---

# 👤 USER SELF APIs

## **Get My Profile**

`GET /api/my/profile`

## **Get My Vehicles**

`GET /api/my/vehicles`

---

# 🔒 Demo Admin Credentials

| Username | Password |
| -------- | -------- |
| admin    | admin123 |

---

# 🧰 Environment Variables (if you add a .env file)

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/vehicleDB
JWT_SECRET=your_secret_key
```
