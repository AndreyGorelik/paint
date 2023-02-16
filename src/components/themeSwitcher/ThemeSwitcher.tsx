import { useState } from "react";
import "./themeswitch.css";
import Bulb from "../../assets/images/switch.png";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(false);

  document.documentElement.setAttribute("data-theme", theme ? "dark" : "light");

  return (
    <div className="theme-switcher" onClick={() => setTheme(!theme)}>
      <img src={Bulb} alt="switch theme" />
    </div>
  );
};

export default ThemeSwitcher;
