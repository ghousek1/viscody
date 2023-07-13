import { ReactElement, useContext } from "react";
import { IThemeContextType, ThemeContext } from "../context/ThemeContext";
import DataTypeDropDown from "./DataTypeDropDown";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from 'antd';

const content = (
  <div>
    <p>Settings TODO </p>
  </div>
);

const title = <span>Settings</span>;


interface NavBarProps{
  changeZoomIn(): void;
  changeZoomOut(): void;
  changeExpand(): void;
}
const NavBar = ({changeZoomIn,changeZoomOut,changeExpand}: NavBarProps): ReactElement => {
  const userThemeModeContext = useContext<IThemeContextType>(ThemeContext);

  const toggleTheme = (): void => {
    userThemeModeContext.toggleThemeMode();
  };

  const changeSettings = (): void=>{
    console.log("settings");
  }

  return (
    <nav
      id="navbar"
      className="flex h-[1.7rem] w-full items-center justify-between pl-3
       md:pl-5 py-5  border-b-1 "
    >
      <div className="flex flex-row gap-5 items-center justify-start">
        <a href="/" className="z-[100] cursor-pointer">
          <span
            className="  
        font-uno text-[0.8rem] md:text-[1rem]
        font-[400] md:font-[500] tracking-wider "
          >
            Viscody
          </span>
        </a>
        <DataTypeDropDown styleClassName = "w-[5.5rem] text-[0.8rem] md:text-[1rem]  font-[300] "/>
      </div>
      <div
        className="flex
           z-[100] justify-center
         h-auto w-auto flex-row items-center "
      >
        <ul
          className=" mr-4 flex font-uno text-[0.6rem] 
           md:text-[0.8rem] tracking-wider
           font-[300]  flex-row "
        >
          <li key="zoom-in" className="px-2 py-3 md:px-4 md:py-0">
          <button onClick={changeZoomIn}><i className="fa-solid fa-magnifying-glass-plus"></i></button>
          </li>
          <li key="zoom-out" className="px-2 py-3 md:px-4 md:py-0">
          <button onClick={changeZoomOut}><i className="fa-solid fa-magnifying-glass-minus"></i></button>
          </li>

          <li key="expand" className="px-2 py-3 md:px-4 md:py-0">
            <button onClick={changeExpand}><i className="fa-solid fa-expand"></i></button>
          </li>

         

        <Popover placement="bottomRight" title={title} content={content} trigger="click">
           <li key="settings" className="px-2 py-3 md:px-4 md:py-0">
            <button onClick={changeSettings}><i className="fa-solid fa-gear"></i></button>
           </li>
         </Popover>




          <li key="github" className="px-2 py-3 md:px-4 md:py-0">
            <a href="https://github.com/ghousek1/viscody" target="_blank">
            <i className="fa-brands fa-github"></i>
            </a>
          </li>

          <li key="theme" className="px-5 py-3 md:px-4 md:py-0 ">
            <button onClick={toggleTheme}><i className="fa-solid fa-circle-half-stroke fa-flip-horizontal"></i></button>
          </li>

        </ul>
      </div>
    </nav>
    
  );
};

export default NavBar;
