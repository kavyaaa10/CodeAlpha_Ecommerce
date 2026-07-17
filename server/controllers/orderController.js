const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ===============================
// Create Order
// ===============================

const createOrder = async (req, res) => {
    try {

        const { shippingAddress, paymentMethod } = req.body;

        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalPrice = 0;

        const orderItems = cartItems.map(item => {

            totalPrice += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };

        });

        const order = await Order.create({

            user: req.user.id,

            items: orderItems,

            shippingAddress,

            paymentMethod,

            totalPrice

        });

        // Clear Cart
        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// ===============================
// Get My Orders
// ===============================

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ===============================
// Get Single Order
// ===============================

const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("items.product");

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        if (order.user.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        res.json(order);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById
};