import express from "express";
import { registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import { updatePassword } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";



const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/update-password", updatePassword);
router.get("/user/all", getAllUsers);
router.delete("/user/delete/:id", deleteUser);


export default router;



