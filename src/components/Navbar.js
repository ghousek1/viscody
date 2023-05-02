import React, { useContext, useState } from "react";
import { Link } from "react-scroll";
import { ThemeContext } from "../context/ThemeContext";
import DataTypeDropDown from "./DataTypeDropDown";

function NavBar() {
  const [sideMenu, setSideMenu] = useState(false);

  const [userThemeMode, toggleUserThemeMode] = useContext(ThemeContext);

  const toggleSideMenu = () => {
    setSideMenu(!sideMenu);
  };

  const toggleTheme = () => {
    toggleUserThemeMode();
  };

  const navlinks = [
    { name: "Import", url: "import" },
    { name: "Download", url: "download" },
    { name: "Settings", url: "settings" },
    { name: "Github", url: "github" },
  ];

  return (
    <nav
      id="navbar"
      className="flex h-[2rem] w-full items-center justify-between px-3 md:px-6 my-2 md:my-2 "
    >
      <div className="flex flex-row gap-5 ">
      <a href="/" className="z-[100] cursor-pointer">
        <span className="tracking-[0.15rem] bold  font-monospace text-[0.9rem] leading-[1.5rem] font-[450] md:text-[1.2rem] md:leading-[2rem] md:font-[500]">Viscody</span>
      </a>
      <DataTypeDropDown/>
      </div>
      <div
        className={`${sideMenu ? "flex" : "hidden md:flex"}
         fixed left-0  top-0 z-[100] h-full  w-full flex-col items-end justify-center
         p-8 backdrop-blur-md md:relative md:h-auto md:w-auto md:flex-row md:items-center 
         md:justify-center md:bg-transparent md:p-0`}
      >
        <ul
          className=" mr-4 flex flex-col font-monospace text-[0.8rem] leading-[1.5rem] md:text-[0.9rem] md:leading-[1.5rem]
           font-[410] tracking-[0.14rem] md:flex-row "
        >
          {navlinks.map((navLink) => (
            <li key={navLink.name} className="px-5 py-3 md:px-4 md:py-0">
              <Link
                onClick={toggleSideMenu}
                className=""
                to={navLink.url}
                spy={true}
                smooth={true}
                offset={50}
                duration={1000}
              >
                <span className="">{navLink.name}</span>
              </Link>
            </li>
          ))}

          <li>
            <i
              onClick={toggleTheme}
              className=" fa-solid fa-circle-half-stroke 
               fa-flip-horizontal px-5 py-3 text-[1.2rem] md:px-2 md:py-0"
            ></i>
          </li>
        </ul>
      </div>
      <i
        onClick={toggleSideMenu}
        className={` fas fa-${sideMenu ? "close" : "bars-staggered"} 
                    z-[100] w-[1rem] cursor-pointer text-center text-[1rem] text-xl md:hidden `}
      />
    </nav>
  );
}

export default NavBar;
