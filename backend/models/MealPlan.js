import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true,
    },
  },
  { timestamps: true }
);

mealPlanSchema.index(
  { userId: 1, recipeId: 1, day: 1, mealType: 1 },
  { unique: true }
);

export default mongoose.model("MealPlan", mealPlanSchema);