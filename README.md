Library Management System: 
A backend application built with Express.js following a 3-layered architecture (Controller, Service, Repository). Implements DTOs, Clean Code principles, Dependency Injection, Repository Pattern, Rate Limiting, Swagger API Docs, and Report generation (CSV/Excel files).

Note That: The Code in development branch

Features

Books & Borrowers & Borrowing & Reports System & Rate Limiting

File-based Reports (CSV/Excel)

API Documentation with Swagger

Rate Limiting for API Protection

Tech Stack :
Node.js / Express.js
PostgreSQL (with TypeORM)
Swagger for API Docs

CSV/Excel File Exports

Clean Code + SOLID Principles

⚙️ Setup & Installation
# 1. Clone repository
git clone https://github.com/AndrewAyman7/Fun-Tasks.git

# 2. Install dependencies
npm install

# 3. Setup environment variables
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=bookstore


# 5. Start application
npm run build
npm run dev

API Documentation :
http://localhost:3000/api-docs

Note That: The Code in development branch


📄 Reports

Generate borrow history reports in CSV/Excel format.
