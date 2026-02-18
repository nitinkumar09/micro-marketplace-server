require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        // Create users
        const users = await User.create([
            { name: "Nitin", email: "nitin@test.com", password: "123456" },
            { name: "Om", email: "om@test.com", password: "123456" },
        ]);

        // Create products (assign to first user)
        const products = await Product.create([
            {
                title: "iPhone 15",
                price: 80000,
                description: "Latest Apple phone",
                image: "https://dummyimage.com/iphone.jpg",
                user: users[0]._id,
            },
            {
                title: "Samsung Galaxy S24",
                price: 70000,
                description: "Latest Samsung phone",
                image: "https://dummyimage.com/samsung.jpg",
                user: users[0]._id,
            },
            {
                title: "MacBook Pro 16",
                price: 200000,
                description: "Apple MacBook Pro with M2 chip",
                image: "https://dummyimage.com/macbook.jpg",
                user: users[0]._id,
            },
            {
                title: "Dell XPS 15",
                price: 150000,
                description: "Dell XPS Laptop for professionals",
                image: "https://dummyimage.com/dell.jpg",
                user: users[0]._id,
            },
            {
                title: "Sony WH-1000XM5",
                price: 25000,
                description: "Noise-canceling wireless headphones",
                image: "https://dummyimage.com/sony.jpg",
                user: users[0]._id,
            },
            {
                title: "Apple Watch Series 9",
                price: 45000,
                description: "Latest Apple smartwatch",
                image: "https://dummyimage.com/applewatch.jpg",
                user: users[1]._id,
            },
            {
                title: "Samsung Galaxy Watch 6",
                price: 35000,
                description: "Samsung smartwatch with health tracking",
                image: "https://dummyimage.com/galaxywatch.jpg",
                user: users[1]._id,
            },
            {
                title: "iPad Pro 12.9",
                price: 120000,
                description: "Apple iPad Pro with Liquid Retina display",
                image: "https://dummyimage.com/ipad.jpg",
                user: users[1]._id,
            },
            {
                title: "Google Pixel 8",
                price: 60000,
                description: "Latest Google Pixel smartphone",
                image: "https://dummyimage.com/pixel.jpg",
                user: users[1]._id,
            },
            {
                title: "OnePlus 12",
                price: 55000,
                description: "Flagship OnePlus smartphone",
                image: "https://dummyimage.com/oneplus.jpg",
                user: users[1]._id,
            },
        ]);

        console.log("Seed data created successfully!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
