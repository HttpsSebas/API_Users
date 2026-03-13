import addUser, { getUserByEmail } from "./user.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import createRefreshToken from "../utils/createRefreshToken.js";
import bcrypt from "bcrypt";

export default async function registerUser({ name, email, password }) {
  const user = await addUser({ name, email, password });

  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const cryptedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await createRefreshToken({ userId: user.id, token: cryptedRefreshToken });

  return { token, user, refreshToken };
}

export async function loginUser({ email, password }) {
  const user = await getUserByEmail({ email });
  if (!user) {
    throw new Error("Email is not registered");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Password is incorrect");
  }

  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const cryptedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await createRefreshToken({ userId: user.id, cryptedRefreshToken });

  return { token, refreshToken, user };
}
