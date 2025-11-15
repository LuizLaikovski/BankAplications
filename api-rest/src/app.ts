import connectDB from "./db/database.js";
import express from "express";
import routesUser from "./routes/routesUser.js";

const app = express();
const port = 8080;

app.use(express.json());

connectDB();

app.use("/user", routesUser);

app.listen(port,() => console.log(`Servidor rodando na porta ${port}: http://localhost:${port}`));