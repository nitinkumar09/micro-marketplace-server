const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration for both local and live frontend
const allowedOrigins = [
    // "https://micro-marketplace-client.vercel.app", // live frontend
    "http://localhost:5173", // local frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman) or if origin is in allowedOrigins
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true, // allow cookies/auth headers
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
