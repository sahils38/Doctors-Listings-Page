import express from "express";
import { addDoctor, listDoctors } from "../controllers/doctor.controller";

const router = express.Router();

// POST /api/doctors
router.post("/doctors", addDoctor); // Changed from "/doctors" to "/" since this is likely in a doctors router
router.get("/doctors", listDoctors);
export default router;