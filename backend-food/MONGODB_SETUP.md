# MongoDB Setup & Data Not Saving - Solution

## Critical Issues Fixed

### 1. **Server Started Before DB Connected**
- ❌ Old code: `connectDB()` called without `await` → server started immediately without waiting
- ✅ Fixed: Now uses `await connectDB()` → waits for MongoDB connection before starting server

### 2. **Middleware Order Was Wrong**
- ❌ Old: `express.urlencoded()` added AFTER routes → form data wasn't parsed
- ✅ Fixed: All middleware now added BEFORE routes in correct order

### 3. **DB Connection Could Silently Fail**
- ❌ Old: Errors caught but ignored → server continued without DB
- ✅ Fixed: Now throws error → server won't start if DB connection fails

## How to Set Up & Test

### Step 1: Start MongoDB

**Option A: Local MongoDB (Recommended for development)**
```bash
# Windows - if MongoDB is installed:
mongod

# Or if you have MongoDB installed but not in PATH:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster0.xxx.mongodb.net/food-delivery`)
5. Create `.env` file in `backend-food/`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/food-delivery
   ```

### Step 2: Verify MongoDB is Running
```bash
cd backend-food
node test-mongo.js
```

Expected output:
```
Attempting to connect to MongoDB at: mongodb://localhost:27017/food-delivery
Connected OK
```

### Step 3: Start the Backend Server
```bash
cd backend-food
npm install
npm run server
```

Expected output:
```
🔄 Connecting to MongoDB: mongodb://localhost:27017/food-delivery
✓ MongoDB connected successfully
✓ Database connection initialized
✓ Server running on http://localhost:4000
```

### Step 4: Test Adding Data

**Via curl** (test image file first):
```bash
# First, add a test image to uploads/ folder
# Then test the endpoint:
curl -X POST http://localhost:4000/api/food/add \
  -F "name=Burger" \
  -F "description=Tasty burger" \
  -F "price=5" \
  -F "category=Sandwich" \
  -F "image=@uploads/test.jpg"
```

**Via Admin Panel**:
1. Go to Admin Panel (http://localhost:5173 or wherever it's running)
2. Go to "Add Items"
3. Upload an image
4. Fill in: Name, Description, Price, Category
5. Click "ADD"
6. Should see success message

### Step 5: Verify Data Was Saved
```bash
# In your terminal:
curl http://localhost:4000/api/food/list

# Or open in browser:
# http://localhost:4000/api/food/list
```

Expected output (JSON):
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Burger",
      "description": "Tasty burger",
      "price": 5,
      "category": "Sandwich",
      "image": "1765467931689test.jpg"
    }
  ]
}
```

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "MongoDB connection failed: connect ECONNREFUSED" | Local MongoDB not running | Run `mongod` in a separate terminal |
| "bad auth" or "authentication failed" | Wrong credentials in MONGO_URI | Check username/password, URL-encode special chars |
| "Server exits with code 1" | DB connection failed | Check console logs for exact error |
| Data saved to DB but not appearing in `/list` | Query error | Check collection name (should be "food") |
| Cannot upload image | Multer issue | Ensure `uploads/` folder exists and has write permissions |

## Verify Everything is Working

Run this quick test:
```bash
# Terminal 1
cd backend-food && npm run server

# Terminal 2
# Wait for "✓ Server running..." message, then:
curl http://localhost:4000/api/food/list
```

If you see `{"success":true,"data":[]}` → Database is connected! ✅

If you see an error → Check the server console for the error message and let me know.
