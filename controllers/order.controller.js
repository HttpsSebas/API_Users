import createOrder, {
  getOrders,
  updateOrderStatus,
} from "../services/order.service.js";

export default async function postOrder(req, res) {
  // Crear pedido
  try {
    // Obtener items del body
    const items = req.body;
    if (!items || items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    // Obtengo el usuario que hace la peticion
    const userId = req.user.id;

    // Crear el pedido
    const order = await createOrder({ userId, items });

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getOrdersController(req, res) {
  // Obtener los pedidos
  try {
    // Obtener parametros de la query: desde, hasta, limit
    const fromQuery = req.query.from || null;
    const toQuery = req.query.to || null;
    const limit = parseInt(req.query.limit) || 10;
    // Obtener los pedidos
    const orders = await getOrders({
      userId: req.user.id,
      from: fromQuery,
      to: toQuery,
      limit: limit,
    });
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function setStatus(req, res) {
  try {
    const id = parseInt(req.params.id);
    const status = req.body.status;
    if (
      status !== "COMPLETED" &&
      status !== "PENDING" &&
      status !== "CANCELLED"
    ) {
      throw new Error("Invalid status, it must be COMPLETED, PENDING or CANCELLED");
    }
    const order = await updateOrderStatus({ id, status });
    res.status(200).json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
