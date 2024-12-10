# Knowledge Test Project

A full-stack application with authentication and CRUD functionality.

## Project Structure
```
project_test/
├── backend/         # Node.js + Express backend
├── frontend/        # Next.js frontend
├── API.md          # API documentation
└── README.md       # This file
```

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize
- TypeScript

### Frontend
- Next.js
- Redux Toolkit
- TypeScript
- Tailwind CSS

## Installation & Setup

### Prerequisites
- Node.js
- PostgreSQL
- npm/yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Environment Variables

### Backend Configuration
```env
PORT=3001                      # Server port (default: 3001)
DATABASE_URL=                  # PostgreSQL connection string
JWT_SECRET=                    # Secret key for JWT
NODE_ENV=development          # Environment (development/production)
```

### Frontend Configuration
```env
NEXT_PUBLIC_API_URL=          # Backend API URL
```

