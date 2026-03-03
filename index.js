import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js"
import sessionRoute from "./routes/session.route.js"
import app from "./app.js";
import express from "express";

app.use(express.json())

app.use("/api/v1", sessionRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute)