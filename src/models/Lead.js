import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      default: "vikram-solar",
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: String,

    monthlyBill: Number,

    roofSize: Number,

    source: {
      type: String,
      default: "Contact Form",
    },

    status: {
      type: String,
      default: "New Lead",
    },

    siteVisitDate: {
      type: Date,
      default: null,
    },

    assignedTo: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);