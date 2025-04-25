


          
I've added professional documentation for the `/users/login` endpoint to your root `README.md` file, following the style of your existing `/users/register` docs. Here is the updated content:

```markdown:c:\Users\shams\OneDrive\Desktop\RizzCabs\README.md
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
- `fullname.firstname` (String): User's first name
  - Must be at least 3 characters long
  - Maximum 50 characters
- `email` (String): User's email address
  - Must be a valid email format
  - Must be unique in the system
  - Minimum 5 characters
  - Maximum 50 characters
- `password` (String): User's password
  - Must be at least 8 characters long
  - Maximum 100 characters

#### Optional Fields
- `fullname.lastname` (String): User's last name
  - Minimum 3 characters if provided
  - Maximum 50 characters

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
- The password is hashed using bcrypt before storing in the database
- The response includes a JWT token that should be used for authenticated requests
- Email addresses must be unique; attempting to register with an existing email will result in an error

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
- `email` (String): User's email address
  - Must be a valid email format
  - Minimum 5 characters
  - Maximum 50 characters
- `password` (String): User's password
  - Must be at least 8 characters long
  - Maximum 100 characters

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
- The password is compared securely using bcrypt
- The response includes a JWT token that should be used for authenticated requests
- If the email or password is incorrect, a 401 Unauthorized error is returned

#### Example Usage
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```
```

        