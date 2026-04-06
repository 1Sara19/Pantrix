import { useEffect, useState } from "react";
import "../styles/RecipeCard.css";

export default function RecipeCard({
  id,
  title,
  matchScore,
  cookTime,
  difficulty,
  image,
  ingredients = [],
  instructions = [],
  missingIngredients = [],
}) {
  const [showRecipe, setShowRecipe] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState("");

  const likeKey = `liked_recipe_${id}`;
  const reviewKey = `recipe_reviews_${id}`;

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
    setTimeout(() => setToast(""), 2000);
  };

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likeKey, String(next));
    showToast(next ? "Recipe added to favorites" : "Recipe removed from favorites");
  };

  const handleSubmitReview = () => {
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

  return (
    <>
      {toast && <div className="recipe-toast">{toast}</div>}

      <div className="recipe-card">
        <div className="recipe-card-image-wrapper">
          <img src={image} alt={title} className="recipe-card-image" />
          <div className="recipe-match-badge">
            <span className="match-badge-icon">✨</span>
            <span className="match-badge-text">{matchScore}% Match</span>
          </div>
        </div>

        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{title}</h3>

          <div className="recipe-card-meta">
            <div className="recipe-meta-item">
              <span className="recipe-meta-icon">⏱️</span>
              <span className="recipe-meta-text">{cookTime}</span>
            </div>

            <div className="recipe-meta-item">
              <span className="recipe-meta-icon">📊</span>
              <span className="recipe-meta-text">{difficulty}</span>
            </div>
          </div>
        </div>

        <div className="recipe-card-footer">
          <button
            className="recipe-card-button recipe-card-button-primary"
            onClick={() => setShowRecipe(true)}
          >
            View Recipe
          </button>

          <button
            className={`recipe-card-button recipe-card-button-secondary ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            ❤️
          </button>
        </div>
      </div>

      {showRecipe && (
        <div className="recipe-modal-overlay" onClick={() => setShowRecipe(false)}>
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="recipe-modal-close"
              onClick={() => setShowRecipe(false)}
            >
              ×
            </button>

            <img src={image} alt={title} className="recipe-modal-image" />

            <h2 className="recipe-modal-title">{title}</h2>

            <div className="recipe-modal-meta">
              <span>{cookTime}</span>
              <span>•</span>
              <span>{difficulty}</span>
              <span>•</span>
              <span>{matchScore}% Match</span>
            </div>

            <div className="recipe-modal-section">
              <h3>Ingredients</h3>
              <ul>
                {ingredients.map((item, index) => {
                  const isMissing = missingIngredients.includes(item);

                  return (
                    <li key={index}>
                      {item} {isMissing && <span className="missing-ingredient">(missing)</span>}
                    </li>
                  );
                })}
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
                onClick={() => setShowReviewBox(true)}
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
        <div className="recipe-modal-overlay" onClick={() => setShowReviewBox(false)}>
          <div className="recipe-modal review-modal" onClick={(e) => e.stopPropagation()}>
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
    </>
  );
}