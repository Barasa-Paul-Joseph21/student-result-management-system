# Student Result Management System 🎓

A modern, full-stack web application designed to seamlessly manage student records, grades, and marks. It features a responsive React dashboard on the frontend and a robust Spring Boot REST API driving the backend, integrated with an embedded H2 database.

## 🚀 What the Project Does

This system serves as a digital classroom directory for teachers or administrators. It allows users to:
* **View** a clean, tabular dashboard of all enrolled students, complete with their current courses and performance metrics.
* **Add new students** by inputting their names, respective courses, and marks achieved (0-100).
* **Auto-Calculate Grades:** The system removes the guesswork. Whenever a mark is entered or updated, the backend engine automatically determines and assigns the correct letter grade (`A`, `B`, `C`, `D`, or `F`).
* **Manage Records:** Easily edit existing student details or securely delete records directly from the frontend dashboard. 

The frontend relies on **Tailwind CSS** to render a beautiful, responsive, and color-coded user interface, ensuring that high-performing students ("A" grades) are badged in green, while failing marks ("F") draw immediate attention in red.

---

## 🛠️ Technology Stack

**Frontend:**
* **React 19**
* **TypeScript**
* **Vite** (Build Tool)
* **Tailwind CSS v4** (Styling)

**Backend:**
* **Spring Boot 3** (Java 21)
* **Spring Data JPA / Hibernate**
* **REST APIs**
* **H2 Database** (File-based local database)

---

## ⚙️ Getting Started & Setup

Follow these steps to run the application locally on your machine.

### Prerequisites
You will need installed on your machine:
* **Java** (JDK 17 or 21)
* **Node.js** (v18+)
* **npm** (Node Package Manager)

### 1. Run the Backend (Spring Boot API)
The backend acts as the brain of the app, storing data and calculating the final grades. 

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd student-results-api
   ```
2. Start the Spring Boot server using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
 *(The API will now be running on `http://localhost:8080`. 5 sample students are automatically seeded into the database on your very first run!)*

### 2. Run the Frontend (React UI)
The frontend serves as the visual dashboard for the user.

1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd students-results-frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to: **`http://localhost:5173`**

---

## 🗄️ Accessing the Database (H2 Console)

This project uses an **H2 file-system database** to permanently store your student data locally without requiring complicated SQL installations like MySQL. 

To view or write raw SQL queries against your data:
1. Ensure your Spring Boot backend is currently running.
2. Visit **`http://localhost:8080/h2-console`** in your browser.
3. Fill out the login form exactly as follows:
   - **Driver Class:** `org.h2.Driver`
   - **JDBC URL:** `jdbc:h2:file:./data/studentdb` 
   - **User Name:** `sa`
   - **Password:** *(Leave this completely blank)*
4. Click **Connect**. You can now view the `STUDENTS` table on the left-hand sidebar!

---

## 📁 Project Structure

```
STUDENT-JAVA/
│
├── student-results-api/          # Backend (Spring Boot + Java)
│   ├── src/main/java/            # Controllers, Services, Models, Repositories
│   ├── src/main/resources/       # application.properties and data.sql seeds
│   └── pom.xml                   # Maven Dependencies
│
└── students-results-frontend/    # Frontend (React + Vite + Tailwind)
    ├── src/components/           # Reusable UI parts (Modals, Tables)
    ├── src/App.tsx               # Main Dashboard View and App State
    ├── src/api.ts                # All fetch logic communicating with Backend
    └── package.json              # Node Dependencies
```
