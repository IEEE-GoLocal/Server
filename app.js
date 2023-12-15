import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from "cors";
export const app= express();

dotenv.config();

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"] }));

app.get("/", (req, res) => {
    res.send("Nice Working");
})