import Review from "../models/Review.js";
import Recipe from "../models/Recipe.js";

export const addReview = async (req, res) => {
  try {
    const { recipeId, rating, comment } = req.body;

    if (!recipeId || !rating) {
      return res.status(400).json({ message: "recipeId and rating are required" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const review = await Review.create({
      userId: req.user._id,
      recipeId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByRecipe = async (req, res) => {
  try {
    const reviews = await Review.find({
      recipeId: req.params.recipeId,
      visible: true,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name email")
      .populate("recipeId", "title name image imageUrl")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hideReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { visible: false },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("recipeId", "title name image imageUrl");

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { visible: true },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("recipeId", "title name image imageUrl");

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};