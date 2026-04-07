/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/

/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/

/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import MealPlan from "./pages/MealPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MealPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/

/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import MealPlan from "./pages/MealPlan";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-planning" element={<MealPlan />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;