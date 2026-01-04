import express from "express";
import { deleteUser, favotiteKeyPix, getFavoriteKeysPix, getUser, getUserAll, loginUser, newUser, registerKeyPix, unFavoriteKeyPix, updatePassword, updateUser } from "../controller/userController.js";
import { apiKeyGuard } from "../middlewares/apiKey.middleware.js";

const routesUser = express.Router();

routesUser.use(apiKeyGuard);

routesUser.post("/newUser", newUser);
routesUser.post("/login", loginUser);
routesUser.post("/favoritekeypix", favotiteKeyPix);
routesUser.post("/registerkeypix", registerKeyPix);
routesUser.get("/", getUserAll);
routesUser.get("/:idUser", getUser);
routesUser.get("/favoritekeyspix/:idUser", getFavoriteKeysPix);
routesUser.put("/:idUser", updateUser);
routesUser.put("/update/password/", updatePassword)
routesUser.delete("/delete/:id", deleteUser);
routesUser.delete("/unfavoritekey", unFavoriteKeyPix);

export default routesUser;