import express from "express";
import { deleteUser, favotiteKeyPix, getUser, getUserAll, loginUser, newUser, unFavoriteKeyPix, updatePassword, updateUser } from "../controller/userController.js";

const routesUser = express.Router();

routesUser.post("/newUser", newUser);
routesUser.post("/login", loginUser);
routesUser.post("/favoritekeypix", favotiteKeyPix);
routesUser.get("/", getUserAll);
routesUser.get("/:idUser", getUser);
routesUser.put("/:idUser", updateUser);
routesUser.put("/update/password/", updatePassword)
routesUser.delete("/delete/:id", deleteUser);
routesUser.delete("/unfavoritekey", unFavoriteKeyPix);

export default routesUser;