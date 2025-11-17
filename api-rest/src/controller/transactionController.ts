import type { Request, Response } from "express";
import transactionSchema from "../schema/transactionSchema.js";
import userSchema from "../schema/userSchema.js";


export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { userId, type, amount, description, toUserId, metadata } = req.body;

        if (!userId || !type || !amount) return res.status(400).json({ message: "Campos obrigatórios faltando: userId, type e amount." });

        const userExists = await userSchema.findById(userId);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado." });

        
        if (type === "transfer") {
            if (!toUserId) return res.status(400).json({ message: "toUserId é obrigatório para transferências." });

            const targetUser = await userSchema.findById(toUserId);
            if (!targetUser) return res.status(404).json({ message: "Usuário de destino não encontrado." });
            
            if (amount > userExists.balance) return res.status(409).json({ message: "O saldo do usuario é insufinciente para a transferencia." })
            
            userExists.balance = userExists.balance - amount;
            targetUser.balance = targetUser.balance + amount;


            await userExists.save();
            await targetUser.save();
        }

        if (type === "credit") {
            userExists.balance += amount;
            userExists.save();
        }

        if (type === "debit") {
            if (amount > userExists.balance) return res.status(409).json({ message: "O saldo do usuario é insufinciente para o saque." });
            userExists.balance -= amount;
            userExists.save();
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
        if (!transaction) {
            return res.status(404).json({ message: "Transação não encontrada." });
        }

        return res.status(200).json(transaction);

    } catch (err: any) {
        console.error("Erro ao buscar transação:", err);
        return res.status(500).json({ error: "Erro interno ao buscar transação." });
    }
};

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

        if (!updated) {
            return res.status(404).json({ message: "Transação não encontrada." });
        }

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

        if (!deleted) {
            return res.status(404).json({ message: "Transação não encontrada." });
        }

        return res.status(200).json({
            message: "Transação deletada com sucesso.",
            deleted
        });

    } catch (err: any) {
        console.error("Erro ao deletar transação:", err);
        return res.status(500).json({ error: "Erro interno ao deletar transação." });
    }
};
