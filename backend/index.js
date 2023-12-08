const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uri = "mongodb+srv://MongoDb:1@reacteticaretdb.nao7bcj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri).then(res => {
    console.log("Database connection is successful");
}).catch((err) => {
    console.log(err.message);
});

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    isAmin: Boolean
});

const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    stock: Number,
    price: Number,
    imageUrl: String,
    categoryName: String
});

const Product = mongoose.model("Product", productSchema);

const basketSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    userId: Number,
    price: Number
});

const Basket = mongoose.model("Basket", basketSchema);

const orderSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    userId: Number,
    price: Number
});

const Order = mongoose.model("Order", orderSchema);

const secretKey = "Secret key Secret key Secret key";
const options = {
    expiresIn: "1h"
}

app.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = new User({
            _id: uuidv4(),
            name: name,
            email: email,
            password: password,
            isAdmin: false
        });
        await user.save();
        const payload = {
            user: user
        }
        const token = jws.sign(payload, secretKey, options);
        res.json({ user: user, token: token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await User.find({ email: email, password: password });
        if (users.length == 0) {
            res.status(500).json({ message: "Wrong mail or password!" });
        } else {
            const payload = {
                user: users[0]
            }
            const token = jws.sign(payload, secretKey, options);
            res.json({ user: users[0], token: token })
        }
    } catch (error) {

    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}).sort({ name: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//console.log(uuidv4());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post("/products/add", upload.single("image"), async (req, res) => {
    try {
        const { name, categoryName, stock, price } = req.body;
        const product = new Product({
            _id: uuidv4(),
            name: name,
            stock: stock, price: price,
            categoryName: categoryName,
            imageUrl: req.file.path
        });

        await product.save();
        res.json({ message: "Product save is completed!" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.post("/products/remove", async (req, res) => {
    try {
        const { _id } = req.body;
        await Product.findByIdAndRemove(_id);
        res.json({ message: "deleted succesfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const port = 5000;
app.listen(5000, () => {
    console.log("Aplication http://localhost: " + port + " starting");
});