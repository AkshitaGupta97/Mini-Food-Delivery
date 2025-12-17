// Express router for food-related endpoints
import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router(); // creates a modular router instance

//- Multer is a middleware for handling multipart/form-data (used for file uploads). - diskStorage lets you control where and how files are stored on disk

const storage = multer.diskStorage({
    destination: "uploads",  // uploads - folder where file is saved
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)  //  adds a unique timestamp to avoid overwriting files with the same name. keeps the original file name. as 124455667cat.png
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