const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
            index: true
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            maxlength: [1000, "Description too long"]
        },

        image: {
            type: String,
            required: [true, "Product image is required"],
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }

    },
    { timestamps: true }
);

// 🔎 Text search index
productSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
