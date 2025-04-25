# RizzCabs API Documentation

## User Registration Endpoint

### Endpoint: `/users/register`

#### Description

This endpoint allows new users to register for the RizzCabs application. It creates a new user account with the provided information, hashes the password for security, and returns the created user along with an authentication token.

#### HTTP Method

`POST`

#### Request Body

The request must include a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Required Fields

- `fullname.firstname` (String): User's first name (3-50 characters)
- `email` (String): User's email address (valid format, unique, 5-50 characters)
- `password` (String): User's password (8-100 characters)

#### Optional Fields

- `fullname.lastname` (String): User's last name (3-50 characters if provided)

#### Response

##### Success Response (201 Created)

```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_authentication_token"
}
```

##### Error Responses

###### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "value": "j",
      "msg": "First name should be atleast 3 chars long and max 50 chars",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

###### Server Error (500 Internal Server Error)

The server encountered an error while processing the request.

#### Notes

- The password is hashed using bcrypt before storing in the database.
- The response includes a JWT token for authenticated requests.
- Email addresses must be unique; registering with an existing email will result in an error.

#### Example Usage

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

## User Login Endpoint

### Endpoint: `/users/login`

#### Description

This endpoint allows existing users to log in to the RizzCabs application. It verifies the user's credentials and returns the user object along with an authentication token if successful.

#### HTTP Method

`POST`

#### Request Body

The request must include a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Required Fields

- `email` (String): User's email address (valid format, 5-50 characters)
- `password` (String): User's password (8-100 characters)

#### Response

##### Success Response (200 OK)

```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_authentication_token"
}
```

##### Error Responses

###### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "value": "invalid-email",
      "msg": "invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

###### Authentication Error (401 Unauthorized)

```json
{
  "message": "invalid email or password"
}
```

###### Server Error (500 Internal Server Error)

The server encountered an error while processing the request.

#### Notes

- The password is compared securely using bcrypt.
- The response includes a JWT token for authenticated requests.
- If the email or password is incorrect, a 401 Unauthorized error is returned.

#### Example Usage

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

---

## User Profile Endpoint

### Endpoint: `/users/profile`

#### Description

Retrieves the authenticated user's profile information. Requires a valid JWT token (as a cookie or in the `Authorization` header). This endpoint is protected and requires authentication.

#### HTTP Method

`GET`

#### Authentication

- Requires a valid JWT token in the `rizzCabsToken` cookie or as a Bearer token in the `Authorization` header.

#### Response

##### Success Response (200 OK)

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": "optional_socket_id"
}
```

##### Error Responses

###### Unauthorized (401 Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

###### Server Error (500 Internal Server Error)

The server encountered an error while processing the request.

#### Notes

- The password field is never returned.
- If the token is missing, invalid, or blacklisted, a 401 Unauthorized error is returned.

#### Example Usage

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

## User Logout Endpoint

### Endpoint: `/users/logout`

#### Description

Logs out the authenticated user by blacklisting their JWT token and clearing the authentication cookie. This endpoint is protected and requires authentication.

#### HTTP Method

`GET`

#### Authentication

- Requires a valid JWT token in the `rizzCabsToken` cookie or as a Bearer token in the `Authorization` header.

#### Response

##### Success Response (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

##### Error Responses

###### Unauthorized (401 Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

###### Server Error (500 Internal Server Error)

The server encountered an error while processing the request.

#### Notes

- The JWT token is added to a blacklist and will be rejected for future requests.
- The `rizzCabsToken` cookie is cleared on logout.
- If the token is missing, invalid, or already blacklisted, a 401 Unauthorized error is returned.

#### Example Usage

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

```


```
