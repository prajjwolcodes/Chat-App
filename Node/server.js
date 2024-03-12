import path from "path";
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dbConnection from "./database/dbConnection.js"
import cors from "cors"

const app = express()
const __dirname = path.resolve();
dotenv.config()
dbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "*"],
    credentials: true
}))

// Routes here
app.use("/api/auth", authRoutes)
app.use("/api", messageRoutes)
app.use("/api", userRoutes)

app.use(express.static(path.join(__dirname, "/React/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "React", "dist", "index.html"));
});

const PORT = process.env.PORT

app.listen(PORT, () => console.log("Running at port " + PORT))