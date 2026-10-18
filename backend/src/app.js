import e from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";




const app=e()

dotenv.config();

//middlewares

app.use(e.json());
app.use(morgan('dev'));


export default app;

