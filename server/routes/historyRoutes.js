import express from "express";
import { getAllHistory } from "../controllers/historyController.js";

const router = express.Router();
router.get("/", getAllHistory);
export default router;
