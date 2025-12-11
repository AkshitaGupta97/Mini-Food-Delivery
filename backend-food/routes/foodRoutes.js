// Express router for food-related endpoints
import express from "express"
import { addFood, listFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router(); // creates a modular router instance

/*
  Multer storage configuration:
  - destination: folder where uploaded files will be stored (relative to project root)
  - filename: function to determine the saved filename with timestamp + original filename
*/
const storage = multer.diskStorage({
    destination: "uploads",  // uploads - folder where file is saved
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

// Creates an upload handler using the storage rules defined above
const upload = multer({ storage: storage }) 

foodRouter.post("/add", upload.single("image"), addFood);

foodRouter.get("/list", listFood)

// Export the router so it can be mounted in the main app (for example: app.use('/api/food', foodRouter))
export default foodRouter;

/*
  Routes
  - POST /add : expects a multipart/form-data request with a single file field named "image"
    The `upload.single("image")` middleware parses the file and attaches `req.file`.
    The `addFood` controller should read `req.body` for other fields (name, price, category)
    and `req.file` for the uploaded image path/filename.
*/