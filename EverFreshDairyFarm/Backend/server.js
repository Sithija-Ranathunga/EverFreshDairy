import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import userRouter from "./routes/InventoryUserRoute.js";
import inventoryRouter from "./routes/InventoryRoute.js";
import GrassingSessionRouter from "./routes/GrassingSessionRoute.js";
import alertRoutes from "./routes/alertRoutes.js";
import MilkingUserRoute from "./routes/MilkingUserRoute.js";
import MilkingDataRoute from "./routes/MilkingDataRoute.js";
import MilkingSessionRoute from "./routes/MilkingSessionRoute.js";

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
app.use('/Grassing',GrassingSessionRouter);
app.use('/alerts',alertRoutes);
app.use('/milkingManager',MilkingUserRoute);
app.use('/milkingData' , MilkingDataRoute);
app.use('/milkingSession' , MilkingSessionRoute);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));