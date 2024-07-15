# Business Cards API

This project is an API for managing business cards, allowing users to create, read, update, and delete business cards. The API is built using Node.js, Express, and MongoDB. Additionally, the project supports user authentication with JWT.

## Features

- User registration and login with JWT
- CRUD operations for business cards
- Role-based access control
- Business card search and like functionality

## Prerequisites

- Node.js (>= 14.x)
- MongoDB (>= 4.x)
- Postman (for API testing)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Natalyrubin/nodeJs_backendProject.git
    cd nodeJs_backendProject
    ```

2. Initialize npm:
    ```sh
    npm init -y
    ```

3. Install dependencies:
    ```sh
    npm install
    npm install bcryptjs
    npm install dotenv
    ```

4. Install nodemon globally to run the server with automatic restarts:
    ```sh
    npm install -g nodemon
    ```

5. Create a `.env` file in the root directory with the following content:
    ```env
    PORT=3000
    JWT_SECRET="your_jwt_secret"
    JWT_EXPIRES_IN="60m"
    MONGODB_URI_DEV="mongodb://localhost:27017/bcards_dev"
    MONGODB_URI_PROD="mongodb://localhost:27017/bcards_prod"
    ```

6. Replace `your_jwt_secret` with your actual JWT secret.

## Running the Application

1. Start the MongoDB server (if it is not already running):
    ```sh
    mongod
    ```

2. Seed the database with initial data:
    ```sh
    node seed.js
    ```

3. Start the Node.js server:
    ```sh
    nodemon
    ```

   This will start the server in development mode using `nodemon`. The server will listen for requests on `http://127.0.0.1:3000`.

## API Endpoints
API endpoints can be found in the `routes` directory: users in `usersRoutes` and cards in `cardsRoutes`. The relevant schemas are defined in the `models` directory.



## Testing the API with Postman

1. Open Postman and create a new collection.
2. Add requests to the collection for each endpoint.
3. Set the appropriate HTTP method (GET, POST, PUT, DELETE, PATCH) and URL for each request.
4. For endpoints that require a request body, set the body type to `raw` and format as `JSON`.
5. For endpoints that require authentication, set the `x-auth-token` header to `Bearer <your_jwt_token>`.



Have a fun :)
