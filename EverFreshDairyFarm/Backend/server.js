import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import userRouter from "./routes/InventoryUserRoute.js";
import inventoryRouter from "./routes/InventoryRoute.js";
import vetuserRouter from "./routes/vetuserRoute.js";
import Cowregister from "./routes/cowregisterRoutes.js";
import CheckupRouter from "./routes/checkupRoute.js";
import GrassingSessionRouter from "./routes/GrassingSessionRoute.js";
import alertRoutes from "./routes/alertRoutes.js";
const app = express();
const port = process.env.PORT || 8000
connectDB();
const allowedOrigins = ['http://localhost:5173']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))
app.get('/',(req,res)=>res.send("API Working"));
app.use('/inventoryManager',userRouter);
app.use('/inventory',inventoryRouter);
app.use('/veterinarySurgeon',vetuserRouter);
app.use('/vetCowRegister',Cowregister);
app.use('/vetCheckups',CheckupRouter);
app.use('/Grassing',GrassingSessionRouter);
app.use('/alerts',alertRoutes);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));