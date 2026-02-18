const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    addFavorite,
    removeFavorite,
    getFavorites,
} = require("../controllers/favoriteController");
router.post("/:productId", protect, addFavorite);
router.delete("/:productId", protect, removeFavorite);

router.get("/", protect, getFavorites);             // Get user's favorites

module.exports = router;
