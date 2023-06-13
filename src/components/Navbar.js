import React, { useContext, useState } from "react";
import { Link } from "react-scroll";
import { ThemeContext } from "../context/ThemeContext";
import DataTypeDropDown from "./DataTypeDropDown";

function NavBar() {
  const [sideMenu, setSideMenu] = useState(false);

  const [ , toggleUserThemeMode] = useContext(ThemeContext);

  const toggleSideMenu = () => {
    setSideMenu(!sideMenu);
  };

  const toggleTheme = () => {
    toggleUserThemeMode();
  };

  const navlinks = [
    { name: "import", url: "import" },
    { name: "download", url: "download" },
    { name: "settings", url: "settings" },
    { name: "github", url: "github" },
  ];

  return (
    <nav
      id="navbar"
      className="flex h-[2rem] w-full items-center justify-between px-3
       md:px-6 py-4 my-2 md:my-2 border-b-2 "
    >
      <div className="flex flex-row gap-5 align-middle">
      <a href="/" className="z-[100] cursor-pointer">
        <span className="  
        font-uno text-[1rem] md:text-[1.3rem]
        font-[450] md:font-[500] tracking-wider ">Viscody</span>
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
          className=" mr-4 flex flex-col font-uno text-[0.9rem] 
           md:text-[1rem] tracking-wider
           font-[410]  md:flex-row "
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
                    z-[100] w-[1rem] cursor-pointer text-center text-[0.85rem] md:hidden `}
      />
    </nav>
  );
}

export default NavBar;
