# .envExample

# This file contains environment variables that are used by the Business Cards API project.
# To use these variables, copy this file to a new file named '.env' and fill in the appropriate values.

# The port number on which the server will listen for requests.
PORT=3000

# Secret key used to sign JWT tokens for user authentication. This should be a long and random string.
JWT_SECRET="your_jwt_secret"

# The expiration time for JWT tokens. This can be set in seconds (e.g., "3600") or as a string describing a time span (e.g., "60m" for 60 minutes).
JWT_EXPIRES_IN="60m"

# The connection string for the MongoDB database to be used in development mode.
MONGODB_URI_DEV="mongodb://localhost:27017/bcards_dev"

# The connection string for the MongoDB database to be used in production mode.
MONGODB_URI_PROD="mongodb://localhost:27017/bcards_prod"
