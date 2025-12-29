import express from "express";
import { addDriver, getDrivers, assignOrder, markDelivered } from "../controllers/driverController.js";
import { deleteDriver } from "../controllers/driverController.js";



const r = express.Router();

r.post("/add", addDriver);
r.get("/", getDrivers);
r.post("/assign", assignOrder);
r.put("/deliver/:id", markDelivered);
r.delete("/:id", deleteDriver);  

export default r;
