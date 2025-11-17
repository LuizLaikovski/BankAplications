import mongoose from "mongoose";

const transactioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        rer: "user",
        required: true
    },
    type: {
        type: String,
        enum: ["credit", "debit", "transfer"],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    descripition: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["completed", "pending", "failed"],
        default: "pending"
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: function () {
            return this.type === "transfer";
        }
    },
    // metadados flexíveis
    metadata: {
        type: Object,
        default: {}
    }
}, { timestamps: true});

export default mongoose.model("transaction", transactioSchema)