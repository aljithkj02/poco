import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import connectDb from './Config/db.js';
import postsRouter from './Routes/postRouter.js';
import userRouter from './Routes/userRouter.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Poco Server!'
    })
})

app.use('/api/user', userRouter);
app.use('/api/posts', postsRouter);

const startServer = () => {
    app.listen(process.env.PORT, async () => {
        console.log("Server started on port " + process.env.PORT);
        await connectDb();
    })
}
startServer();