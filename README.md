# nodeJs_backendProject
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
    git clone https://github.com/yourusername/business-cards-api.git
    cd business-cards-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```env
    PORT=3000
    JWT_SECRET="your_jwt_secret"
    JWT_EXPIRES_IN="60m"
    MONGODB_URI_DEV="mongodb://localhost:27017/bcards_dev"
    MONGODB_URI_PROD="mongodb://localhost:27017/bcards_prod"
    ```

4. Replace `your_jwt_secret` with your actual JWT secret.

## Running the Application

1. Start the MongoDB server (if it is not already running):
    ```sh
    mongod
    ```

2. Start the Node.js server:
    ```sh
    npm run dev
    ```

   This will start the server in development mode using `nodemon`. The server will listen for requests on `http://127.0.0.1:3000`.

## API Endpoints

### Users

- **Register a new user**
    ```sh
    POST /api/users/register
    ```

    **Request Body:**
    ```json
    {
        "name": {
            "first": "John",
            "last": "Doe"
        },
        "phone": "1234567890",
        "email": "john.doe@example.com",
        "password": "yourpassword",
        "isAdmin": false,
        "isBusiness": false
    }
    ```

- **Login a user**
    ```sh
    POST /api/users/login
    ```

    **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "yourpassword"
    }
    ```

- **Get all users (Admin only)**
    ```sh
    GET /api/users
    ```

- **Get user by ID**
    ```sh
    GET /api/users/:id
    ```

- **Delete user**
    ```sh
    DELETE /api/users/:id
    ```

- **Update user**
    ```sh
    PUT /api/users/:id
    ```

- **Toggle user business status**
    ```sh
    PATCH /api/users/:id/toggle-business
    ```

### Cards

- **Get all cards**
    ```sh
    GET /api/cards
    ```

- **Get card by ID**
    ```sh
    GET /api/cards/:id
    ```

- **Get cards by user ID**
    ```sh
    GET /api/cards/my-cards/:userId
    ```

- **Create a new card**
    ```sh
    POST /api/cards
    ```

    **Request Body:**
    ```json
    {
        "title": "Card Title",
        "subtitle": "Card Subtitle",
        "description": "Card Description",
        "phone": "1234567890",
        "email": "card@example.com",
        "web": "https://example.com",
        "image": {
            "url": "https://example.com/image.jpg",
            "alt": "Image Description"
        },
        "address": {
            "city": "City",
            "street": "Street",
            "number": 1
        }
    }
    ```

- **Delete a card**
    ```sh
    DELETE /api/cards/:id
    ```

- **Update a card**
    ```sh
    PUT /api/cards/:id
    ```

- **Like a card**
    ```sh
    PATCH /api/cards/:cardId/like
    ```

- **Update card business number (Admin only)**
    ```sh
    PATCH /api/cards/biz-number/:cardId
    ```

## Testing the API with Postman

1. Open Postman and create a new collection.
2. Add requests to the collection for each endpoint.
3. Set the appropriate HTTP method (GET, POST, PUT, DELETE, PATCH) and URL for each request.
4. For endpoints that require a request body, set the body type to `raw` and format as `JSON`.
5. For endpoints that require authentication, set the `Authorization` header to `Bearer <your_jwt_token>`.

### Example Requests

- **Register a new user:**
    - URL: `http://127.0.0.1:3000/api/users/register`
    - Method: POST
    - Body:
      ```json
      {
          "name": {
              "first": "John",
              "last": "Doe"
          },
          "phone": "1234567890",
          "email": "john.doe@example.com",
          "password": "yourpassword",
          "isAdmin": false,
          "isBusiness": false
      }
      ```

- **Login a user:**
    - URL: `http://127.0.0.1:3000/api/users/login`
    - Method: POST
    - Body:
      ```json
      {
          "email": "john.doe@example.com",
          "password": "yourpassword"
      }
      ```

- **Create a new card:**
    - URL: `http://127.0.0.1:3000/api/cards`
    - Method: POST
    - Authorization: Bearer <your_jwt_token>
    - Body:
      ```json
      {
          "title": "Card Title",
          "subtitle": "Card Subtitle",
          "description": "Card Description",
          "phone": "1234567890",
          "email": "card@example.com",
          "web": "https://example.com",
          "image": {
              "url": "https://example.com/image.jpg",
              "alt": "Image Description"
          },
          "address": {
              "city": "City",
              "street": "Street",
              "number": 1
          }
      }
      ```

## Contributing

Feel free to submit issues and pull requests for new features, bug fixes, or improvements.

## License

This project is licensed under the MIT License.


