import express from "express";

import ticketsRoutes from "./routes/tickets.routes.js";

const app = express();

app.use(express.json());

app.use("/api", ticketsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
