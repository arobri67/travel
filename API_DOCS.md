# Travel API Documentation

## Base URL

`/api/v1`

## Authentication

All routes except `/auth` require authentication. Include the JWT token in the Authorization header:

## Endpoints

### Authentication

#### Login

- **POST** `/auth`
- **Body**:
  - `email`: string
  - `password`: string
- **Response**: JWT access token and user ID

#### Refresh Token

- **GET** `/auth/refresh`
- **Response**: New JWT access token

#### Get Current User

- **GET** `/auth/me`
- **Response**: Current user data and access token

### Users

#### Get All Users

- **GET** `/users`
- **Response**: Array of user objects (excluding passwords)

#### Get User by ID

- **GET** `/users/:id`
- **Response**: User object (excluding password)

#### Get Favorite Listings

- **GET** `/users/favorites`
- **Response**: Array of favorite listing IDs

#### Add Favorite Listing

- **PATCH** `/users/favorites/add`
- **Body**:
  - `listingId`: string
- **Response**: Updated favorite listings array

#### Remove Favorite Listing

- **PATCH** `/users/favorites/remove`
- **Body**:
  - `listingId`: string
- **Response**: Updated favorite listings array

### Listings

#### Get All Listings

- **GET** `/listings`
- **Query Parameters**:
  - `guests`: number
  - `search`: string
  - `from`: date
  - `to`: date
- **Response**: Array of listing objects

#### Get Listing by ID

- **GET** `/listings/:id`
- **Response**: Listing object

## Endpoints

### Authentication

#### Login

- **POST** `/auth`
- **Body**:
  - `email`: string
  - `password`: string
- **Response**: JWT access token and user ID

#### Refresh Token

- **GET** `/auth/refresh`
- **Response**: New JWT access token

#### Get Current User

- **GET** `/auth/me`
- **Response**: Current user data and access token

### Users

#### Get All Users

- **GET** `/users`
- **Response**: Array of user objects (excluding passwords)

#### Get User by ID

- **GET** `/users/:id`
- **Response**: User object (excluding password)

#### Create New User

- **POST** `/users`
- **Body**:
  - `email`: string
  - `password`: string
  - `firstName`: string
  - `lastName`: string
  - `avatarUrl`: string (optional)
- **Response**: Confirmation message

#### Update User

- **PATCH** `/users`
- **Body**: Fields to update
- **Response**: Updated user object

#### Delete User

- **DELETE** `/users`
- **Response**: Confirmation message

#### Get Favorite Listings

- **GET** `/users/favorites`
- **Response**: Array of favorite listing IDs

#### Add Favorite Listing

- **PATCH** `/users/favorites/add`
- **Body**:
  - `listingId`: string
- **Response**: Updated favorite listings array

#### Remove Favorite Listing

- **PATCH** `/users/favorites/remove`
- **Body**:
  - `listingId`: string
- **Response**: Updated favorite listings array

### Listings

#### Get All Listings

- **GET** `/listings`
- **Query Parameters**:
  - `guests`: number
  - `search`: string
  - `from`: date
  - `to`: date
- **Response**: Array of listing objects

#### Get Listing by ID

- **GET** `/listings/:id`
- **Response**: Listing object

## Models

### User
