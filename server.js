const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration for your live frontend
app.use(
    cors({
        // origin: "https://micro-marketplace-client.vercel.app", // frontend URL
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true, // if you need cookies/auth headers
    })
);

app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/favorites", require("./routes/favoriteRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("API Running...");
});

// Protected route example
app.get("/protected", protect, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
