import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/user.js'
import shopKeeperRouter from './routes/shopKeeper.js'
export const app= express();


dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"] }));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/shopKeepers", shopKeeperRouter);

app.get("/", (req, res) => {
    res.send("Nice Working");
})