import AppSetting from "../models/AppSetting.js";
import User from "../models/User.js";

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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get users.",
      error: error.message,
    });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, allergies, dietaryPreferences } = req.body;

    const validRoles = ["user", "admin"];

    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid user role.",
      });
    }

    const existingEmail = email
      ? await User.findOne({ email: email.toLowerCase(), _id: { $ne: id } })
      : null;

    if (existingEmail) {
      return res.status(400).json({
        message: "Email is already used by another account.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(role !== undefined && { role }),
        ...(allergies !== undefined && { allergies }),
        ...(dietaryPreferences !== undefined && { dietaryPreferences }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update user.",
      error: error.message,
    });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete user.",
      error: error.message,
    });
  }
};