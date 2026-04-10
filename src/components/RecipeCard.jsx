import { useEffect, useState } from "react";
import { Heart, Clock3, Share2, X, Star, ChevronDown } from "lucide-react";
import RestrictedModal from "./RestrictedModal";
import "../styles/components/RecipeCard.css";

export default function RecipeCard({
  id,
  title,
  matchScore = 0,
  cookTime,
  servings,
  tags = [],
  dietary = [],
  image,
  ingredients = [],
  instructions = [],
  missingIngredients = [],
}) {
  const [showRecipe, setShowRecipe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState("");

  const likeKey = `liked_recipe_${id}`;
  const reviewKey = `recipe_reviews_${id}`;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const savedLike = localStorage.getItem(likeKey);
    setLiked(savedLike === "true");

    const savedReviews = localStorage.getItem(reviewKey);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [likeKey, reviewKey]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    const next = !liked;
    setLiked(next);
    localStorage.setItem(likeKey, String(next));
    showToast(next ? "Recipe saved successfully!" : "Recipe removed from favorites");
  };

  const handleOpenReview = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    setShowReviewBox(true);
  };

  const handleSubmitReview = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    if (rating === 0) {
      showToast("Please select a rating");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(reviewKey, JSON.stringify(updatedReviews));

    setRating(0);
    setComment("");
    setShowReviewBox(false);
    showToast("Review submitted successfully");
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
          title: title,
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

  const matchedCount = ingredients.length - missingIngredients.length;

  return (
    <>
      {toast && <div className="recipe-toast">{toast}</div>}

      {/* Outside Card */}
      <div className="recipe-card">
        <div className="recipe-card-image-wrapper">
          <img src={image} alt={title} className="recipe-card-image" />

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

            <span className="recipe-meta-dot">•</span>

            <div className="recipe-meta-item">
              <span>{servings}</span>
            </div>
          </div>

          <p className="recipe-match-text">
            {matchedCount} of {ingredients.length} ingredients matched
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

      {/* Main Recipe Modal */}
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
                    <span>•</span>
                    <span>{servings}</span>
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

              <img src={image} alt={title} className="recipe-modal-image" />

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
                    const isMissing = missingIngredients.includes(item);

                    return (
                      <li
                        key={index}
                        className={`recipe-ingredient-item ${
                          isMissing ? "missing" : "available"
                        }`}
                      >
                        <span className="ingredient-dot"></span>
                        <span className="ingredient-name">{item}</span>
                        {isMissing && (
                          <span className="missing-ingredient">(need to buy)</span>
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
                      <div className="review-item" key={review.id}>
                        <p className="review-stars-display">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </p>
                        {review.comment && <p>{review.comment}</p>}
                        <small>{review.date}</small>
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

      {/* Review Modal */}
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