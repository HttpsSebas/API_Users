import createOrder from "../services/order.service.js";

export default async function postOrder(req, res) {
    const items = req.body;
    const userToken = req.headers.authorization;

    const order = await createOrder({userId: userToken, items})

    res.status(201).send(order);
}