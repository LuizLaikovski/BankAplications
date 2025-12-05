import express from "express";
import { deleteUser, getUser, getUserAll, loginUser, newUser, updatePassword, updateUser } from "../controller/userController.js";

const routesUser = express.Router();

routesUser.post("/newUser", newUser);
routesUser.post("/login", loginUser);
routesUser.get("/", getUserAll);
routesUser.get("/:idUser", getUser);
routesUser.put("/:idUser", updateUser);
routesUser.put("/update/password/", updatePassword)
routesUser.delete("/delete/:id", deleteUser);

export default routesUser;