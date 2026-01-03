import mongoose from "mongoose";

const favotiteKeyPixSchema = new mongoose.Schema({
    idUser: { type: String, required: true },
    keyPix: { type: String, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        length: 11
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        min: 0,
        default: 0
    },
    keyPix: {
        type: String,
        required: true
    },
    favoriteKeys: {
        type: [favotiteKeyPixSchema],
        required: []
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["S", "M"], 
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    preferences: {
        theme: { type: String, default: "white" },
        language: { type: String, default: "pt-BR"}
    }
}, { timestamps: true });

export default mongoose.model("user", userSchema);