import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { developerStaticRoutes } from "../../utils/urlHelper";
import ImageComponent from "../ImageComponent";

const UserHeader = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { path: developerStaticRoutes.toDashBoard(), label: "Dashboard" },
    { path: developerStaticRoutes.toProjectsListing(), label: "Project" },
    { path: "/properties", label: "Properties" },
    { path: "/enquiries", label: "Enquiries" },
    { path: "/configurator", label: "Configurator" },
  ];

  const dropdownOptions = [
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
    { path: "/logout", label: "Logout" },
  ];

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`header_section user_header_section fixed top-0 w-full z-20 border-b border-[#FFFFFF4D] transition-all duration-300 
        ${ isScrolled ? "custom_header_bg" : "bg-transparent" }
        `}
    >
      <header className="rounded-full">
        <div className="mx-3 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <Link to="/" className="cursor-pointer">
                <ImageComponent src="../logo-white.svg" />
              </Link>
            </div>
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center rounded-full p-1 custom_menubar">
              {navLinks?.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full mx-1 transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? "bg-orangePrimary text-white"
                      : "text-white hover:bg-orangePrimary hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Right section */}
            <div className="hidden lg:flex items-center space-x-4">
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center cursor-pointer">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out transform ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
                >
                  {dropdownOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserHeader;
