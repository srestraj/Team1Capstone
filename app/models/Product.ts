import mongoose, { Schema, Model } from "mongoose";
import { ProductDocument } from "@/app/utils/types/Product";

const productSchema = new Schema<ProductDocument>(
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
    averageRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 99 },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: ["M", "L", "XL"] },
    slug: { type: String, unique: true, index: true }
  },
  { timestamps: true }
);

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

productSchema.pre("save", function () {

  if (!this.slug && this.title) {
    const baseSlug = slugify(this.title);
    const id = this._id.toString().slice(-6);
    this.slug = `${baseSlug}-${id}`;
  }
});

// Hot reload
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const Product: Model<ProductDocument> =
  mongoose.model<ProductDocument>("Product", productSchema);

export default Product;