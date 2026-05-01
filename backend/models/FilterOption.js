import mongoose from "mongoose";

const filterOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["cookTime", "dietary", "allergy", "category"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FilterOption = mongoose.model("FilterOption", filterOptionSchema);

export default FilterOption;