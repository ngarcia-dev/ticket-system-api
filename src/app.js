import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";
import dependenciesRoutes from "./routes/dependencies.routes.js";
import internalSecRoutes from "./routes/internalsec.routes.js";
import servicesRoutes from "./routes/services.routes.js";

const app = express();

const whitlist = ["http://localhost:5173"];

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
