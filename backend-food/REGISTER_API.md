# Register API - Fixed

## Issue Found & Resolved
**Error**: 505 Server Error when calling register API
**Cause**: Typo in `controllers/userController.js` line 51 — `erro` instead of `error`
**Fix**: Changed to `error.message` to return proper error details

## What Was Fixed
1. **userController.js**: Fixed typo `erro` → `error.message`
2. **.env**: Added `JWT_SECRET` environment variable needed for token creation

## Test Register API

### 1. Start the server
```bash
cd backend-food
npm run server
```

Expected output:
```
✓ MongoDB connected successfully
✓ Database connection initialized
✓ Server running on http://localhost:4000
```

### 2. Test Register via curl
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Expected Success Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Test Cases

**Valid Registration**:
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@test.com",
    "password": "securePass123"
  }'
```
✅ Returns: `{"success": true, "token": "..."}`

**Duplicate Email**:
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@test.com",
    "password": "differentPass"
  }'
```
❌ Returns: `{"success": false, "message": "User already exist"}`

**Invalid Email**:
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob",
    "email": "not-an-email",
    "password": "password123"
  }'
```
❌ Returns: `{"success": false, "message": "Please enter a valid email"}`

**Weak Password** (less than 8 chars):
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie",
    "email": "charlie@test.com",
    "password": "pass"
  }'
```
❌ Returns: `{"success": false, "message": "Please enter strong password"}`

## Security Notes
- Change `JWT_SECRET` in `.env` to a strong random string in production
- Never commit `.env` file to git (it's in `.gitignore`)
- Passwords are hashed using bcrypt with salt factor 10
- Email validation is done with the `validator` library

## Next Steps
1. Implement `loginUser` function (currently empty)
2. Add JWT token verification middleware for protected routes
3. Test on frontend Admin panel
