import { useEffect, useState } from "react";
import { Funnel, ChefHat } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeList from "../components/RecipeList";
import "../styles/pages/Home.css";
import {toast} from "sonner";

export default function Home() {

  useEffect(() => {
    const savedMessage = localStorage.getItem("welcomeMessage");

    if (savedMessage) {
      toast.success(savedMessage, {
        style: {
          background: "var(--primary-color)",
          color: "#fff",
          border: "1px solid var(--border-color)",
        },
      });      localStorage.removeItem("welcomeMessage");
    }
  }, []);

  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({
    cookTime: "",
    dietary: [],
    exclude: "",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
        <div className="home-page">
          <div className="home-container">
            {/* HERO SECTION */}
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

            <SearchBar
                ingredients={ingredients}
                setIngredients={setIngredients}
            />

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
                <RecipeList ingredients={ingredients} filters={filters} />
              </main>
            </div>
          </div>

          {showFilterModal && (
              <div
                  className="filter-modal-overlay"
                  onClick={() => setShowFilterModal(false)}
              >
                <div
                    className="filter-modal"
                    onClick={(e) => e.stopPropagation()}
                >
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