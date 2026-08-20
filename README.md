# AbleSpace Assessment

A full-stack project management application built as part of the AbleSpace assessment.

## 🚀 Features

* Create, edit, and delete projects/tasks
* Search and filter projects/tasks
* Persistent project/task data
* Guest login flow
* Light/Dark theme switching
* Responsive user interface
* REST API integration
* MongoDB database integration
* Next.js frontend with App Router
* NestJS backend

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* NestJS
* TypeScript
* REST API

### Database

* MongoDB
* MongoDB Atlas

## 📁 Project Structure

```text
AbleSpace-Assessment/
└── frontend/
    ├── app/
    ├── components/
    ├── public/
    ├── package.json
    └── ...
    └── backend/
        ├── src/
        ├── package.json
        └── ...
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NoorFathima0204/Ablespace-Assignment.git
cd Ablespace-Assignment
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

### 3. Start the Backend

Open a second terminal:

```bash
cd frontend/backend
npm install
npm run start:dev
```

The backend runs on:

```text
http://localhost:3001
```

## 🔐 Environment Variables

Create the required environment configuration for the backend/database connection.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
```

Do not commit actual credentials or secrets to the repository.

## 🔄 Application Flow

The Next.js frontend communicates with the NestJS REST API for project/task operations. Data is stored in MongoDB and remains available after refreshing the application.

## 🧪 Testing

The following functionality has been verified:

* ✅ Add project/task
* ✅ Edit project/task
* ✅ Delete project/task
* ✅ Search and filtering
* ✅ Data persistence after refresh
* ✅ Theme switching
* ✅ Guest/login flow
* ✅ Frontend and backend running successfully
* ✅ Production build verification
* ✅ API connectivity

## 📦 Production Build

To verify the frontend production build:

```bash
npm run build
```

## 👩‍💻 Author

**Noor Fathima**

GitHub: https://github.com/NoorFathima0204
