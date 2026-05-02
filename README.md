**                                     Team Task Manager (Full-Stack)
📌 Overview

The Team Task Manager is a full-stack web application that allows users to create projects, assign tasks, and track progress efficiently. It supports role-based access control where admins can manage projects and users, while members can view and update assigned tasks. The system provides a centralized dashboard to monitor task status and deadlines. It is designed to improve team collaboration and productivity. This project follows REST API architecture with proper validations and database relationships.

🎯 Objective

To build a scalable web application that helps teams manage tasks and projects with secure authentication and role-based access control.

✨ Key Features
🔐 Authentication (Signup / Login)
📁 Project & Team Management
✅ Task Creation, Assignment & Status Tracking
📊 Dashboard (Tasks, Status, Overdue)
👥 Role-Based Access (Admin / Member)

⚙️ Requirements Implemented
- RESTful APIs using Node.js & Express
- Database integration (MongoDB – NoSQL)
- Proper validations for user input
- Role-based access control (RBAC)
- Secure authentication using JWT

🛠️ Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Database
MongoDB (MongoDB Atlas)
Deployment
Frontend: Render
Backend: Render
Database: MongoDB Atlas

📂 Project Structure
project-manager/
│── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│
│── README.md

🔄 Application Workflow
- User registers or logs into the system
- Admin creates a project with title & description
- Tasks are created and assigned to team members
- Users update task status (Pending / In Progress / Completed)
- Dashboard displays project progress and overdue tasks

🔑 Environment Variables
Create a .env file in backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/project-manager.git
cd project-manager
2️⃣ Run Backend
cd backend
npm install
npm start
3️⃣ Run Frontend
cd frontend
npm install
npm start

📸 Screenshots
Project Creation Page
Dashboard View
Task Assignment Interface
                                                       **  USER**
                                                       
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193141" src="https://github.com/user-attachments/assets/b755ad6f-5712-4f99-90c5-2c56112c4597" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193147" src="https://github.com/user-attachments/assets/7666d643-968f-4f26-a8af-ce060cf7ace3" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193430" src="https://github.com/user-attachments/assets/835bf6d3-5f2f-4909-9602-0d5be90cd0f8" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 195133" src="https://github.com/user-attachments/assets/77481e46-f562-4f10-a558-7dcde4969811" />

                                                     **   ADMIN **

<img width="1920" height="1200" alt="Screenshot 2026-05-02 193141" src="https://github.com/user-attachments/assets/1b87828f-5a1a-451b-bfdf-9155db9918ff" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193154" src="https://github.com/user-attachments/assets/b1fa2296-49fe-4c12-9a4d-485be515e13a" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193212" src="https://github.com/user-attachments/assets/d22c4f66-8bf9-4308-9f69-fca749e40e32" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193223" src="https://github.com/user-attachments/assets/8adaf82a-23a8-4e3c-89be-afe0424a1ad1" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193230" src="https://github.com/user-attachments/assets/8c394c83-b262-477c-b30e-40f288ace5a8" />
<img width="1920" height="1200" alt="Screenshot 2026-05-02 193236" src="https://github.com/user-attachments/assets/1de7ec1f-1b5d-4f0b-833d-d75bbdce2445" />


🚀 Future Enhancements
🔔 Notifications for task updates
📅 Deadline reminders
📎 File upload support
📈 Advanced analytics dashboard
