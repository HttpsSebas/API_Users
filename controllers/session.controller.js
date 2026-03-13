import registerUser, { loginUser } from "../services/session.service.js";
import { getRefreshToken } from "../utils/createRefreshToken.js";

export default async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    const { token, user, refreshToken } = await registerUser({
      name,
      email,
      password,
    });

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
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function refreshTokenController(req, res) {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = await getRefreshToken({ userId: user.id, token });

    if (!newToken) {
      throw new Error("Refresh token not found");
    }

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ token: newToken });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
