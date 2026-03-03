import { Router } from "express";
import registerController, {loginController, logoutController} from "../controllers/session.controller.js";

const sessionRoute = Router();

// TODO: Implementar inicio de sesión
sessionRoute.post("/login", loginController)

// TODO: Implementar cierre de sesión
sessionRoute.post("/logout", logoutController)

// TODO: Implementar registro de usuario
sessionRoute.post("/register", registerController);

export default sessionRoute;