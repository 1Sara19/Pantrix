import { useEffect, useState } from "react";
import { Funnel, ChefHat } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeList from "../components/RecipeList";
import "../styles/pages/Home.css";
import { toast } from "sonner";
import { suggestRecipes } from "../services/recipeService";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({
    cookTime: "",
    dietary: [],
    exclude: "",
  });

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const savedMessage = localStorage.getItem("welcomeMessage");

    if (savedMessage) {
      toast.success(savedMessage, {
        style: {
          background: "var(--primary-color)",
          color: "#fff",
          border: "1px solid var(--border-color)",
        },
      });
      localStorage.removeItem("welcomeMessage");
    }
  }, []);


  useEffect(() => {
    if (ingredients.length === 0) {
      setRecipes([]);
      setLoading(false);
      setPage(1);
      setHasMore(false);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      setPage(1);

      try {
        const data = await suggestRecipes(ingredients, filters, 1, 6);

        setRecipes(data.recipes || []);
        setHasMore(data.hasMore ?? true);

        if (data.source === "ai") {
          toast.success("AI generated new recipes!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error. Please try again.");
        setRecipes([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(delay);
  }, [ingredients, filters]);

  const handleLoadMore = async () => {
    if (ingredients.length === 0 || loadingMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const data = await suggestRecipes(ingredients, filters, nextPage, 6);

      setRecipes((prev) => [...prev, ...(data.recipes || [])]);
      setHasMore(data.hasMore ?? true);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-hero">
          <div className="hero-badge">
            <ChefHat size={18} />
            <span>Smart Recipe Matching</span>
          </div>

          <h1 className="hero-title">What can you cook today?</h1>

          <p className="hero-subtitle">
            Enter the ingredients you have, and we'll find the perfect recipes
            for you – reducing waste and saving time!
          </p>
        </div>

        <SearchBar ingredients={ingredients} setIngredients={setIngredients} />

        <button
          type="button"
          className="filter-open-btn"
          onClick={() => setShowFilterModal(true)}
          style={{ marginTop: "16px" }}
        >
          <Funnel size={20} />
          <span>Filters</span>
        </button>

        <div className="home-content">
          <aside className="home-sidebar desktop-filter">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </aside>

          <main className="home-main">
            <RecipeList
              recipes={recipes}
              loading={loading}
              loadingMore={loadingMore}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </main>
        </div>
      </div>

      {showFilterModal && (
        <div
          className="filter-modal-overlay"
          onClick={() => setShowFilterModal(false)}
        >
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="filter-modal-close"
              onClick={() => setShowFilterModal(false)}
            >
              ×
            </button>

            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
}