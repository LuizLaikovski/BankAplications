import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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