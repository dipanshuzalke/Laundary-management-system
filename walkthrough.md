# Mini Laundry Order Management System - Walkthrough

The development of the **Mini Laundry Order Management System** is complete! We have built a full-stack application with a robust Node.js/Express backend and a beautiful, AI-first dynamic React frontend.

> [!IMPORTANT]
> To run the system, you will need to start both the backend server and the frontend client simultaneously.

## What Was Built

### 1. Backend Server (`/Server`)
We implemented a secured API to handle all data management.
* **Authentication**: JWT-based login and registration flows.
* **Orders API**: Endpoints to create orders, fetch all orders with search/filter capabilities, and update order statuses.
* **Dashboard API**: An aggregation endpoint providing real-time metrics (Total Orders, Revenue, recent orders, status breakdown).

### 2. Frontend Client (`/Client`)
A sleek, modern dashboard styled with Tailwind CSS v4, featuring dark mode support and a premium look.
* **Login/Register Views**: A beautiful authentication flow with validation and secure JWT context mapping.
* **Main Dashboard**: Gives a 30,000-foot view of the laundry business. Real-time statistics, progress bars for order statuses, and a recent orders table.
* **Orders List**: A searchable and filterable table of all orders. You can directly change string statuses here (e.g. `RECEIVED` ➔ `PROCESSING`).
* **Create Order**: Dynamic form allowing staff to add multiple custom garments (Shirts, Pants, Suits, etc.), auto-calculating the total estimated bill before submission.

## How to Run the Application

You'll need two separate terminal windows.

**Terminal 1: Start Backend**
```powershell
cd Server
npm run dev
# OR: npm start
```
*Make sure your `.env` contains your MongoDB Atlas connection string.*

**Terminal 2: Start Frontend**
```powershell
cd Client
npm run dev
```

> [!TIP]
> **To Test:** 
> 1. Open the frontend URL (e.g., `http://localhost:5173`) and sign up a new account using the Registration Page.
> 2. Login, try creating a test order, and observe the dashboard update instantly.

## Validation Results
- Tailwind CSS v4 and `lucide-react` icons are fully integrated and actively swapping for Light/Dark mode.
- Protected Routes correctly block unauthorized access and redirect to the Login screen.
- The Node Express API flawlessly handles JWT edge cases without crashing.
