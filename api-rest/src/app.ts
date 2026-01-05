import connectDB from "./db/database.js";
import express from "express";
import routesUser from "./routes/routesUser.js";
import routesTransaction from "./routes/routesTransaction.js";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
}));

app.use(express.json());

connectDB();

app.use("/user", routesUser);
app.use("/transaction", routesTransaction);

app.listen(port,() => console.log(`Servidor rodando na porta ${port}: http://localhost:${port}`));