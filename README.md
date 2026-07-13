# 🏥 Sehat Online

> A Secure AI-Powered Telemedicine Platform built with Next.js, ASP.NET Core Web API, and Microsoft SQL Server.

Sehat Online is a full-stack healthcare platform that enables patients and healthcare providers to connect through a secure, intelligent, and user-friendly digital ecosystem. The platform streamlines appointment scheduling, doctor discovery, secure communication, and medical record management while incorporating modern cybersecurity practices and AI-driven healthcare assistance.

The project was developed as a comprehensive software engineering project, following Agile methodologies and emphasizing scalability, security, and maintainability.

---

## ✨ Features

### 👤 Patient Portal

* User registration and secure authentication
* Multi-Factor Authentication (OTP)
* Search doctors by specialization and city
* Book and manage appointments
* Upload and manage medical reports
* Secure real-time messaging with doctors
* AI-powered healthcare chatbot
* View appointment history
* Manage personal profile

### 👨‍⚕️ Doctor Portal

* Secure login
* Doctor dashboard
* Manage appointments
* View patient reports
* Update availability and schedules
* Communicate securely with patients
* Manage profile and consultation details

### 🤖 AI Integration

* GPT-powered healthcare chatbot
* Provides preliminary health guidance
* Assists users with healthcare-related queries
* Hosted using Azure AI services

---

# 🔐 Security Features

Security is one of the primary focuses of Sehat Online.

Implemented security mechanisms include:

* JWT Authentication
* OTP-based Multi-Factor Authentication (MFA)
* AES Encryption for sensitive patient information
* Hybrid RSA + AES Encryption for secure messaging
* HTTPS-secured API communication
* Azure Blob Storage for secure document storage
* Secure API key management
* Role-Based Authorization
* Protected API endpoints

---

# 🛠 Technology Stack

## Frontend

* Next.js
* TypeScript
* React
* Tailwind CSS
* Shadcn UI

## Backend

* ASP.NET Core Web API
* Entity Framework Core
* C#

## Database

* Microsoft SQL Server

## AI & Cloud

* Azure AI Foundry
* Azure Blob Storage

## Authentication

* JWT
* OTP Authentication

## Development Tools

* Visual Studio
* Visual Studio Code
* SQL Server Management Studio
* Git
* GitHub
* GitHub Projects

---

# 🏗 System Architecture

```
                 +-------------------------+
                 |      Next.js Frontend   |
                 +-----------+-------------+
                             |
                        HTTPS + JWT
                             |
                 +-----------v-------------+
                 | ASP.NET Core Web API    |
                 +-----------+-------------+
                             |
        +--------------------+--------------------+
        |                    |                    |
        |                    |                    |
   SQL Server          Azure Blob Storage    Azure AI
   Database            Medical Reports       GPT Chatbot
```

---

# 📂 Project Structure

```
Sehat-Online
│
├── frontend/
├── src/
│   ├── APIServices/             # API communication with ASP.NET Core backend
│   │   ├── users/
│   │   ├── doctors/
│   │   ├── appointments/
│   │   ├── chatbot/
│   │   └── ...
│   │
│   ├── Interfaces/              # TypeScript interfaces, DTOs, and models
│   │
│   ├── Testing/                 # Test files and testing utilities
│   │
│   ├── app/                     # Next.js App Router
│   │   ├── login/
│   │   ├── signup/
│   │   ├── patient/
│   │   ├── doctor/
│   │   ├── dashboard/
│   │   ├── chatbot/
│   │   ├── appointments/
│   │   ├── profile/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── chatBotBackend/          # Chatbot API integration and Azure AI communication
│   │
│   ├── components/              # Reusable UI components
│   │   ├── ui/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Cards/
│   │   ├── Doctor/
│   │   ├── Patient/
│   │   ├── Appointment/
│   │   ├── Chat/
│   │   ├── Forms/
│   │   └── Shared/
│   │
│   ├── hooks/                   # Custom React hooks
│   │
│   ├── lib/                     # Utility functions, constants, helpers, configurations
│   │
│   ├── pages/
│   │   └── api/                 # Next.js API routes
│   │
│   └── styles/                  # Global styles and Tailwind customizations
│
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Data/
│   └── Program.cs
│
│
├── documentation/
│
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure the following are installed:

* Next.js (Latest LTS)
* .NET SDK 8.0 (or the version used in the project)
* Microsoft SQL Server
* Git
* Visual Studio / Visual Studio Code

---

## Clone the Repository
For Backend Repository:
```bash
git clone https://github.com/Fatima-Raees/SehatOnlineBackend

cd sehat-online
```
For Frontend Repository:
```bash
git clone https://github.com/Fatima-Raees/SehatOnlineFrontend
```


## Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Restore dependencies.

```bash
dotnet restore
```

Update the database connection string in:

```
appsettings.json
```

Run database migrations.

```bash
dotnet ef database update
```

Start the backend.

```bash
dotnet run
```

---

## Frontend Setup

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# ⚙ Environment Variables

Create an `.env.local` file inside the frontend project.

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CHATBOT_URL=
```

Backend configuration (`appsettings.json`):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  },
  "Jwt": {
    "Key": "",
    "Issuer": "",
    "Audience": ""
  },
  "Azure": {
    "StorageConnectionString": "",
    "ContainerName": ""
  }
}
```

> **Note:** Never commit secrets, API keys, connection strings, or credentials to the repository. Use environment variables or secure configuration management instead.

---

# 📸 Screenshots

Add screenshots of:

* Landing Page
* Login
* Patient Dashboard
* Doctor Dashboard
* Appointment Booking
* Doctor Search
* AI Chatbot
* Chat System
* Medical Reports
* Profile Management

---

# 👥 Team

This project was developed collaboratively by:

* **Fatima Raees**
* **Noor-ul-Huda**
* **Bisma Fajar**
* **Noman Ahmad**

---

# 📈 Project Highlights

* Secure Telemedicine Platform
* AI-powered Healthcare Assistant
* End-to-End Secure Communication
* Cloud-based Medical Report Storage
* Modern Full-Stack Architecture
* RESTful API Design
* Responsive User Interface
* Agile Software Development
* GitHub Project Management
* Scalable and Modular Codebase

---

# 🔮 Future Enhancements

* Video consultation
* E-prescription support
* Online payments
* AI-assisted disease prediction
* Wearable device integration
* Push notifications
* Mobile application enhancements
* Electronic Health Record (EHR) interoperability

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome. Please fork the repository, create a feature branch, and submit a pull request after ensuring your changes are well-tested and documented.

---


# ⭐ Acknowledgements

We extend our gratitude to our supervisors, instructors, and team members for their guidance and collaboration throughout the development of Sehat Online.

