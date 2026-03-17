import {z} from "zod";

const orderSchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number()
})

export default orderSchema