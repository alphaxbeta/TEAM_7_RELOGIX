# RELOGIX Application

A full-stack web application built with **React.js**, **Node.js + Express**, and **MongoDB**.

---

## Project Structure

```
relogix-app/
├── src/
│   ├── pages/
│   │   └── team/
│   │       ├── TeamHome.jsx        # Home / Landing Page
│   │       ├── AddMember.jsx       # Add Member Form Page
│   │       ├── ViewMembers.jsx     # View All Members Page
│   │       ├── MemberDetails.jsx   # Individual Member Detail Page
│   │       └── team.css
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── models/Member.js            # Mongoose Member schema
│   ├── routes/memberRoutes.js      # API routes
│   ├── uploads/                    # Profile image storage
│   └── index.js                    # Express server
└── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB running locally (port 27017) or MongoDB Atlas

### 1. Install Frontend dependencies
```bash
npm install
```

### 2. Install Backend dependencies
```bash
cd server && npm install && cd ..
```

### 3. Configure environment
In `server/.env`:
```
MONGODB_URI=mongodb://127.0.0.1:27017/relogix
PORT=5000
```

---

## Running the App

### Start Backend (from server/ folder)
```bash
cd server
npm run dev
```
Runs at: http://localhost:5000

### Start Frontend (from root folder)
```bash
npm run dev
```
Runs at: http://localhost:5173

### Access Team Management
```
http://localhost:5173/team
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/members | Add a new team member (multipart/form-data with image) |
| GET | /api/members | Get all team members |
| GET | /api/members/:id | Get a single member by ID |

### Test in Browser
- http://localhost:5000/api/members
- http://localhost:5000/api/members/:id

---

## Pages

| Route | Page |
|-------|------|
| /team | Home / Landing Page |
| /team/add | Add New Member |
| /team/members | View All Members |
| /team/members/:id | Member Details |
