import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();


app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
)
app.use(cookieParser())



app.get('/', (req: Request, res: Response) => {
    res.json({
        "message": "Welcome to employee managemenet Server"
    })
})


//Not Found
app.use(notFound)

export default app;
