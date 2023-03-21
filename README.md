# REST Blog API

- This is a simple blog API created with Node.js and Express.
- The API allows users to perform CRUD (create, read, update, delete) operations on blog posts and comments.
- It also includes JWT authentication with Passport.js.
- See the blog website with published posts built with Next.js: [Blog NextJS](https://github.com/luuu-xu/blog-nextjs).
- There is also a content management system too: [Blog CMS](https://github.com/luuu-xu/blog-cms).

## Getting Started
To get started with the API, follow these steps:

1. Clone the repository to your local machine.
2. Run npm install to install the project dependencies.
3. Rename .env.example file to .env and fill in the necessary environment variables.
4. Run npm start to start the server.

## API Endpoints
The API has the following endpoints:

### Blog Posts
- GET /posts: Get all blog posts.
- POST /posts: Create a new blog post.
- GET /posts/:postId: Get a specific blog post by ID.
- PUT /posts/:postId: Update a specific blog post by ID.
- DELETE /posts/:postId: Delete a specific blog post by ID.

### Comments
- GET /posts/:postId/comments: Get all comments for a specific blog post.
- POST /posts/:postId/comments: Create a new comment for a specific blog post.
- GET /posts/:postId/comments/:commentId: Get a specific comment for a specific blog post by ID.
- PUT /posts/:postId/comments/:commentId: Update a specific comment for a specific blog post by ID.
- DELETE /posts/:postId/comments/:commentId: Delete a specific comment for a specific blog post by ID.

### Authentication
- POST /login: Log in a user and return a JWT token.

## Dependencies
The following dependencies are used in this project:

- express: Web framework for Node.js
- mongoose: Object modeling tool for MongoDB
- dotenv: Loads environment variables from a .env file
- express validator: Runs back-end validation for form data
- luxon: Deal with timestamp
- passport: Authentication middleware for Node.js
- passport-jwt: Passport strategy for authenticating with JWT tokens
- jsonwebtoken: JSON Web Token implementation for Node.js

## Environment Variables
The following environment variables are used in this project:

- PORT: The port number to run the server on.
- MONGO_URL: The URI for the MongoDB database.
- JWT_SECRET: The secret key used to sign JWT tokens.
- ADMIN_USERNAME: The username of admin for authenticating with JWT.
- ADMIN_PASSWORD: The password of admin for authenticating with JWT.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.