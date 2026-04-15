# Mini Laundry Order Management System

This document outlines the implementation plan for building a full-stack web application to manage laundry orders.

## Goal
Build a clean, responsive, AI-first dashboard application for a dry cleaning store to manage daily orders, track status, calculate billing, and view dashboard analytics. The application uses React, Tailwind CSS, and shadcn/ui for the frontend, and Node.js, Express, and MongoDB for the backend.

## User Review Required

> [!IMPORTANT]
> - Please confirm the chosen technology stack works for you: Vite/React for the frontend, Node.js/Express for the backend, and MongoDB for the database.
> - Do you have a MongoDB cluster ready (like MongoDB Atlas), or should we set up a local MongoDB configuration initially?
> - For authentication, I plan to build a simple JWT-based Auth system with login and registration form. Does this meet your needs?
> - Are there any specific themes or custom color schemes (e.g., brand colors) you want for the UI?

## Architecture Overview
The application will be divided into two main folders: `Client` and `Server`. 

### Backend (Server)
Node.js with Express.js connecting to MongoDB using Mongoose.

#### Models
1. **User**: For authentication (`username`, `password` hashed with bcrypt).
2. **Order**:
    - `orderId`: Unique String (auto-generated or MongoDB's `_id`)
    - `customerName`: String
    - `phoneNumber`: String
    - `garments`: Array of `{ type: String, quantity: Number, price: Number }`
    - `totalAmount`: Number (calculated)
    - `status`: String (Enum: `RECEIVED`, `PROCESSING`, `READY`, `DELIVERED`, default: `RECEIVED`)
    - `estimatedDeliveryDate`: Date
    - `createdAt`, `updatedAt`: Timestamps

#### REST API Endpoints
- **Auth**:
  - `POST /api/auth/register` - Create a new admin user
  - `POST /api/auth/login` - Authenticate and get JWT token
- **Orders**:
  - `POST /api/orders` - Create a new order (Protected)
  - `GET /api/orders` - Get all orders, supports query params for filters (status, customer name/phone, garment search) (Protected)
  - `PATCH /api/orders/:id/status` - Update the status of an order (Protected)
- **Dashboard**:
  - `GET /api/dashboard` - Get aggregated dashboard data (Total orders, total revenue, status breakdown) (Protected)

---

### Frontend (Client)
React application bundled with Vite. Styled with Tailwind CSS and optionally using specific shadcn/ui components for a premium look (like Cards, Inputs, Selects, Buttons, Tables).

#### Pages & Routing
1. **Login Page (`/login`)**: Simple authentication view.
2. **Dashboard (`/`)**: 
   - Overview metrics: Total Orders, Total Revenue, Recent Orders snippet.
   - Status Breakdown charts/cards.
3. **Orders Page (`/orders`)**:
   - List/Table of all orders.
   - Search bar (customer name, phone, garment type).
   - Filter dropdown (by status).
   - Ability to click an order and update its status or view details.
4. **Create Order Page (`/orders/new`)**:
   - Form for customer details.
   - Dynamic form array to add different garments and quantities.
   - Live total bill calculation.
   - Date picker for Estimated Delivery Date.

#### Key Actions & State Integration
- **Auth Context**: Managing JWT token, login state, and logging out.
- **Axios Interceptor**: Automatically attaching the JWT token to requests going to the protected backend routes.
- **Toasts**: Providing visual feedback for successful order creation, status updates, or errors.

## Verification Plan

### Automated/Developer Tasks
- Setup MongoDB connection and configure schemas.
- Ensure Express routes are properly tested via Postman or HTTP files.
- Scaffold React client with Vite and install Tailwind CSS.
- Ensure all components look premium and responsive as requested.

### Manual Verification
1. Open the app and Register/Login successfully.
2. View the unified dashboard showing 0s for missing data.
3. Access Create Order form: enter customer info, add multiple "Shirt", "Pants", etc., verify total price calculation, select delivery date, and save.
4. Go to Dashboard and confirm numerical metrics (e.g., Total Revenue, Order counts) increased.
5. Go to Orders List, search by the created customer name or Garment type, ensure filtering works.
6. Change the status of the order from `RECEIVED` to `PROCESSING`, checking if the dashboard reflects this shift in "Orders per status".
