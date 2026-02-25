import userRoute from "./routes/user.route.js";
import app from "./app.js";
import express from "express";

app.use(express.json())

app.use("/api/v1/users", userRoute);