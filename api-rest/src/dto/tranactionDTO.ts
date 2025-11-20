import userSchema from "../schema/userSchema.js";
import transactionSchema from "../schema/transactionSchema.js";

export const handleTransfer = async (userExists: any, amount: number, toUserId: string) => {
    const targetUser = await userSchema.findById(toUserId);
    if (!targetUser) throw new Error("TARGET_NOT_FOUND");

    if (amount > userExists.balance) throw new Error("INSUFFICIENT_FUNDS");

    userExists.balance -= amount;
    targetUser.balance += amount;

    await userExists.save();
    await targetUser.save();

    return { userExists, targetUser };
};

export const handleCredit = async (userExists: any, amount: number) => {
    userExists.balance += amount;
    await userExists.save();
    return userExists;
};

export const handleDebit = async (userExists: any, amount: number) => {
    if (amount > userExists.balance) throw new Error("INSUFFICIENT_FUNDS");
    userExists.balance -= amount;
    await userExists.save();
    return userExists;
};

export const createTransactionRecord = async ({
    userId,
    type,
    amount,
    description,
    toUserId,
    metadata
}: any) => {
    return await transactionSchema.create({
        userId,
        type,
        amount,
        description,
        toUserId,
        status: "completed",
        metadata
    });
};
