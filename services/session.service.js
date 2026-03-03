import addUser, { getUserByEmail } from "./user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function registerUser({ name, email, password }) {
  const user = await addUser({ name, email, password });

  const token = jwt.sign(
    {
      name,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return { token, user };
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

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
}
