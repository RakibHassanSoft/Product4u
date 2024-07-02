# Product Hunt Website

Welcome to our Product Hunt Website, a platform where users can discover and share tech products. This document serves as a guide to set up and understand our MERN stack application.
##Client side :

### Live Site URL
[P4U](https://effulgent-platypus-036e0d.netlify.app/)

### Features
- **Authentication:** User registration, login via email/password and Google Sign-in, with error handling.
- **Homepage:** Navbar with navigation links, banner/slider, featured products section, trending products section, and a responsive footer.
- **Product Details:** Private route displaying detailed information about each product, including upvote functionality, reporting, reviews, and posting reviews.
- **Products Page:** Displays all accepted products with search functionality, pagination, and card layout.
- **User Dashboard:** Private route featuring user profile, ability to subscribe to membership, and manage products.
- **Moderator Dashboard:** Private route to review product submissions, manage reported contents, and mark products as featured.
- **Admin Dashboard:** Private route for site statistics and user management (role assignment).
- **Additional Features:** Responsive design for mobile, tablet, and desktop views, 404 error page, JWT implementation for secure login, environment variable usage for sensitive data.

### Installation Instructions
1. Clone the repository
2. Navigate into the project directory:
3. Install dependencies
4. Create a `.env` file in the root directory and add the following environment variables:
5. Start the development server

6. Open your browser and navigate to `http://localhost:3000` to view the application.

### Technologies Used
- React.js
- Firebase Authentication
- React Router
- Axios
- React Tag Input
- Tanstack query
- Bootstrap (or your preferred CSS framework)


##Server side

Welcome to the backend API of our P4U Website. This API provides endpoints to manage user authentication, product submissions, moderation, and administrative tasks.

### Base URL
The base URL for all API endpoints is `http://localhost:3000`.

### Setup Instructions
1. Clone the repository
2. Navigate into the project directory
3. Install dependencies
4. Create a `.env` file in the root directory and add the following environment variables
5. Start the server:

### Live API URL
[P4U](https://my-project-server.onrender.com/)

### API Endpoints

#### Authentication
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Login a user.
- **POST /api/auth/logout:** Logout a user.
- **POST /api/auth/google-login:** Login via Google.

#### Products
- **GET /api/products:** Fetch all products.
- **POST /api/products/submit:** Submit a new product.
- **GET /api/products/:id:** Fetch product details.
- **POST /api/products/:id/upvote:** Upvote a product.
- **POST /api/products/:id/report:** Report a product.

#### Reviews
- **POST /api/reviews/:id:** Post a review for a product.

#### Users
- **GET /api/users:** Fetch all users.
- **PATCH /api/users/:id/make-moderator:** Make a user a moderator.
- **PATCH /api/users/:id/make-admin:** Make a user an admin.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

### Dependencies Used
- **cors:** ^2.8.5
- **dotenv:** ^16.4.5
- **express:** ^4.19.2
- **jsonwebtoken:** ^9.0.2
- **mongodb:** ^6.7.0
- **nodemon:** ^3.1.2
- **stripe:** ^15.10.0
### Credits
- This API was developed by MD Rakibul Islam
