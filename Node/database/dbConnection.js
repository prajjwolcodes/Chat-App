import mongoose from "mongoose";

async function dbConnection() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected");
}

export default dbConnection