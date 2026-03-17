import { prisma } from "../prisma/prisma.ts";
import { getUser } from "./user.service.js";

export default async function createOrder({ userId, items }) {
  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  const user = await getUser({ id: userId });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const total = items.reduce((acum, item) => {
    return acum + item.price * item.quantity;
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

export async function getOrders({
  userId,
  from = null,
  to = null,
  limit = 10,
}) {
  const where = {
    userId: userId,
  };

  if (from || to) {
    where.createdAt = {};
  }

  if (from) {
    where.createdAt.gte = from;
  }

  if (to) {
    where.createdAt.lte = to;
  }

  const orders = await prisma.order.findMany({
    where,
    take: limit,
  });

  if (!orders) {
    throw new Error("Orders not found");
  }

  return orders;
}

export async function updateOrderStatus({ id, status }) {
  const orderStatus = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  return orderStatus;
}
