import mongoose from "mongoose";
import { ProductDocument } from "@/app/utils/types/Product";

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    currencyCode: String,
    discountPercentage: Number,
    images: [String],
    thumbnail: String,
    gender: String,
    category: String,
    subCategory: String,
    averageRating: Number,
    numberOfReviews: Number,
    stock: Number,
    colors: [String],
    sizes: [String],
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true } // ✅ createdAt & updatedAt
);

// ⚡ Middleware: auto-generate slug
productSchema.pre("save", function () {
  if (!this.slug && this.title) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    this.slug = `${baseSlug}-${this._id.toString().slice(-6)}`;
  }
});

/* 🔹 Hot reload safe export */
const Product =
  (mongoose.models.Product as mongoose.Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;