import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    const favorite = await Favorite.create({
      userId: req.user._id,
      recipeId,
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: "Already exists or error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userId: req.user._id,
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting favorite" });
  }
};