# REST API Specifications

**Base URL:** `http://localhost:5000/api/v1`

## 1. Health Check
- **Method:** GET
- **Endpoint:** `/health`
- **Auth:** Tidak perlu
- **Response 200:** `{ "success": true, "message": "Server is running" }`

## 2. Register
- **Method:** POST
- **Endpoint:** `/auth/register`
- **Request Body:**
```json
{ "email": "user@example.com", "password": "password123", "fullName": "John Doe" }

- **Response 201:** `{ "success": true, "message": "Registrasi berhasil", "data": {...} }`
- **Response 400:** Field kosong, password < 8 karakter, email tidak valid
- **Response 409:** Email sudah terdaftar

## 3. Login
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Request Body:** `{ "email": "user@example.com", "password": "password123" }`
- **Response 200:**
```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "email": "...", "role": "user" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}

Response 401: Email atau password salah

4. Refresh Token
Method: POST

Endpoint: /auth/refresh

Request Body: { "refreshToken": "..." }

Response 200: { "success": true, "data": { "accessToken": "..." } }

5. Logout
Method: POST

Endpoint: /auth/logout

Request Body: { "refreshToken": "..." }

Response 200: { "success": true, "message": "Logout berhasil" }

6. Get Current User
Method: GET

Endpoint: /auth/me

Auth: Bearer Token

Response 200: { "success": true, "data": { "id": 1, "email": "...", "role": "user" } }