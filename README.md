# 🎓 CampusIQ

> **A modern Learning Management System (LMS) designed to connect Directors, Teachers, and Students on a single platform.**

CampusIQ is a full-stack Learning Management System built to simplify and digitize academic management for colleges and educational institutions.

---

## 🌐 Live Demo

🚀 **Live Website:**  
https://campus-iq-frontend-aebi.vercel.app/

---

## 🔗 Project Links

| Resource | Link |
|---|---|
| 🌐 Live Website | https://campus-iq-frontend-aebi.vercel.app/ |
| ⚛️ Frontend | Deployed on Vercel |
| 🐍 Backend | https://github.com/palharsh470/campusIQ-backend |

### 🐍 Backend Repository

The complete Django backend source code is available here:

**https://github.com/palharsh470/campusIQ-backend**

The backend repository is public and contains modules for assessments, classes, doubts, feedback, lectures, media, organizations, reports, skills, and users.

---

## 🚀 Features

### 👨‍💼 Organization / Director

- Manage organization and academic structure
- Create and manage programs
- Launch placement-oriented initiatives
- Manage teachers and students
- Monitor academic activities
- Access reports and performance insights

### 👨‍🏫 Teachers

- Create and manage classes
- Create class groups
- Schedule lectures
- Upload YouTube-based lecture content
- Create assignments and assessments
- Answer student doubts
- Track student performance
- Share learning resources

### 👨‍🎓 Students

- Access enrolled classes
- Watch lectures
- Complete assignments
- Attempt assessments
- Ask and resolve doubts
- Interact with teachers
- Track academic progress

---

## 🤖 AI-Powered Assignment Generation

CampusIQ includes an AI-assisted assignment generation system designed to reduce the manual effort required from teachers.

### Workflow

```text
Teacher uploads YouTube Lecture
            ↓
      Lecture Content
            ↓
      Content Processing
            ↓
        Gemini AI
            ↓
    Question Generation
            ↓
       Assignment
            ↓
        Students
```

The system can generate questions based on lecture content and configurable requirements.

Possible question types include:

- MCQs
- Short-answer questions
- Conceptual questions
- Numerical questions
- Programming questions

---

## 💬 Real-Time Doubt System

CampusIQ provides a real-time doubt resolution system using WebSockets.

### Students can

- Ask questions
- Send messages
- Like useful responses
- Participate in discussions
- Receive real-time updates

### Teachers can

- View student doubts
- Respond to questions
- Participate in discussions
- Resolve doubts

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      CampusIQ       │
                    │      Frontend       │
                    │   React Application  │
                    └──────────┬──────────┘
                               │
                     REST API / WebSocket
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Django Backend    │
                    │ Django REST         │
                    │ Framework           │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       PostgreSQL        Django Channels     Gemini AI
                                │
                                ▼
                         Real-Time Features
```

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- TanStack Query
- JavaScript
- REST APIs
- WebSockets

### Backend

- Python
- Django
- Django REST Framework
- Django Channels
- Daphne
- Simple JWT
- PostgreSQL
- Django CORS Headers

### AI

- Google Gemini
- Google GenAI Python SDK
- AI-powered question generation

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** PostgreSQL

---

## 📁 Backend Structure

```text
campusIQ-backend/
│
├── assessments/
├── classes/
├── doubts/
├── feedback/
├── lectures/
├── media/
├── organizations/
├── project/
├── reports/
├── skills/
├── users/
│
├── manage.py
├── requirements.txt
├── Pipfile
├── Pipfile.lock
└── .gitignore
```

---

## 🔐 Authentication

CampusIQ uses JWT-based authentication with role-based access.

```text
                    Login
                      │
                      ▼
              Authentication
                      │
                      ▼
                 JWT Token
                      │
                      ▼
              Authenticated API
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      Director      Teacher     Student
```

---

## ⚡ Real-Time Communication

```text
Student
   │
   │ WebSocket
   ▼
Django Channels
   │
   ▼
Doubt Consumer
   │
   ├── New Message
   ├── Like
   └── Real-Time Updates
   │
   ▼
Teacher / Students
```

---

## 📊 Core Modules

| Module | Purpose |
|---|---|
| Users | Authentication and user management |
| Organizations | Organization and program management |
| Classes | Class and class-group management |
| Lectures | Lecture scheduling and content |
| Assessments | Tests and evaluations |
| Doubts | Student-teacher doubt resolution |
| Feedback | Feedback collection |
| Reports | Academic and performance reporting |
| Skills | Skill-related learning data |
| Media | Media/resource management |

---

## ⚙️ Backend Setup

### Clone the repository

```bash
git clone https://github.com/palharsh470/campusIQ-backend.git
cd campusIQ-backend
```

### Create virtual environment

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file:

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
ALLOWED_HOSTS=localhost,127.0.0.1
```

> ⚠️ Never commit `.env` or API keys to GitHub.

### Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Create superuser

```bash
python manage.py createsuperuser
```

### Start server

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

## 🎯 Project Goal

CampusIQ aims to provide colleges with a centralized platform where academic management, learning resources, assessments, communication, and student development can be managed efficiently.

The project combines **LMS functionality, real-time communication, and AI-powered academic assistance** into a single platform.

---

## 🔮 Future Improvements

- AI-generated assignments from lecture transcripts
- AI lecture summarization
- AI-powered doubt assistance
- Personalized learning recommendations
- Advanced student analytics
- Placement-readiness analytics
- Automated notifications
- Advanced reporting dashboards
- Mobile application

---

## 👨‍💻 Developer

**Harsh**

Built with ❤️ using React, Django, PostgreSQL, WebSockets, and AI.

---

## 📄 License

This project is currently maintained as a personal/academic project.