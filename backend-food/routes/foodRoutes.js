// Express router for food-related endpoints
import express from "express"
import { addFood } from "../controllers/foodController"
import multer from "multer"

const foodRouter = express.Router(); // creates a modular router instance

const storage = multer.diskStorage({
    destination: "uploads",  // uploads - folder where file is saved
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
//Creates an upload handler using the storage rules defined above
const upload = multer({ storage: storage }) 
// file field name must be image
foodRouter.post("/add", upload.single("image"), addFood); //Controller function that processes the rest of the request (e.g., saving food details to a database).

// Export the router so it can be mounted in the main app (for example: app.use('/api/food', foodRouter))
export default foodRouter;

/*
   Multer storage configuration:
   - destination: folder where uploaded files will be stored (relative to project root)
   - filename: function to determine the saved filename. Using a timestamp + original
    filename helps avoid collisions and makes filenames roughly unique.
*/
/*
   Routes
   - POST /add : expects a multipart/form-data request with a single file field named "image"
     The `upload.single("image")` middleware parses the file and attaches `req.file`.
     The `addFood` controller should read `req.body` for other fields (name, price, category)
     and `req.file` for the uploaded image path/filename.
*/

/* multer 
// A middleware factory function that returns Express middleware for parsing multipart/form-data requests (file uploads)
 Configuration object that tells multer where and how to save uploaded files
 References the storage engine defined earlier in your file (the diskStorage configuration with the destination and filename callbacks)

 const upload = multer({ storage: storage }) 
    When you use upload.single("image") in your route, this middleware:
    Intercepts the incoming request
    Extracts the file from the "image" field
    Saves it to disk using your custom storage rules (filename with timestamp + original name)
    Attaches file metadata to req.file so your controller can access it
 */