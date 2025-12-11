
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";

// app config
const app = express();
const port = 4000

// middleware
app.use(express.json()) // using this middleware, request is parsed between frontend and backend
app.use(cors()) // can access backend from frontend

//db connection
connectDB();

// api end-points
app.use("/api/food", foodRouter)
app.use(express.urlencoded({extended: true}));   // this will allow normal form-data
app.use("/images", express.static('uploads')); // by this we can it from anywhere, as http://localhost:4000/images/1765467931689mahadev-krishna.png

app.get("/", (req, res) => {
    res.send("Call from backend, Api working")
})

// run express
app.listen(port, () => {
    console.log(`server is running on port -> http://localhost:${port}`);
})

