const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("API Running...");
});
app.use("/products", require("./routes/productRoutes"));
// Import favorite routes
app.use("/favorites", require("./routes/favoriteRoutes")); // ✅ must be /favorites

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
