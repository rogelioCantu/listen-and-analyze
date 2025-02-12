import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ auth }: { auth: any }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-2xl">
          <Link to="/">Listen and Analyze</Link>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          {auth ? (
            <div>
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/playlists" className="text-white hover:text-gray-300">
                Paylists
              </Link>
              <Link to="/artists" className="text-white hover:text-gray-300">
                Artists
              </Link>
              <Link
                to="/top-listening"
                className="text-white hover:text-gray-300"
              >
                Top Artists / Songs
              </Link>
              <Link to="/about" className="text-white hover:text-gray-300">
                About
              </Link>
            </div>
          ) : (
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/" className="block text-white hover:text-gray-300">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block text-white hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link to="/about" className="block text-white hover:text-gray-300">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
