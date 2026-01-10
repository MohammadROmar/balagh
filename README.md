# Balagh Dashboard

**Balagh** is a web-based administrative dashboard designed to receive, manage, and process citizens’ reports and complaints.  
The system is built with a clear **role-based access control model**, advanced reporting and statistics, and a strong focus on security, scalability, and usability.

---

## 🌐 Live Demo

- **Web Dashboard:** [balagh-app.vercel.app](https://balagh-app.vercel.app/)

---

## 🧩 Related Repositories

- **Backend (ASP.NET):** [waitwhat2231/Balagh](https://github.com/waitwhat2231/Balagh)

- **Mobile Application (Flutter):** [Mustafa-Sharaf/Balagh](https://github.com/Mustafa-Sharaf/Balagh)

---

## 🏗️ System Overview

Balagh platform consists of three main components:

1. **Web Dashboard (This Repository)** – Used by administrators and employees to manage complaints.
2. **Backend API (ASP.NET)** – Handles business logic, authentication, authorization, and data persistence.
3. **Mobile Application (Flutter)** – Used by citizens to submit complaints and track their status.

This repository contains the **frontend dashboard application** only.

---

## 👥 User Roles & Permissions

### Administrator

Administrators have full control over the system and can:

- View global statistics and analytical reports
- Analyze complaints based on:
  - Status
  - Government entity
  - Submission time
- Apply advanced filters to generate accurate reports
- Export statistics and reports as PDF files with all applied filters
- Register and manage employees
- View and manage all complaints regardless of government entity

---

### Employee

Employees can:

- View complaints assigned to them or available for assignment
- Perform allowed operations on complaints they are responsible for

---

## 📄 Complaint Management Workflow

- View full complaint details
- Receive (claim) a complaint if it is not already assigned
- Once assigned, the complaint becomes exclusively locked to that user
- Only the assigned user can:
  - Modify the complaint
  - Add internal notes
  - Request additional information from the citizen
- All users can view:
  - Original complaint data
  - Internal notes
  - Complete action and update history

---

## 🔐 Authentication & Authorization

- Secure authentication and authorization
- Role-based route protection
- Protected routes implemented using layouts and middleware
- Unauthorized access is fully restricted

---

## 🌍 Internationalization & Theming

- Multi-language support:
  - English
  - Arabic
- Theme modes:
  - Light mode
  - Dark mode

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Theming:** next-themes
- **UI Components:** react-select
- **Accessibility:** focus-trap-react
- **Notifications:** sonner

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Application runs on:

```
http://localhost:3000
```

---

## 📌 Notes

- Designed for real-world governmental complaint management
- Emphasizes security, scalability, and maintainability
- Suitable for production and academic use
  s
