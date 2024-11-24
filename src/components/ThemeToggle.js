import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? "light-theme" : "dark-theme";
    localStorage.setItem("theme", isDarkMode ? "light-theme" : "dark-theme");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        color: isDarkMode ? "#FFD700" : "#4B5563",
      }}
      aria-label="Toggle theme"
    >
      <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
    </button>
  );
};

export default ThemeToggle;
