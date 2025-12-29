import express from "express";
import { getReports } from "../controllers/reportController.js";

const r = express.Router();
r.get("/", getReports);
export default r;
