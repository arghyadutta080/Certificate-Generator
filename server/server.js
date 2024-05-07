import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './lib/db.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoute.js';
import { certificateRoute } from './routes/certificateRoute.js';

const app = express();
dotenv.config()

app.get('/', (req, res) => {
    res.send("Let's get started");
})

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}))

connectDB();

// routing middlewares
app.use(userRouter); 
app.use(certificateRoute);

// error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})