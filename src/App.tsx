import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Playlists from "./pages/Playlists";
import Artists from "./pages/Artists";
import TopListening from "./pages/TopListening";
import About from "./pages/About";
import User from "./interfaces/UserInterface";

import { DataProvider } from "./data/DataContext";

function App() {
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    // Check if the user is authenticated by making an API request to the backend
    axios
      .get("http://localhost:5000/me", { withCredentials: true })
      .then((response) => setAuth(response.data))
      .catch(() => setAuth(null)); // If the user is not authenticated
  }, []);

  return (
    <DataProvider auth={auth}>
      <Router>
        <Navbar auth={auth} />
        <div className="pt-16">
          <Routes>
            <Route
              path="/dashboard"
              element={
                auth ? <Dashboard user={auth} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/playlists"
              element={
                auth ? <Playlists user={auth} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/artists"
              element={
                auth ? <Artists user={auth} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/top-listening"
              element={
                auth ? <TopListening user={auth} /> : <Navigate to="/login" />
              }
            />

            {/* Login route */}
            <Route
              path="/login"
              element={auth ? <Navigate to="/dashboard" /> : <Login />}
            />

            <Route path="/about" element={<About />} />

            {/* Redirect route */}
            <Route
              path="/"
              element={
                auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
