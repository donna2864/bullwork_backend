# 🚗 Vehicle Management Dashboard (RBAC API)

A secure backend API system built using **Node.js**, **Express**, and **MongoDB** with **JWT Authentication** and **Role-Based Access Control (RBAC)**.  
This project enables admins to manage users, vehicles, and vehicle assignments, while normal users can view their own profile and assigned vehicles.

---

## 📌 Features

### 🔐 Authentication & Authorization
- Login generates **JWT token**
- Middleware verifies:
  - Authentication (valid token required)
  - Authorization (admin or user)

### 👥 User Management (Admin Only)
- Create user  
- View all users  
- Update user  
- Delete user  

### 🚘 Vehicle Management (Admin Only)
- Add new vehicle  
- View all vehicles  
- View one vehicle  
- Update vehicle  
- Delete vehicle  

### 📎 Vehicle Assignment APIs
- Assign a vehicle to a user  
- Unassign a vehicle  
- Get all vehicles assigned to a specific user (Admin)  
- User can view only **their own** assigned vehicles  

### 👤 User Self APIs
- Get my profile  
- Get my vehicles  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **BcryptJS**
- **Postman** for testing
- **MongoDB Compass** for database

---

## 📁 Folder Structure
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
