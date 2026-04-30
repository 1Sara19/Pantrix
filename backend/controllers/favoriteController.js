import Favorite from "../models/Favorite.js";
import Recipe from "../models/Recipe.js";

export const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId is required" });
    }

    const exists = await Favorite.findOne({
      userId: req.user._id,
      recipeId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      recipeId,
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user._id,
    }).populate("recipeId");

    const recipes = favorites.map((f) => f.recipeId);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    await Favorite.deleteOne({
      userId: req.user._id,
      recipeId: id,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};