# HomelyHub

> A full-stack **MERN** property rental and booking platform (Airbnb-style), built as part of the
> **MERN Stack Internship at Web Stack Academy**.

**Live Demo:** https://homelyhub-ihariprasanth.netlify.app
**Backend API:** https://homelyhub-backend-bfid.onrender.com

---

## About This Project

HomelyHub was developed as the internship project of the **MERN Stack Internship at
[Web Stack Academy](https://www.webstackacademy.com/)**. It covers the complete life cycle of a
real-world web application: UI design, REST API development, database modelling,
authentication, third-party integrations, and cloud deployment.

---

## Features

-  User signup, login, logout with **JWT authentication** (HTTP-only cookies)
-  Forgot password and reset password through email
-  Profile view, edit profile, update password, avatar upload
-  Hosts can add, view and manage their own accommodations
-  Multiple property image upload (stored on **ImageKit**)
-  Search, filter (price range, amenities, etc.), and pagination of properties
-  Interactive property location maps (**Leaflet / OpenStreetMap**)
-  Date-based property booking and "My Bookings" page
-  Multi-step payment flow with progress steps
-  **AI features** powered by **Groq**: auto-generated property descriptions and the AI Trip Planner
-  Responsive design for mobile and desktop

---

## Tech Stack (Web Stack Explained)

### What is the MERN Stack?
**MERN** is a popular JavaScript-based web development stack. The whole application, from
database to browser, is written in one language: **JavaScript**.

| Letter | Technology | Role in HomelyHub |
| :---: | --- | --- |
| **M** | **MongoDB** | NoSQL database that stores users, properties and bookings as JSON-like documents. Hosted on **MongoDB Atlas** (cloud). |
| **E** | **Express.js** | Minimal web framework for Node.js. Used to build the REST API, routes, middleware and error handling. |
| **R** | **React.js** | Frontend library for building the component-based, single-page user interface. |
| **N** | **Node.js** | JavaScript runtime that runs the backend server outside the browser. |

### Frontend
| Technology | Purpose |
| --- | --- |
| **React 18** | Component-based UI |
| **Vite** | Fast dev server and build tool |
| **React Router DOM** | Client-side routing (pages without reload) |
| **Redux Toolkit** + **React Redux** | Global state management (user, properties, bookings, payment) |
| **Axios** | HTTP client for calling the backend API |
| **Ant Design (antd)** | Ready-made UI components |
| **React Leaflet / Leaflet** | Interactive maps |
| **GSAP** | Animations |
| **React Hot Toast** | Notification pop-ups |
| **React DatePicker, Moment** | Date selection and formatting |
| **TanStack React Form** | Form handling |
| **CSS3 / HTML5** | Styling and structure |

### Backend
| Technology | Purpose |
| --- | --- |
| **Node.js** | Server runtime |
| **Express 5** | REST API framework |
| **Mongoose** | ODM to model and query MongoDB |
| **JSON Web Token (JWT)** | Stateless authentication |
| **bcrypt** | Password hashing |
| **cookie-parser** | Reads auth cookies |
| **CORS** | Allows only the deployed frontend to call the API |
| **dotenv** | Loads environment variables |
| **ImageKit** | Cloud image storage and CDN |
| **Nodemailer + Mailgen** | Sends password reset emails (Mailtrap SMTP for testing) |
| **Groq SDK** | AI text generation (descriptions, trip planning) |
| **validator, slugify** | Input validation and clean URLs |

### Database and Cloud (Deployment)
| Service | Used For |
| --- | --- |
| **MongoDB Atlas** | Cloud database |
| **Render** | Backend hosting |
| **Netlify** | Frontend hosting |
| **ImageKit** | Image storage / CDN |
| **GitHub** | Version control and CI/CD trigger |

### Tools
**VS Code**, **Git & GitHub**, **Postman**, **npm**, **ESLint**

---

## Architecture

```
 ┌────────────────┐   HTTPS (Axios)   ┌────────────────────┐   Mongoose   ┌───────────────┐
 │  React (Vite)  │ ────────────────▶ │  Node + Express    │ ───────────▶ │ MongoDB Atlas │
 │   on Netlify   │ ◀──────────────── │  REST API (Render) │ ◀─────────── │               │
 └────────────────┘   JSON + Cookie   └─────────┬──────────┘              └───────────────┘
                                                │
                                   ┌────────────┼──────────────┐
                                   ▼            ▼              ▼
                               ImageKit      Groq AI     Mailtrap SMTP
```

---

## Project Structure

```
HomelyHubProject/
├── backend/
│   └── src/
│       ├── controllers/   # auth, property, booking, trip logic
│       ├── Models/        # Mongoose schemas (User, Property, Booking)
│       ├── routes/        # Express routers
│       ├── ai/            # Groq AI (descriptions, trip planner)
│       ├── utils/         # db, ImageKit, mail, JWT token helpers
│       └── index.js       # server entry point
└── Frontend/
    └── src/
        ├── components/    # home, user, propertyListing, accomodation, myBookings, payment, aiTripPlanner
        ├── store/         # Redux Toolkit slices and actions
        ├── css/           # stylesheets
        └── utils/axios.js # centralized API client
```

---

## API Overview

Base path: `/api/v1/rent`

| Area | Endpoints |
| --- | --- |
| **User** | `POST /user/signup`, `POST /user/login`, `GET /user/logout`, `GET /user/me`, `PATCH /user/updateMe`, `PATCH /user/updateMyPassword`, `POST /user/forgotPassword`, `PATCH /user/resetPassword/:token` |
| **Accommodation** | `POST /user/newAccommodation`, `GET /user/myAccommodation`, `DELETE /user/myAccommodation/:id`, `POST /user/generateDescription` |
| **Listings** | `GET /listing` (search, filter, pagination), `GET /listing/:id` |
| **Bookings** | `GET /user/booking`, `GET /user/booking/:bookingId`, `POST /user/booking/create-order`, `POST /user/booking/verify-payment` |
| **AI Trip** | `POST /trip` |
| **Health** | `GET /health` (base path `/`, not under `/api`) |

---

## Run Locally

**Prerequisites:** Node.js 18+, a MongoDB Atlas (or local) database, an ImageKit account.

```bash
# 1. Clone
git clone https://github.com/ihariprasanth/HomelyHub.git
cd HomelyHub

# 2. Backend
cd backend
npm install
cp .env.example .env      # then fill in your values
npm start                 # runs on http://localhost:8080

# 3. Frontend (new terminal)
cd Frontend
npm install
npm run dev               # runs on http://localhost:5173
```

### Backend environment variables (`backend/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default 8080) |
| `NODE_ENV` | `development` or `production` |
| `ORIGIN_ACCESS_URL` | Frontend URL allowed by CORS |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_IN` | JWT settings |
| `IMAGEKIT_PUBLICKEY`, `IMAGEKIT_PRIVATEKEY`, `IMAGEKIT_URLENDPOINT` | ImageKit credentials |
| `MAILTRAP_SMTP_HOST/PORT/USER/PASS` | Email (password reset) |
| `GROQ_API_KEY` | AI features |

### Frontend environment variable (`Frontend/.env`)
```
VITE_API_BASE_URL=/api      # local (uses Vite proxy)
# VITE_API_BASE_URL=https://<your-backend>.onrender.com/api   # production
```

> Note: Never commit your real `.env` files. They are listed in `.gitignore`.

---

## Deployment

| Part | Platform | Key settings |
| --- | --- | --- |
| Backend | **Render** (Web Service) | Root dir `backend`, build `npm install`, start `npm start` |
| Frontend | **Netlify** | Base dir `Frontend`, build `npm run build`, publish `dist` |
| Database | **MongoDB Atlas** | Network access allows Render |

---

## Acknowledgements

- **[Web Stack Academy](https://www.webstackacademy.com/)** for the MERN Stack Internship, guidance and project framework.

##  Author

**Hari Prasanth**
GitHub: [@ihariprasanth](https://github.com/ihariprasanth)

---

If you like this project, give it a star!
