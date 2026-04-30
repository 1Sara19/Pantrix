import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { recipeId, rating, comment } = req.body;

    const review = await Review.create({
      userId: req.user._id,
      recipeId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: "Error adding review" });
  }
};

export const getReviewsByRecipe = async (req, res) => {
  try {
    const reviews = await Review.find({
      recipeId: req.params.recipeId,
      visible: true,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reviews" });
  }
};

export const hideReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { visible: false },
      { new: true }
    );

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error hiding review" });
  }
};

export const showReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { visible: true },
      { new: true }
    );

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error showing review" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};