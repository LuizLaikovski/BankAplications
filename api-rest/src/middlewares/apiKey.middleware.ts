import { type Request, type Response, type NextFunction } from "express";
import { verifyPassword } from "../config/verifyPessword.js";

export function apiKeyGuard(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey = req.get("x-api-key");

    if (!apiKey) {
        return res.status(401).json({
            message: "Chave de segurança não fornecida."
        });
    }

    if (!verifyPassword(apiKey)) {
        return res.status(403).json({
            message: "Chave de segurança inválida."
        });
    }

    next(); // libera a rota
}
