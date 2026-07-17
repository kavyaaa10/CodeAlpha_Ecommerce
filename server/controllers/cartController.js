const Cart = require("../models/Cart");
const Product = require("../models/Product");


// ===============================
// Add Product To Cart
// POST /api/cart
// ===============================
exports.addToCart = async (req, res) => {
    try {

        const userId = req.user.id; // from auth middleware

        const { productId, quantity, size } = req.body;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock"
            });
        }

        // Check if already in cart
        let cartItem = await Cart.findOne({
            user: userId,
            product: productId,
            size: size || ""
        });

        if (cartItem) {

            cartItem.quantity += quantity;

            if (cartItem.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity exceeds stock"
                });
            }

            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated",
                cartItem
            });
        }

        cartItem = await Cart.create({
            user: userId,
            product: productId,
            quantity,
            size: size || ""
        });

        res.status(201).json({
            success: true,
            message: "Added to cart",
            cartItem
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// ===============================
// Get User Cart
// GET /api/cart
// ===============================
exports.getCart = async (req, res) => {
    try {

        const userId = req.user.id;

        const cart = await Cart.find({ user: userId })
            .populate("product");

        res.status(200).json({
            success: true,
            count: cart.length,
            cart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};


// ===============================
// Update Cart Quantity
// PUT /api/cart/:id
// ===============================
exports.updateCart = async (req, res) => {

    try {

        const { quantity, size } = req.body;

        const cartItem = await Cart.findById(req.params.id).populate("product");

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        if (quantity > cartItem.product.stock) {
            return res.status(400).json({
                success: false,
                message: "Stock not available"
            });
        }

        cartItem.quantity = quantity;

        if (size !== undefined) {
            cartItem.size = size;
        }

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Cart updated",
            cartItem
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ===============================
// Remove From Cart
// DELETE /api/cart/:id
// ===============================
exports.removeFromCart = async (req, res) => {
    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};