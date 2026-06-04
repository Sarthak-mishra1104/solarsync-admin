import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "SolarSync",
    },

    companyEmail: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);