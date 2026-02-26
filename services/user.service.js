import { prisma } from "../prisma/prisma.ts";
import bcrypt from "bcrypt";

export default async function addUser({ name, email, password }) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      deleted: false,
      orders: [],
    },
  });
  return user;
}

export async function getUser({ id }) {
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
      deleted: false,
    },
  });

  return user;
}

export async function updateUser({ id, name, email }) {
  if (!id) {
    const error = new Error("El id es requerido");
    throw error;
  }

  const user = await getUser({ id });

  if (!user) {
    const error = new Error("El usuario no existe");
    throw error;
  }

  const userUpdated = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      email: email,
    },
  });
  return userUpdated;
}

export async function deleteUser({ id }) {
  const user = await getUser({ id });

  if (!user) {
    const error = new Error("El usuario con el id no existe");
    throw error;
  }

  const deletedUser = prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      deleted: true,
    },
  });

  return deletedUser;
}
