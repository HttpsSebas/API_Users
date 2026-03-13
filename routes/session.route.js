import { Router } from "express";
import registerController, {
  loginController,
  logoutController,
  refreshTokenController
} from "../controllers/session.controller.js";

import sessionMiddleware from "../middlewares/session.middleware.js";

const sessionRoute = Router();

// TODO: Implementar inicio de sesión
sessionRoute.post("/login", loginController);

// TODO: Implementar cierre de sesión
sessionRoute.post("/logout", logoutController);

// TODO: Implementar registro de usuario
sessionRoute.post("/register", registerController);

sessionRoute.post("/refresh", sessionMiddleware, refreshTokenController);

export default sessionRoute;
