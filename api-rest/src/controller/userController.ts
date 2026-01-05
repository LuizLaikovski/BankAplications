import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import userSchema from "../schema/userSchema.js";
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../config/jwtConfig.js";

export const newUser = async (req: Request, res: Response) => {
    try {
        const { name, cpf, email, password, balance = 0, keyPix = "", role = "user",
            gender, isActive = true, preferences = {
                theme: "white",
                language: "pt-BR"
            } } = req.body;

        if (!name || !cpf || !email || !password || !gender) {
            return res.status(400).json({
                message: "Preencha os campos obrigatórios: name, cpf, email, password, gender."
            });
        }

        const existingUser = await userSchema.findOne({ cpf });
        if (existingUser) {
            return res.status(409).json({
                message: "Este CPF já está cadastrado."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            name, cpf, email, password: hashedPassword, balance, keyPix,
            role, gender, isActive, preferences
        });

        return res.status(200).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            gender: newUser.gender,
            preferences: newUser.preferences
        });

    } catch (err: any) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ error: "Erro interno ao criar usuário." });
    }
};


export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.idUser;

        if (!id) {
            return res.status(400).json({ msg: "Id não informado" });
        }

        const user = await userSchema.findById(id);
        return res.status(200).json(user);

    } catch (error: any) {
        console.error("Erro ao buscar usuário:", error);
        return res.status(500).json({ error: "Erro interno ao buscar usuário." });
    }
};


export const getUserAll = async (req: Request, res: Response) => {
    try {
        const users = await userSchema.find();
        return res.status(200).json(users);
    } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({ error: "Erro interno ao buscar usuários." });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.idUser;
        const data = req.body;

        if (!id) return res.status(400).json({ msg: "Id não informado" });

        const updatedUser = await userSchema.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json(updatedUser);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) return res.status(400).json({ msg: "Id não informado" });

        const deletedUser = await userSchema.findByIdAndDelete(id);

        return res.status(200).json({
            message: `O usuário de id ${id} foi deletado`,
            deletedUser
        });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { cpf, password } = req.body;

        if (!cpf || !password) return res.status(400).json({ result: "Preencha email e senha" });

        const user = await userSchema.findOne({ cpf });

        if (!user) return res.status(400).json({ result: "Usuário não encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ result: "Senha inválida" });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
            preferences: user.preferences
        });
    } catch (err: any) {
        console.error("Erro no login:", err);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
};


export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { id, oldPassword, password: newPassword } = req.body;

        if (!id || !newPassword || !oldPassword) return res.status(400).json({ message: "Campos Obrigátorios faltando" });

        const user = await userSchema.findOne({ id });

        if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

        const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordMatch) {
            return res.status(400).json({ message: "Senha antiga está incorreta" });
        }

        const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password);
        if (isNewPasswordSameAsOld) {
            return res.status(400).json({ message: "A senha nova deve ser diferente da antiga" });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor", error });
    }
};


export const registerKeyPix = async (req: Request, res: Response) => {
    try {
        const { idUser, keyPix } = req.body;

        if (!idUser || !keyPix) return res.status(400).json({ message: "Dados importantes faltando" });

        const user = await userSchema.findById(idUser);

        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        user.keyPix = keyPix;

        await user.save();

        return res.status(200).json({
            message: "Chave pix cadastrada com sucesso!",
            keyPix: user.keyPix
        });
    } catch (error) {
        return res.status(500).json({ message: `Houve um erro interno do servidor: ${error}` });
    }
}


export const favotiteKeyPix = async (req: Request, res: Response) => {
    try {
        const { idUser, keyPix } = req.body;

        if (!idUser || !keyPix) return res.status(400).json({ message: "Dados importantes faltando" });

        const user = await userSchema.findById(idUser);
        if (!user) return res.status(400).json({ message: "Usuario não encontrado" });

        const userForKey = await userSchema.findOne({ keyPix: keyPix });
        if (!userForKey) return res.status(404).json({ message: "Não foi encontrado um usuario com esta chave pix" })

        if (!Array.isArray(user.favoriteKeys)) user.favoriteKeys = [] as any;

        user.favoriteKeys.push({
            idUser: userForKey.id,
            keyPix: keyPix
        });

        await user.save();

        return res.status(200).json({
            message: "Chave favorita adicionada com sucesso!",
            favoriteKeys: user.favoriteKeys
        })
    } catch (error) {
        return res.status(500).json({ message: `Houve erro interno do servidor: ${error}` })
    }
};


export const getFavoriteKeysPix = async (req: Request, res: Response) => {
    try {
        const idUser = req.params.idUser;

        if (!idUser) return res.status(400).json({ message: "Id do usuário não informado" });

        const user = await userSchema.findById(idUser);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

        return res.status(200).json({
            favoriteKeys: user.favoriteKeys || []
        });
    } catch (error) {
        return res.status(500).json({ message: `Houve um erro interno do servidor: ${error}` });
    }
};


export const unFavoriteKeyPix = async (req: Request, res: Response) => {
    try {
        const { idUser, keyPix } = req.body;

        if (!idUser || !keyPix) return res.status(400).json({ message: "Dados importantes faltando" });

        const user = await userSchema.findById(idUser);
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

        if (!user.favoriteKeys) return res.status(404).json({ message: "Nenhuma chave favorita cadastrada" });

        const idx = user.favoriteKeys.findIndex((fav: any) => String(fav.keyPix) === String(keyPix));

        if (idx === -1) {
            return res.status(404).json({ message: "Chave favorita não encontrada no usuário" });
        }

        user.favoriteKeys.splice(idx, 1);

        await user.save();

        return res.status(200).json({
            message: "Chave favorita removida com sucesso!",
            favoriteKeys: user.favoriteKeys
        });
    } catch (error) {
        return res.status(500).json({ message: `Houve um erro interno do servidor: ${error}` });
    }
};