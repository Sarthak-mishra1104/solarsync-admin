import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      default: "",
    },

    photoURL: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      default: "google",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    totalInquiries: {
      type: Number,
      default: 0,
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);