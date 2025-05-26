# MERN Todo Application

## Setup Instructions

1. Clone the repository
2. Create .env file in backend directory with:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

3. Install Backend Dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install Frontend Dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start Backend Server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start Frontend Development Server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Application

1. Register a new user at http://localhost:3000/register
2. Login with your credentials
3. Start creating and managing your todos!
