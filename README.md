# Mechanicus Secure Terminal - Mandatory II
Fullstack authentication system (Node.js + Svelte) with Warhammer 40K Mechanicus theme.

The system mimics a Mechanicus access terminal with login, dashboard, clearance-based endpoints, and notifications.

## Features

### Authentication
- Login with username + password
- Password hashing using bcrypt
- Session-based authentication
- /auth/login and /auth/logout endpoints

### Authorization
Backend includes middleware
- `isUser` -> allows USER and ADMIN
- `isAdmin` -> allows only ADMIN

Frontend includes:
- `ProtectedRoutes.svelte` wrapper
- Redirects unauthorized users to /login
- Session store for displaying correct navbar links

## Notifications
The frontend uses toastify-js to show
- Login success
- Login failure

## Email
On login, the backend sends af test email through Nodemailer
- Subject: "Omnissiah Login Verification"
- Contains HTML Mechanicus message
Preview link is printed in the backend console.

## Getting Started
Backend
```bash
cd server
npm i
npm run deleteDatabase
npm run dev
```

Frontend
```bash
cd client
npm i
npm run dev
```

Make a .env file in the `server` directory:
```bash
PORT=8080
SESSION_SECRET=supersecretkey
```

Likewise, make one in the `client` directory:
```bash
VITE_BASE_URL=http://localhost:8080
```

To login on the site, use one of the test users below:

| Username   | Password  | Role  |
|------------|-----------|--------|
| **Titus**      | fleshbad | ADMIN |
| **Servitor**   | fleshbad | USER  |
