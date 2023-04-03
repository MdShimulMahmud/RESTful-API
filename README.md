# Node.js CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) RESTful API built using Node.js and Express.js. The API allows users to manage orders and products, as well as perform user authentication and authorization.

## Features

- User can create an account and log in
- User can create, read, update, and delete orders and products via RESTful API
- User can upload files (images, documents, etc.) using Multer
- Secure user authentication and password hashing using bcrypt
- Uses Mongoose for MongoDB integration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- bcrypt
- jsonwebtoken

## Installation

1. Clone the repository:

```
git clone https://github.com/MdShimulMahmud/RESTful-API.git

```

2. Install dependencies:

```
    cd RESTful-API
    npm install

```

3. Create a `.env` file and add your MongoDB Atlas connection string and session secret:

```
    MONGO_PASSWORD=<your-mongodb-atlas-uri>
    JWT_KEY=<your-secret-key>
```

4. Start the application:

```
    npm start

```

## API Endpoints

### Authentication

- `POST /api/users/signup`: Creates a new user account. Expects a JSON body with `email` and `password` fields.
- `POST /api/users/login`: Authenticates a user. Expects a JSON body with `email` and `password` fields.

### Products

- `GET /api/products`: Returns a list of all products.
- `GET /api/products/:id`: Returns the product with the specified ID.
- `POST /api/products`: Creates a new product. Expects a JSON body with `name`, `price`, and `file` fields (for file upload).
- `PUT /api/products/:id`: Updates the product with the specified ID. Expects a JSON body with `name` and `price` fields (for non-file updates).
- `DELETE /api/products/:id`: Deletes the product with the specified ID.

### Orders

- `GET /api/orders`: Returns a list of all orders.
- `GET /api/orders/:id`: Returns the order with the specified ID.
- `POST /api/orders`: Creates a new order. Expects a JSON body with `productId` and `quantity` fields.
- `PUT /api/orders/:id`: Updates the order with the specified ID. Expects a JSON body with `productId` and `quantity` fields.
- `DELETE /api/orders/:id`: Deletes the order with the specified ID.

## File Uploads

To upload files, send a `multipart/form-data` request with a `file` field containing the file to be uploaded.

## Security

This API uses bcrypt for password hashing and verification to ensure secure authentication. Please make sure to set a strong JWT_KEY in your `.env` file to further enhance security.
