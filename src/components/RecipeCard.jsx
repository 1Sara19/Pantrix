import { useEffect, useState } from "react";
import { Heart, Clock3, Share2, X, Star, ChevronDown, Users } from "lucide-react";
import RestrictedModal from "./RestrictedModal";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import { getReviewsByRecipe, addReview } from "../services/reviewService";
import fallbackFoodImage from "../assets/images/fallbackImg.png";
import "../styles/components/RecipeCard.css";
import normalizeIngredients from "../services/normalizeIngredients.js";

export default function RecipeCard({
  id,
  title,
  cookTime,
  servings,
  tags = [],
  dietary = [],
  image,
  ingredients = [],
  instructions = [],
  matchedIngredients = [],
  matchScore = 0,
}) {
  const [showRecipe, setShowRecipe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState("");

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      if (!isLoggedIn) {
        setLiked(false);
        return;
      }

      try {
        const favorites = await getFavorites();
        const isFavorite = favorites.some(
          (recipe) => (recipe._id || recipe.id) === id
        );
        setLiked(isFavorite);
      } catch (error) {
        console.error(error);
        setLiked(false);
      }
    };

    loadFavoriteStatus();
  }, [id, isLoggedIn]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviewsByRecipe(id);
        setReviews(data || []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      }
    };

    if (id) loadReviews();
  }, [id]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    try {
      if (liked) {
        await removeFavorite(id);
        setLiked(false);
        showToast("Removed from favorites");
      } else {
        await addFavorite(id);
        setLiked(true);
        showToast("Added to favorites");
      }

      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      showToast("Something went wrong");
    }
  };

  const handleOpenReview = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    setShowReviewBox(true);
  };

  const handleSubmitReview = async () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    if (rating === 0) {
      showToast("Please select a rating");
      return;
    }

    try {
      const newReview = await addReview({
        recipeId: id,
        rating,
        comment,
      });

      setReviews((prev) => [newReview, ...prev]);

      setRating(0);
      setComment("");
      setShowReviewBox(false);
      showToast("Review submitted successfully");
    } catch (error) {
      console.error(error);
      showToast("Failed to submit review");
    }
  };

  const handleShare = async () => {
    const recipeText = `
${title}

Cook Time: ${cookTime} minutes
Servings: ${servings}

Ingredients:
${ingredients.map((item) => `- ${item}`).join("\n")}

Check it out on Pantrix:
${window.location.origin}
    `.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: recipeText,
        });
        showToast("Recipe shared successfully!");
      } else {
        await navigator.clipboard.writeText(recipeText);
        showToast("Recipe copied to clipboard!");
      }
    } catch (error) {
      showToast("Sharing cancelled");
    }
  };

  const recipeTags = [...tags, ...dietary].filter(
    (value, index, arr) => value && arr.indexOf(value) === index
  );

  const matchedCount = matchedIngredients.length;

  const isIngredientMatched = (ingredient) => {
    const [normalizedIngredient] = normalizeIngredients([ingredient]);

    return matchedIngredients.some((matched) => {

      const [normalizedMatched] = normalizeIngredients([matched]);

      if (!normalizedIngredient || !normalizedMatched) return false;
      return (

        normalizedIngredient.includes(normalizedMatched) ||
        normalizedMatched.includes(normalizedIngredient)
      
      );
    });
  };

  return (
    <>
      {toast && <div className="recipe-toast">{toast}</div>}

      <div className="recipe-card">
        <div className="recipe-card-image-wrapper">
          <img
            src={image && image.startsWith("http") ? image : fallbackFoodImage}
            alt={title}
            className="recipe-card-image"
            onError={(e) => {
              e.currentTarget.src = fallbackFoodImage;
            }}
          />

          <button
            type="button"
            className={`recipe-heart-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
            aria-label="Toggle favorite"
          >
            <Heart
              size={18}
              fill={liked ? "white" : "none"}
              stroke={liked ? "white" : "black"}
            />
          </button>
        </div>

        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{title}</h3>

          <div className="recipe-card-meta">
            <div className="recipe-meta-item">
              <Clock3 size={15} />
              <span>{cookTime} minutes</span>
            </div>

            <div className="recipe-meta-item">
              <Users size={15} />
              <span>{servings}</span>
            </div>
          </div>

          <p className="recipe-match-text">
            {matchedCount} of {ingredients.length} ingredients matched
            {matchScore ? ` • ${matchScore}% match` : ""}
          </p>

          {recipeTags.length > 0 && (
            <div className="recipe-dietary-tags">
              {recipeTags.slice(0, 2).map((item, index) => (
                <span
                  className={`recipe-dietary-tag ${
                    item.toLowerCase() === "healthy" ? "green" : ""
                  }`}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="recipe-card-footer">
            <button
              className="recipe-card-button recipe-card-button-primary"
              onClick={() => setShowRecipe(true)}
            >
              <span>View Recipe</span>
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>

      {showRecipe && (
        <div
          className="recipe-modal-overlay"
          onClick={() => setShowRecipe(false)}
        >
          <div
            className="recipe-modal recipe-modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="recipe-modal-close"
              onClick={() => setShowRecipe(false)}
              aria-label="Close recipe"
            >
              <X size={18} />
            </button>

            <div className="recipe-modal-scroll">
              <div className="recipe-modal-header">
                <div>
                  <h2 className="recipe-modal-title">{title}</h2>

                  <div className="recipe-modal-meta">
                    <span className="recipe-meta-with-icon">
                      <Clock3 size={16} />
                      {cookTime} min
                    </span>
                    <span className="recipe-meta-with-icon">
                      <Users size={16} />
                      {servings}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="recipe-share-btn"
                  onClick={handleShare}
                  aria-label="Share recipe"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <img
                src={image && image.startsWith("http") ? image : fallbackFoodImage}
                alt={title}
                className="recipe-modal-image"
                onError={(e) => {
                  e.currentTarget.src = fallbackFoodImage;
                }}
              />

              {recipeTags.length > 0 && (
                <div className="recipe-modal-section">
                  <h3>Tags</h3>
                  <div className="recipe-modal-tags">
                    {recipeTags.map((item, index) => (
                      <span
                        key={index}
                        className={`recipe-dietary-tag ${
                          item.toLowerCase() === "healthy" ? "green" : ""
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="recipe-modal-section">
                <h3>Ingredients</h3>
                <ul className="recipe-ingredients-list">
                  {ingredients.map((item, index) => {
                    const available = isIngredientMatched(item);

                    return (
                      <li
                        key={index}
                        className={`recipe-ingredient-item ${
                          available ? "available" : "missing"
                        }`}
                      >
                        <span className="ingredient-dot"></span>
                        <span className="ingredient-name">{item}</span>
                        {!available && (
                          <span className="missing-ingredient">
                            (need to buy)
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="recipe-modal-section">
                <h3>Instructions</h3>
                <ol className="recipe-instructions-list">
                  {instructions.map((step, index) => (
                    <li key={index}>
                      <span className="instruction-number">{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="recipe-modal-section recipe-reviews-section">
                <div className="recipe-reviews-header">
                  <h3>Reviews</h3>
                  <button
                    className="leave-review-btn"
                    onClick={handleOpenReview}
                  >
                    Leave a Review
                  </button>
                </div>

                {reviews.length > 0 ? (
                  <div className="review-list">
                    {reviews.map((review) => (
                      <div className="review-item" key={review._id || review.id}>
                        <p className="review-stars-display">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </p>

                        {review.comment && <p>{review.comment}</p>}

                        <small>
                          {review.userId?.name
                            ? `By ${review.userId.name}`
                            : "Anonymous"}{" "}
                          {review.createdAt
                            ? `• ${new Date(review.createdAt).toLocaleDateString()}`
                            : ""}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews-text">
                    No reviews yet. Be the first to review this recipe!
                  </p>
                )}
              </div>
            </div>

            <div className="recipe-modal-actions">
              <button
                className={`recipe-card-button recipe-card-button-secondary save-btn-wide ${
                  liked ? "liked" : ""
                }`}
                onClick={handleLike}
              >
                <Heart
                  size={16}
                  fill={liked ? "white" : "none"}
                  stroke={liked ? "white" : "currentColor"}
                />
                <span>Save Recipe</span>
              </button>

              <button
                className="recipe-card-button recipe-card-button-outline close-btn-wide"
                onClick={() => setShowRecipe(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showReviewBox && (
        <div
          className="recipe-modal-overlay"
          onClick={() => setShowReviewBox(false)}
        >
          <div
            className="recipe-modal review-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="recipe-modal-close"
              onClick={() => setShowReviewBox(false)}
              aria-label="Close review modal"
            >
              <X size={18} />
            </button>

            <h3 className="review-modal-title">Leave a Review</h3>
            <p className="review-modal-subtitle">
              Share your experience with this recipe
            </p>

            <div className="review-form-group">
              <label>Rating</label>

              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`review-star ${star <= rating ? "active" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="review-form-group">
              <label>Your Comment (Optional)</label>
              <textarea
                className="review-textarea"
                rows="4"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button
              className="recipe-card-button recipe-card-button-primary review-submit-btn"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      <RestrictedModal
        isOpen={showRestrictedModal}
        onClose={() => setShowRestrictedModal(false)}
      />
    </>
  );
}