import { Router } from "express";
import {
    alltodos,
    addtodo,
    updatetodo,
    deletetodo
} from "../controllers/todoController.js"

const router = Router()


// TODO ROUTES
router.route("/alltodo").post(alltodos)
router.route("/addtodo").post(addtodo)
router.route("/updatetodo").patch(updatetodo)
router.route("/deletetodo").delete(deletetodo)




export default router