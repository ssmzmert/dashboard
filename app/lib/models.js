import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      type: String,
      required: true,
    },
    productModel: {
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    departments: {
      type: Object,
    },
    img: {
      type: Object,
    },
  },
  { timestamps: true }
);

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
