import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import router from "./app/routes";

const app: Application = express();


app.use(express.json());
app.use(
    cors({
        credentials: true,
    }),
)
app.use(cookieParser())

// application routes
app.use('/api/v1', router)

// welcome route
app.get('/', (req: Request, res: Response) => {
    res.json({
        "message": "Welcome to employee managemenet Server"
    })
})


//not Found
app.use(notFound)

export default app;
