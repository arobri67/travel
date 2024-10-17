# Travel - A Full-Stack Accommodation Booking Application

Travel is a modern, full-stack web application designed to showcase accommodation listings and facilitate bookings. This personal project demonstrates the application of advanced web development concepts and best practices learned during a bootcamp.

## Key Features

- User authentication and authorization
- Listing browsing with detailed views
- Search and filter functionality for accommodations
- Favorite listing management
- Responsive design for various device sizes

## Technology Stack

### Frontend

- React.js for building the user interface
- Tailwind CSS for styling and responsive design
- Zustand for state management
- Axios for API requests
- React Router for navigation

### Backend

- Express.js as the server framework
- MongoDB for database management
- Mongoose as the ODM (Object Document Mapper)
- JSON Web Tokens (JWT) for authentication

## Project Highlights

1. **React Best Practices**: Implements modern React patterns and hooks to optimize performance and maintainability.

2. **State Management**: Utilizes Zustand for efficient and persistent state management across the application.

3. **API Integration**: Employs Axios for seamless communication between the frontend and backend, with proper error handling and request/response interceptors.

4. **Authentication**: Features a robust authentication system using JWT with refresh token mechanism for enhanced security.

5. **Responsive Design**: Utilizes Tailwind CSS to create a responsive and visually appealing user interface.

6. **Code Organization**: Demonstrates clean code structure with separation of concerns and modular components.

7. **Performance Optimization**: Implements techniques to avoid unnecessary re-renders and optimize data fetching.

This project serves as a practical application of full-stack development skills, showcasing the ability to create a functional and user-friendly web application using modern web technologies.

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd web && npm install
   cd ../api && npm install
   ```
3. Set up environment variables (see below)
4. Start the development servers:
   ```
   cd web && npm run dev
   cd ../api && npm run dev
   ```

## Environment Variables

Create a `.env` file in the `api` directory with the following variables:

- `PROD`: true or false (if true, the app will use the production database)
- `MONGO_DB_URL`: Url of the MongoDB database
- `JWT_TOKEN_SECRET`: Secret key for JWT
- `FRONTEND_URL`: Url of the frontend application

Create a `.env` file in the `web` directory with the following variables:

- `VITE_DB_BASE_URL`: Url of the backend server

## API Documentation

The main API endpoints include:

- `GET /api/v1/listings`: Get all listings
- `GET /api/v1/listings/:id`: Get a specific listing
- `POST /api/v1/auth`: User authentication

For full API documentation, please refer to [API_DOCS.md](API_DOCS.md)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
