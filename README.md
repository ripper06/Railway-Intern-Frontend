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

```

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

```
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
git clone https://github.com/your-username/railway-frontend.git](https://github.com/ripper06/Railway-Intern-Frontend.git
cd Railway-Intern-Frontend

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
  ![Landing](https://github.com/user-attachments/assets/9f8946ed-a72d-47af-b342-da52cd23ba29)

- Filter Search Option
  ![FILTER ON FROM DATE](https://github.com/user-attachments/assets/1a6e325e-0ba7-476c-9176-2580c8ad1411)

- Login Page
   ![Login](https://github.com/user-attachments/assets/34e132fb-395b-4c55-b3df-72396e2138af)


- Add,Edit,Delete Option after loggedin
   ![AddEditDelete](https://github.com/user-attachments/assets/c02efde0-f35f-419e-9cb2-cbd5a8818a64)

- Topup menu to add new appointment
   ![Add topup](https://github.com/user-attachments/assets/e956805b-b440-4f4d-92ff-021d31cf03d9)

- Topup menu to edit existing appointment
    ![Edit topup](https://github.com/user-attachments/assets/e55c056d-9411-455e-b962-fa2f2da13202)

- Delete existing appointment
    ![Delete](https://github.com/user-attachments/assets/ddf8c269-1079-4239-9f85-bcc366a39ef3)

- Same UI and Functionality for tour
    ![Tour](https://github.com/user-attachments/assets/1001bc26-bd53-48dc-bfaa-17314ea9c143)


## 💬 Contact
  For suggestions, support, or bug reports, please open an issue or contact:

# Jyoti Ranjan Dash (repo owner)
