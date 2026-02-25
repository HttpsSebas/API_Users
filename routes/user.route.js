import { Router } from "express";
import getUserById, { createUser, putUser, deleteUserById } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/", createUser);

userRoute.put("/:id", putUser)

userRoute.get("/:id", getUserById);

userRoute.delete("/:id", deleteUserById)


export default userRoute;
