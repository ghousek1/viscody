import React, { useContext, useState } from "react";
import { Link } from "react-scroll";
import { ThemeContext } from "../context/ThemeContext";

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
    { name: "Github Repo", url: "githubrepo" },
  ];

  return (
    <nav
      id="navbar"
      className="flex h-[2rem] w-full items-center justify-between px-3 md:px-6 my-2 md:my-2 "
    >
      <a href="/" className="z-[100] cursor-pointer">
        <span className=" bold text-3xl font-[500]">Viscody</span>
      </a>
      <div
        className={`${sideMenu ? "flex" : "hidden md:flex"}
         fixed left-0  top-0 z-[100] h-full  w-full flex-col items-end justify-center
         p-8 backdrop-blur-md md:relative md:h-auto md:w-auto md:flex-row md:items-center 
         md:justify-center md:bg-transparent md:p-0`}
      >
        <ul
          className=" mr-4 flex flex-col font-monospace text-[1.5rem]
           font-[400] leading-10 tracking-wide md:flex-row md:text-[1rem] md:leading-8"
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
                    z-[100] w-[1rem] cursor-pointer text-center text-xl md:hidden `}
      />
    </nav>
  );
}

export default NavBar;
