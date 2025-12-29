import express from "express";
import { addCylinder, getCylinders, updateCylinder, deleteCylinder } from "../controllers/cylinderController.js";
import { updateLocation } from "../controllers/cylinderController.js";
const route = express.Router();

route.post("/add", addCylinder);
route.get("/", getCylinders);
route.put("/:id", updateCylinder);
route.delete("/:id", deleteCylinder);

route.post("/update-location", updateLocation);


export default route;
