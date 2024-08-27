import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import ticketsRoutes from "./routes/tickets.js";
import dependenciesRoutes from "./routes/dependencies.js";
import internalSecRoutes from "./routes/internalsec.js";
import servicesRoutes from "./routes/services.js";

const app = express();

const whitlist = [process.env.UI];

app.use(
  cors({
    origin: whitlist,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", ticketsRoutes);
app.use("/api", dependenciesRoutes);
app.use("/api", internalSecRoutes);
app.use("/api", servicesRoutes);

export default app;
