const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      default: 4.5
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);