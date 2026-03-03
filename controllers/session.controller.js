import { loginUser } from "../services/session.service.js";
import registerUser from "../services/session.service.js";

export default async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser({ name, email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function logoutController(req, res) {
  try {
    if (!req.cookies.token) {
      throw new Error("No token provided");
    }
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
