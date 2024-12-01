import { Router } from "express";

import { 
    register,
    login
 } from "../controllers/user.controller.js";

const router = Router();

// ALL USER ROUTES
router.route("/register").post(register);
router.route("/login").post(login);


export default router