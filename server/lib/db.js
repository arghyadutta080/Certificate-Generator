import mongoose from "mongoose"

const connectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'certificate-management'
        })
        console.log("DB connected")
    } catch (error) { 
        console.log(error);
        setTimeout(() => {
            connectDB();
        }, 3000);
    }
}

export { connectDB }