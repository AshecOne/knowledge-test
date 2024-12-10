# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

### Register
Register a new user account.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "gender": "male" | "female"
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "gender": "string"
  }
}
```

### Login
Login to get access token.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "gender": "string"
  },
  "token": "string"
}
```

### Get Profile
Get user profile information.

- **URL**: `/auth/profile`
- **Method**: `GET`
- **Headers**: 
  - Authorization: Bearer {token}
- **Response**:
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "gender": "string"
}
```

### Update Profile
Update user profile information.

- **URL**: `/auth/profile`
- **Method**: `PUT`
- **Headers**: 
  - Authorization: Bearer {token}
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "gender": "male" | "female"
}
```
- **Response**:
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "gender": "string"
  }
}
```

## Products

### Get All Products
Get all products for authenticated user.

- **URL**: `/products`
- **Method**: `GET`
- **Headers**: 
  - Authorization: Bearer {token}
- **Response**:
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "price": "number",
    "image": "string",
    "userId": "number"
  }
]
```

### Create Product
Create a new product.

- **URL**: `/products`
- **Method**: `POST`
- **Headers**: 
  - Authorization: Bearer {token}
- **Request Body** (multipart/form-data):
  - name: string
  - description: string
  - price: number
  - image: file (optional)
- **Response**:
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "number",
    "name": "string",
    "description": "string",
    "price": "number",
    "image": "string",
    "userId": "number"
  }
}
```

### Update Product
Update existing product.

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Headers**: 
  - Authorization: Bearer {token}
- **Request Body** (multipart/form-data):
  - name: string
  - description: string
  - price: number
  - image: file (optional)
- **Response**:
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "number",
    "name": "string",
    "description": "string",
    "price": "number",
    "image": "string",
    "userId": "number"
  }
}
```

### Delete Product
Delete existing product.

- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Headers**: 
  - Authorization: Bearer {token}
- **Response**:
```json
{
  "message": "Product deleted successfully"
}
```