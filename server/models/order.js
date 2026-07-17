const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            },
             size: {
            type: String,
            default: ""
        },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    shippingAddress: {

        fullName: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        }
    },

    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "UPI", "Card"],
        default: "Cash on Delivery"
    },

    totalPrice: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);