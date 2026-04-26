import AppSetting from "../models/AppSetting.js";

const RECIPE_LIMIT_KEY = "recipeLimit";

export const getRecipeLimit = async (req, res) => {
  try {
    let setting = await AppSetting.findOne({ key: RECIPE_LIMIT_KEY });

    if (!setting) {
      setting = await AppSetting.create({
        key: RECIPE_LIMIT_KEY,
        value: 20,
      });
    }

    return res.status(200).json({
      maxRecipes: setting.value,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get recipe limit.",
      error: error.message,
    });
  }
};

export const updateRecipeLimit = async (req, res) => {
  try {
    const { maxRecipes } = req.body;

    const parsedValue = Number(maxRecipes);

    if (!parsedValue || parsedValue < 1) {
      return res.status(400).json({
        message: "Max recipes must be a number greater than 0.",
      });
    }

    const setting = await AppSetting.findOneAndUpdate(
      { key: RECIPE_LIMIT_KEY },
      { value: parsedValue },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Recipe limit updated successfully.",
      maxRecipes: setting.value,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update recipe limit.",
      error: error.message,
    });
  }
};