import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RecipeList from "../components/RecipeList";
import "../styles/Home.css";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [filters, setFilters] = useState({
    cookTime: "",
    dietary: [],
    exclude: "",
  });

  return (
    <div className="home-page">
      <Navbar />

      <div className="home-container">
        <SearchBar
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <div className="home-content">
          <aside className="home-sidebar">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </aside>

          <main className="home-main">
            <RecipeList ingredients={ingredients} filters={filters} />
          </main>
        </div>
      </div>
    </div>
  );
}