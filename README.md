# Multi-Level Referral and Earning System

A scalable Node.js backend for a multi-level referral and earning system with real-time updates, analytics, and robust profit distribution logic.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Real-Time Notifications](#real-time-notifications)
- [Database Schemas](#database-schemas)
- [Edge Cases & Security](#edge-cases--security)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Register users with up to 8 direct referrals each
- Multi-level profit sharing (5% direct, 1% indirect)
- Real-time earnings updates via WebSockets
- Purchase validation (profits only for purchases > 1000Rs)
- Detailed earnings reports and analytics
- Robust error handling and edge case management
- Modular, scalable codebase

---

## Architecture
- **Express.js** for REST APIs
- **MongoDB** with Mongoose for data persistence
- **Socket.IO** for real-time communication
- **Modular structure** for maintainability and scalability

---

## Project Structure
```
/project-root
│
├── src/
│   ├── config/                # Configuration files (db, env, etc.)
│   ├── controllers/           # Route logic (business logic)
│   ├── models/                # Mongoose models/schemas
│   ├── routes/                # Express route definitions
│   ├── services/              # Core business logic (referral, profit, notifications)
│   ├── utils/                 # Utility/helper functions
│   ├── sockets/               # Socket.IO event handlers
│   ├── middlewares/           # Express middlewares (auth, error handling, etc.)
│   └── app.js                 # Express app setup
│
├── public/                    # Static files (for visualizations, if any)
├── .env                       # Environment variables
├── package.json
├── README.md                  # Documentation
└── server.js                  # Entry point (starts server and socket)
```

---

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd <project-root>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your MongoDB URI and other secrets.
4. **Start the server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### User Registration
- **POST** `/api/register`
  - Body: `{ "username": "string", "referralCode": "string (optional)" }`
  - Registers a new user. If a referral code is provided, links the user to the referrer (max 8 direct referrals).

### Make a Purchase
- **POST** `/api/purchase`
  - Body: `{ "userId": "string", "amount": number }`
  - Distributes profit up the referral chain if amount > 1000Rs.

### Get Earnings Report
- **GET** `/api/earnings?userId=...`
  - Returns all earnings for the given user.

---

## Real-Time Notifications
- Users receive live updates on their earnings via Socket.IO.
- To register a socket connection, emit `registerSocket` with `{ userId }` after connecting.
- Earnings updates are sent via the `earningUpdate` event.

---

## Database Schemas
- **User**: username, referralCode, referredBy, referrals, socketId, isActive
- **Earning**: userId, amount, sourceUserId, level, timestamp

---

## Edge Cases & Security
- Referral limit (max 8 direct referrals per user)
- No profit for purchases ≤ 1000Rs
- Handles inactive users and invalid referrals
- Data privacy: no sensitive data exposed in APIs
- Error handling middleware for consistent API responses

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
