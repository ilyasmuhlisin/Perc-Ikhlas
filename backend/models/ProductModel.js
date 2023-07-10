const mongoose = require("mongoose");
const Review = require("./ReviewModel");
const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reviewsNumber: {
      type: Number,
    },
    sales: {
      type: Number,
      default: 0,
    },
    attrs: [
      { key: { type: String }, value: { type: String } },
      // [{ key: "color", value: "red" }, { key: "size", value: "1 TB" }]
    ],
    images: [imageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true,
  }
);
productSchema.index();
const Product = mongoose.model("Product", productSchema);
// pencarian gabungan nama dan deskripsi
productSchema.index(
  { name: "text", description: "text" },
  { name: "TextIndex" }
);
// pencarian misalnya dari a sampai z
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });
// pencarian misalnya dari z sampai a
// productSchema.index({name: -1})

module.exports = Product;
