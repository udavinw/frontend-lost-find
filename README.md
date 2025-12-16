# Lost & Found - Frontend

This is the frontend client for the Lost & Found application, built with React, Vite, and TailwindCSS. It provides the user interface for reporting and searching for lost pets.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router DOM
- **Utilities:** Lucide React (Icons), Framer Motion (Animations), QRCode

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the frontend directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Update the environment variables in `.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

## Running the Application

### Development Server
To start the development server with hot reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
To create a production build:
```bash
npm run build
```

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

### Linting
To run the linter:
```bash
npm run lint
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `pages/` - Application pages/routes
  - `context/` - React context for state management
  - `hooks/` - Custom React hooks
  - `assets/` - Static assets
