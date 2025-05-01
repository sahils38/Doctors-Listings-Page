import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctor.route";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", doctorRoutes);


export default app;
