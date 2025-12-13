// Express router for food-related endpoints
import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router(); // creates a modular router instance

const storage = multer.diskStorage({
    destination: "uploads",  // uploads - folder where file is saved
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

// Creates an upload handler using the storage rules defined above
const upload = multer({ storage: storage }) 

// Add new food (multipart/form-data with `image` field)
foodRouter.post("/add", upload.single("image"), addFood);

// List all food items (for admin/frontend verification)
foodRouter.get("/list", listFood);

// Remove a food item by id; expects JSON body with `{ id: '<mongoId>' }`
foodRouter.delete("/remove", removeFood);

export default foodRouter;

/*
  Multer storage configuration:
  - destination: folder where uploaded files will be stored (relative to project root)
  - filename: function to determine the saved filename with timestamp + original filename
*/

/*
  Routes
  - POST /add : expects a multipart/form-data request with a single file field named "image"
    The `upload.single("image")` middleware parses the file and attaches `req.file`.
    The `addFood` controller should read `req.body` for other fields (name, price, category)
    and `req.file` for the uploaded image path/filename.
*/

// Export the router so it can be mounted in the main app (for example: app.use('/api/food', foodRouter))