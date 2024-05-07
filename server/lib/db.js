import mongoose from "mongoose"
import asyncErrorHandler from "../middleware/asyncErrorHandler.js"

const connectDB = asyncErrorHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'certificate-management'
    })
    console.log("DB connected")
})

export { connectDB }