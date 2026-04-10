/*
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageComments from "./pages/ManageComments";
import RecipeLimits from "./pages/RecipeLimits";
import ReviewReports from "./pages/ReviewReports";
import ManageFilters from "./pages/ManageFilters";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/comments" element={<ManageComments />} />
        <Route path="/admin/limits" element={<RecipeLimits />} />
        <Route path="/admin/reports" element={<ReviewReports />} />
        <Route path="/admin/filters" element={<ManageFilters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
/*
import Login from "./pages/Login";

function App() {
    return <Login />;
}

export default App;
*/

/*
import SignUp from "./pages/SignUp";

function App() {
    return <SignUp />;
}

export default App;*/



/*
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "./components/ui/Card";

function App() {
    return (
        <div className="container mt-lg">
            <Card>
                <CardHeader>
                    <CardTitle>Test UI</CardTitle>
                    <CardDescription>Check if all components work</CardDescription>
                </CardHeader>

                <CardContent>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                    <br />
                    <Button variant="default">Test Button</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;

 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RestrictedModal from "./components/RestrictedModal";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer.jsx";

function HomeTest() {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Pantrix Home</h1>
            <p>Test page</p>

            <button className="btn btn-primary" onClick={() => setOpen(true)}>
                Open Restricted Modal
            </button>

            <RestrictedModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}

function AppContent() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeTest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;

