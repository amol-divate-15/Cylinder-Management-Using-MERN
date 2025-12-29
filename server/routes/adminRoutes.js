import express from "express";
import { createAdmin, adminLogin } from "../controllers/adminController.js";

const route = express.Router();

route.get("/create", createAdmin);
route.post("/login", adminLogin);

export default route;
