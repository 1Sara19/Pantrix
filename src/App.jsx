import { useState } from "react";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";

function App() {
  const [page, setPage] = useState("profile");

  if (page === "home") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF8F0",
          color: "#4A3F35",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1>Home Page Coming Soon</h1>
        <p style={{ marginTop: "0.75rem", marginBottom: "1.5rem" }}>
          This is a temporary placeholder for the home page.
        </p>
        <button
          onClick={() => setPage("profile")}
          style={{
            background: "#8B6F47",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.25rem",
            cursor: "pointer",
          }}
        >
          Go to Profile
        </button>
      </div>
    );
  }

  if (page === "contact") {
    return <ContactUs setPage={setPage} />;
  }

  return <Profile setPage={setPage} />;
}

export default App;