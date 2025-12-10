import type { Request, Response } from "express";
import transactionSchema from "../schema/transactionSchema.js";
import userSchema from "../schema/userSchema.js";
import { handleCredit, handleDebit, handleTransfer } from "../dto/tranactionDTO.js";
import { json } from "stream/consumers";


export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { userId, type, amount, description, toUserId, metadata } = req.body;

        if (!userId || !type || !amount) return res.status(400).json({ message: "Campos obrigatórios faltando: userId, type e amount." });

        const userExists = await userSchema.findById(userId);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado." });

        switch (type) {
            case "transfer":
                if (!toUserId) return res.status(400).json({ message: "toUserId é obrigatório para transferências." });

                try {
                    await handleTransfer(userExists, amount, toUserId);
                } catch (err: any) {
                    if (err.message === "TARGET_NOT_FOUND") return res.status(404).json({ message: "Usuário de destino não encontrado." });

                    if (err.message === "INSUFFICIENT_FUNDS") return res.status(409).json({ message: "Saldo insuficiente para transferência." });
                }
                break;

            case "credit":
                await handleCredit(userExists, amount);
                break;

            case "debit":
                try {
                    await handleDebit(userExists, amount);
                } catch (err: any) {
                    if (err.message === "INSUFFICIENT_FUNDS") return res.status(500).json({ message: "Saldo insuficiente!" });

                    throw err;
                }
                break;
            default:
                break;
        }

        const transaction = await transactionSchema.create({
            userId,
            type,
            amount,
            description,
            toUserId,
            status: "completed",
            metadata
        });

        return res.status(201).json(transaction);

    } catch (err: any) {
        console.error("Erro ao criar transação:", err);
        return res.status(500).json({ error: "Erro interno ao criar transação." });
    }
};

export const getTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const transaction = await transactionSchema.findById(id);
        if (!transaction) return res.status(404).json({ message: "Transação não encontrada." });

        return res.status(200).json(transaction);
    } catch (err: any) {
        console.error("Erro ao buscar transação:", err);
        return res.status(500).json({ error: "Erro interno ao buscar transação." });
    }
};

export const getValueUser = async (req: Request, res: Response) => {
    try {
        const { idUser } = req.body;

        if (!idUser) return res.status(404).json({ message: "O campo ID não foi preenchido!" });

        const user = await userSchema.findById(idUser);

        if (!user) return res.status(404).json({ message: "Usuario não encontrado!" });
        
        return res.status(200).json(user.balance);
    } catch (error) {
        return res.status(500).json({ message: `Houve erro interno da aplicação: ${error}` })
    }
}

export const getAllTransactions = async (_req: Request, res: Response) => {
    try {
        const transactions = await transactionSchema.find();
        return res.status(200).json(transactions);
    } catch (err: any) {
        console.error("Erro ao listar transações:", err);
        return res.status(500).json({ error: "Erro interno ao listar transações." });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updated = await transactionSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updated) return res.status(404).json({ message: "Transação não encontrada." });

        return res.status(200).json(updated);
    } catch (err: any) {
        console.error("Erro ao atualizar transação:", err);
        return res.status(500).json({ error: "Erro interno ao atualizar transação." });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleted = await transactionSchema.findByIdAndDelete(id);

        if (!deleted) return res.status(404).json({ message: "Transação não encontrada." });

        return res.status(200).json({
            message: "Transação deletada com sucesso.",
            deleted
        });
    } catch (err: any) {
        console.error("Erro ao deletar transação:", err);
        return res.status(500).json({ error: "Erro interno ao deletar transação." });
    }
};