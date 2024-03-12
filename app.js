import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/user.js'
import shopKeeperRouter from './routes/shopKeeper.js'
import productRouter from './routes/product.js'
import chatsRouter from './routes/chats.js'
export const app= express();

dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"] }));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/shopKeepers", shopKeeperRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/chats",chatsRouter);
app.get("/", (req, res) => {
    res.send("Nice Working");
})