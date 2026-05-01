import MealPlan from "../models/MealPlan.js";

export const addMealPlan = async (req, res) => {
  try {
    const { recipeId, day, mealType } = req.body;

    const item = await MealPlan.create({
      userId: req.user._id,
      recipeId,
      day,
      mealType,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Error adding meal plan" });
  }
};

export const getMealPlans = async (req, res) => {
  try {
    const plans = await MealPlan.find({
      userId: req.user._id,
    });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal plans" });
  }
};

export const updateMealPlan = async (req, res) => {
  try {
    const updated = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating meal plan" });
  }
};

export const deleteMealPlan = async (req, res) => {
  try {
    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meal plan" });
  }
};