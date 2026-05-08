import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Root = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );
};

export default Root;
