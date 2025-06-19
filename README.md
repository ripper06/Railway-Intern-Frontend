# East Coast Railway Admin Dashboard (Frontend)

This is the frontend of the Railway Admin Portal for managing Appointments & Tours for East Coast Railway officials. Built using React with Parcel bundler (no Vite/Webpack) and styled with custom CSS (no Tailwind/Bootstrap).

## 🖥️ Project Overview

The application provides a clean and responsive interface for managing appointment schedules and officer tour programmes.

- View all Appointments & Tour records publicly
- Filter by From Date and To Date
- Row coloring for better visualization of dates
- Admin-only Add/Edit/Delete functionality
- Login system with JWT-based authentication
- Built using React + Parcel + Axios

## 📁 Folder Structure

frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ └── Navbar.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Appointments.jsx
│ │ └── Tours.jsx
│ ├── styles.css
│ ├── App.jsx
│ └── index.jsx
└── package.json


## ✅ Features

### Public Users

- View Appointments & Tours in table format
- Filter entries using From Date / To Date
- Row color indicators:
  - 🟩 Today
  - 🟨 Tomorrow
  - 🩶 Future
  - ⬜ Past

### Admin Users

- Login via /login
- Add new Appointment / Tour
- Edit existing rows via popup modal
- Delete rows
- Logout to revert to public view

## 🛠️ Tech Stack

- React (without CRA)
- Parcel Bundler
- React Router DOM v7
- Axios
- Vanilla CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Backend server running on http://localhost:5050

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/railway-frontend.git
cd railway-frontend

# Install dependencies
npm install

# Start the development server
npm run start

# Parcel will compile the app and open it in the browser at:
http://localhost:1234/
```
## Admin Credentials
You can configure ADMIN_USER and ADMIN_PASS in your backend .env file.

Once logged in, a valid JWT token is stored in localStorage and enables the Add/Edit/Delete UI.

## 📸 Screenshots
- Home (Appointments table with filters)

- Tours Programme table

- Add/Edit Popup Modal



## 💬 Contact
  For suggestions, support, or bug reports, please open an issue or contact:

# Jyoti Ranjan Dash (repo owner)
