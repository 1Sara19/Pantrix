import { useState } from "react";
import { Funnel } from "lucide-react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeList from "../components/RecipeList";
import "../styles/pages/Home.css";

export default function Home() {
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
        <SearchBar
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <button
          type="button"
          className="filter-open-btn"
          onClick={() => setShowFilterModal(true)}
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