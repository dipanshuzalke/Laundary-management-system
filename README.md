# Mini Laundry Order Management System ✨

A full-stack web application designed to manage laundry orders, track garments, auto-calculate bills, and provide realtime dashboard metrics for business operations.

## 🔹 Setup Instructions

### 1. Database Configuration
1. Navigate to the `Server` folder and locate `.env`.
2. Set your MongoDB connection string. We recommend using MongoDB Atlas.
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://dipanshuzalke_db_user:eBwbQme3BeBtBIHa@cluster0.nr8mklf.mongodb.net/laundary-app
   JWT_SECRET=super_secret_laundry_key_2026
   ```

### 2. Run Backend
Open a terminal in the `Server` directory:
```bash
cd Server
npm install
npm start
```
*Note: Successful startup will output "MongoDB Connected". The server runs on http://localhost:5000*

### 3. Run Frontend
Open a new terminal window in the `Client` directory:
```bash
cd Client
npm install
npm run dev
```
*Note: Ensure both servers are running simultaneously to avoid network errors.*

---

## 🔹 Features Implemented

- **Secure Authentication**: Fully functional JWT-based registration and login system with secure protected routing.
- **Dynamic Order Management**: Create orders with dynamic multi-select garments, auto-calculating total cost based on preset item prices.
- **Real-time Dashboard Metrics**: Aggregated MongoDB analytics displaying Total Orders, Total Revenue, and Status Breakdowns.
- **Order Tracking**: Interactive data table to filter, search, and update order lifecycles natively (RECEIVED, PROCESSING, READY, DELIVERED).
- **Dark/Light Mode**: Full theme toggle system with local storage persistence using standard CSS variables and Tailwind v4.
- **Modern UI**: Polished, responsive design using React, latest Tailwind CSS v4, Lucide React icons, and sleek micro-animations.

---

## 🔹 AI Usage Report

**Tools Used**: Antigravity (Google DeepMind AI Agent)

**Sample Prompts**:
- *"Build Laundry Management System with full-stack capabilities using React and Node.js."*
- *"Add dark and light mode support also."*

**Process**: I first created an implementation plan (`implementation_plan.md`) using AI. Then we systematically walked through and executed the plan, documenting the final result in (`walkthrough.md`). Both of these markdown files are maintained in the repository for reference.

### Errors encountered and AI Improvements:

1. **TailwindCSS V4 Configuration & PostCSS Errors**
   - **Wrong**: Initially set up using standard `@tailwind` directives, relying on older PostCSS configurations which triggered errors like `Cannot apply unknown utility class border-border` due to Tailwind v4 strictly dropping `@apply` for native layers.
   - **Improved**: Securely migrated the project to pure Tailwind v4 syntax by explicitly installing `@tailwindcss/vite`, updating `vite.config.js`.
   
2. **Frontend `AxiosError: Network Error`**
   - **Wrong**: The frontend abruptly threw Axios network errors while attempting to fetch dashboard metrics causing white screens.
   - **Improved**: Added cors library for cross origin resource sharing.

3. **Local Database Connection Issues (`ECONNREFUSED 127.0.0.1:27017`)**
   - **Wrong**: The node server crashed on launch attempting to connect to a local Mongoose database that did not exist natively on the host machine.
   - **Improved**: Pivoted from a local unconfigured MongoDB instance to utilizing a live MongoDB Atlas cloud cluster securely stored in the `.env` variables to ensure guaranteed connection stability across devices.

---

## 🔹 Tradeoffs

**What we skipped:**
- **Paginated API Lists**: For simplicity, `OrdersList` queries all records at once. If the business grows to thousands of orders, pagination scaling was skipped here.
- **Roles / Permissions**: Everyone acts as an admin; we skipped complex RBAC (Role-Based Access Control) partitioning for shop employees vs. read-only customers.
- **Receipts / Invoices**: Skipped explicit printable PDF generation for tracking receipts.

**What we'd improve with more time:**
- Implement robust PDF receipt generation and email notifications directly upon order fulfillment.
- Build a generic analytics charting system (Line charts mapping revenue over time) instead of just static status bars.
- Add fully featured user profile management settings (Password resets, avatar uploads).

---

## 🔹 UI Previews

### Dashboard (`/`)
![Dashboard Demo](Client/src/assets/Screenshot%20(692).png)

### Orders Management (`/orders`)
![Orders List Demo](Client/src/assets/Screenshot%20(693).png)

### Create Order (`/orders/new`)
![Create Order Demo](Client/src/assets/Screenshot%20(694).png)

---

## 🔹 API Collection & Demo Usage

The project utilizes a modern **React UI** handling these core interactions entirely seamlessly (accessible via `localhost:5173` on start).
However, for backend engineers or integration tests, the Postman-equivalent REST API architecture is as follows:

### Authentication
- `POST /api/auth/register` - Register a new operator (Body: `username`, `password`)
- `POST /api/auth/login` - Authenticate and retrieve JWT token

### Dashboard Metrics
- `GET /api/dashboard` *(Requires Auth)* - Returns aggregated stats (revenue, order counts)

### Order Operations
- `GET /api/orders` *(Requires Auth)* - Query active orders (Params: `?search={name or phone}&status={status}`)
- `POST /api/orders` *(Requires Auth)* - Submit new order (Body: `customerName`, `garments[]`, `totalAmount`)
- `PATCH /api/orders/:id/status` *(Requires Auth)* - Update existing order lifecycle status
