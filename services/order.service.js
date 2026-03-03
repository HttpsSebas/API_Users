import { prisma } from "../prisma/prisma.ts";
import { getUser } from "./user.service.js";

export default async function createOrder({ userId, items }) {
  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  const user = getUser({ id: userId });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const total = items.reduce((acum, item) => {
    acum + item.price * item.quantity;
  }, 0);

  const order = await prisma.$transaction(async (tx) => {
    // Crear pedido
    const newOrder = await tx.order.create({
      data: {
        userId: userId,
        total: total,
        status: "PENDING",
      },
    });

    // Crear items del pedido

    await tx.orderItem.createMany({
      data: items.map((item) => ({
        orderId: newOrder.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
    return newOrder;
  });
  return order;
}
