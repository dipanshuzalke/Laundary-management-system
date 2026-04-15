# Mini Laundry Order Management System - Walkthrough

The development of the **Mini Laundry Order Management System** is complete! We have built a full-stack application with a robust Node.js/Express backend and a beautiful, AI-first dynamic React frontend.

> [!IMPORTANT]
> To run the system, you will need to start both the backend server and the frontend client.

## What Was Built

### 1. Backend Server (`/Server`)
We implemented a secured API to handle all data management.
* **Authentication**: JWT-based login and registration flows.
* **Orders API**: Endpoints to create orders, fetch all orders with search/filter capabilities, and update order statuses.
* **Dashboard API**: An aggregation endpoint providing real-time metrics (Total Orders, Revenue, recent orders, status breakdown).

### 2. Frontend Client (`/Client`)
A sleek, modern dashboard styled with Tailwind CSS, featuring subtle micro-animations and a premium look.
* **Login View**: A beautiful sign-in page with validation and secure JWT storage context.
* **Main Dashboard**: Gives a 30,000-foot view of the laundry business. Real-time statistics, progress bars for order statuses, and a recent orders table.
* **Orders List**: A searchable and filterable table of all orders. You can directly change string statuses here (e.g. `RECEIVED` ➔ `PROCESSING`).
* **Create Order**: Dynamic form allowing staff to add multiple custom garments (Shirts, Pants, Suits, etc.), auto-calculating the total estimated bill before submission.

## How to Run the Application

You'll need two separate terminal windows.

**Terminal 1: Start Backend**
```powershell
cd "f:\Mini Laundry Order Management System\Server"
npm start
```
*Make sure MongoDB is running locally on port 27017, or update your `.env` connection string.*

**Terminal 2: Start Frontend**
```powershell
cd "f:\Mini Laundry Order Management System\Client"
npm run dev
```

> [!TIP]
> **To Test:** 
> 1. Use an HTTP client (like Postman) to create a user at `POST http://localhost:5000/api/auth/register` with `{ "username": "admin", "password": "password" }`.
> 2. Open the frontend URL (e.g., `http://localhost:5173`) and sign in using the credentials you just created!

## Validation Results
- Tailwind CSS and `lucide-react` icons are fully integrated.
- Protected Routes correctly block unauthorized access and redirect to the Login screen.
- Forms capture React state properly and send correct payloads to MongoDB.
