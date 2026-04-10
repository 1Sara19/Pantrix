import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import RestrictedModal from "./RestrictedModal";
import "../styles/components/RecipeCard.css";

export default function RecipeCard({
  id,
  title,
  matchScore,
  cookTime,
  difficulty,
  servings,
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

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    const next = !liked;
    setLiked(next);
    localStorage.setItem(likeKey, String(next));
  };

  const handleOpenReview = () => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      return;
    }

    setShowReviewBox(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) return;

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
  };

  return (
    <>
      <div className="recipe-card">
        <div className="recipe-card-image-wrapper">
          <img
            src={image}
            alt={title}
            className="recipe-card-image"
          />

          <button
            type="button"
            className={`recipe-heart-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <Heart
              size={18}
              fill={liked ? "white" : "none"}
              stroke={liked ? "white" : "black"}
            />
          </button>

          <div className="recipe-match-badge">
            {matchScore}% Match
          </div>
        </div>

        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{title}</h3>

          <div className="recipe-card-meta">
            <div className="recipe-meta-item">⏱️ {cookTime}</div>
            <div className="recipe-meta-item">👥 {servings}</div>
            <div className="recipe-meta-item">📊 {difficulty}</div>
          </div>

          {dietary.length > 0 && (
            <div className="recipe-dietary-tags">
              {dietary.map((item, index) => (
                <span className="recipe-dietary-tag" key={index}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="recipe-card-footer">
          <button
            className="recipe-card-button recipe-card-button-primary"
            onClick={() => setShowRecipe(true)}
          >
            View Recipe
          </button>
        </div>
      </div>

      {showRecipe && (
        <div
          className="recipe-modal-overlay"
          onClick={() => setShowRecipe(false)}
        >
          <div
            className="recipe-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="recipe-modal-close"
              onClick={() => setShowRecipe(false)}
            >
              ×
            </button>

            <img
              src={image}
              alt={title}
              className="recipe-modal-image"
            />

            <h2 className="recipe-modal-title">{title}</h2>

            <div className="recipe-modal-meta">
              <span>{cookTime}</span>
              <span>•</span>
              <span>{servings}</span>
              <span>•</span>
              <span>{difficulty}</span>
            </div>

            <div className="recipe-modal-section">
              <h3>Ingredients</h3>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>
                    {item}
                    {missingIngredients.includes(item) && (
                      <span className="missing-ingredient">(missing)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-modal-section">
              <h3>Instructions</h3>
              <ol>
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="recipe-modal-actions">
              <button
                className={`recipe-card-button recipe-card-button-secondary ${liked ? "liked" : ""}`}
                onClick={handleLike}
              >
                {liked ? "Liked ❤️" : "Like"}
              </button>

              <button
                className="recipe-card-button recipe-card-button-primary"
                onClick={handleOpenReview}
              >
                Review
              </button>
            </div>

            {reviews.length > 0 && (
              <div className="recipe-modal-section">
                <h3>Reviews</h3>
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
              </div>
            )}
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
            >
              ×
            </button>

            <h3>Leave a Review</h3>

            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`review-star ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="review-textarea"
              rows="4"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="recipe-card-button recipe-card-button-primary"
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