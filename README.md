# poco

It is a full stack app consist of Node.js based backend API with JWT authentication, using MongoDB as the database. The frontend is developed using React and Axios to make API calls to the backend. The system allows users to sign up using email and password, which is encrypted before being stored in the database. Once signed up, users can log in with their credentials and receive a JWT token and a refresh token. The JWT token is used to authenticate the user for all protected routes, while the refresh token can be used to obtain a new JWT token once it expires.
