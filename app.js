import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRouter from './routes/user.js'
import shopKeeperRouter from './routes/shopKeeper.js'
import productRouter from './routes/product.js'
import chatsRouter from './routes/chats.js'
import shopRouter from './routes/shop.js'
import { Server } from 'socket.io';
import { createServer } from 'node:http';
export const app = express();
export const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"] }));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/shopKeepers", shopKeeperRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/chats", chatsRouter);
app.use("/api/v1/shops", shopRouter);
app.get("/", (req, res) => {
    res.send("Nice Working");
})


