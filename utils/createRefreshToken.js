import { prisma } from "../prisma/prisma.ts";

export default async function createRefreshToken({
  userId,
  cryptedRefreshToken,
}) {
  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await prisma.session.create({
      data: {
        userId,
        token: cryptedRefreshToken,
        expiresAt,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function getRefreshToken({ userId, token }) {
  try {
    const refreshToken = await prisma.session.findFirst({
      where: {
        userId,
        token,
      },
    });
    return refreshToken;
  } catch (e) {
    throw new Error(e.message);
  }
}
