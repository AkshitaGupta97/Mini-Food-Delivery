
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

// app config
const app = express();
const port = 4000

// middleware (order matters: json parsing before routes)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/images", express.static('uploads'))

// for user
app.use("/api/user", userRouter);

// api food endpoints
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("Call from backend, Api working")
})

// start server and connect to database
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();
        console.log("✓ Database connection initialized");
        
        // Then start the server
        app.listen(port, () => {
            console.log(`✓ Server running on http://localhost:${port}`);
        });
    } catch(error) {
        console.error("✗ Failed to start server:", error);
        process.exit(1);
    }
} 

startServer();

