import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import userRouter from "./routes/InventoryUserRoute.js";
import inventoryRouter from "./routes/InventoryRoute.js";

const app = express();
const port = process.env.PORT || 8000
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get('/',(req,res)=>res.send("API Working"));
app.use('/inventoryManager',userRouter);
app.use('/inventory',inventoryRouter);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));