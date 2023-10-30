import { CiSearch, CiGlobe } from "react-icons/ci";
import { BiUserCircle } from "react-icons/bi";
import {
  Logo,
  ActiveHome,
  InactiveAnswer,
  InactiveFollowing,
  InactiveNotification,
  InactiveSpaces,
} from "../assets/icons/IconCollection";
import UserDropdown from "./NavDropdowns/UserDropdown";
import LanguageDropdown from "./NavDropdowns/LanguageDropdown";

import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [inputBoxVisibility, setInputBoxVisibility] = useState(false);
  const [userDropdownVisibility, setUserDropdownVisibility] = useState(false);
  const userRef = useRef();
  const [languageDropdownVisibility, setLanguageDropdownVisibility] =
    useState(false);
  const languageRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!userRef.current.contains(e.target)) {
        setUserDropdownVisibility(false);
      }
      if (!languageRef.current.contains(e.target)) {
        setLanguageDropdownVisibility(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInputBoxVisibility = (e) => {
    e.stopPropagation();
    setInputBoxVisibility(!inputBoxVisibility);
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    setUserDropdownVisibility(!userDropdownVisibility);
  };

  const handleLanguageClick = (e) => {
    e.stopPropagation();
    setLanguageDropdownVisibility(!languageDropdownVisibility);
  };

  return (
    <header className="hidden navSmall:block border-b bg-white border-[#dee0e1] fixed top-0 left-0 right-0 z-40">
      <nav className="max-w-[1100px] h-[50px] m-auto flex flex-row items-center">
        <div className="mr-6 h-full">
          <Logo width={"87.8261px"} height={"50px"} fill={"rgb(185, 43, 39)"} />
        </div>
        <ul className="h-full flex gap-5">
          {/* Home on the Navbar */}
          <li className="h-full relative flex items-center px-2 group cursor-pointer">
            <ActiveHome />
            <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
            <div className="absolute bg-white py-2 px-4 w-fit right-[-30%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
              Home
            </div>
          </li>
          {/* Following on the Navbar */}
          <li className="h-full relative flex items-center px-2 group cursor-pointer">
            <InactiveFollowing />
            <div className="absolute hidden h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
            <div className="absolute bg-white py-2 px-4 w-fit right-[-45%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
              Following
            </div>
          </li>
          {/* Answer on the Navbar */}
          <li className="h-full relative flex items-center px-2 group cursor-pointer">
            <InactiveAnswer />
            <div className="absolute hidden h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
            <div className="absolute bg-white py-2 px-4 w-fit right-[-36%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
              Answer
            </div>
          </li>

          {/* Spaces on the Navbar */}
          <li className="h-full relative flex items-center px-2 group cursor-pointer">
            <InactiveSpaces />
            <div className="absolute hidden h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
            <div className="absolute bg-white py-2 px-4 w-fit right-[-35%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
              Spaces
            </div>
          </li>

          {/* Notification on the Navbar */}
          <li className="h-full relative flex items-center px-2 group cursor-pointer">
            <InactiveNotification />
            <div className="absolute hidden h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
            <div className="absolute bg-white py-2 px-4 w-fit right-[-60%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
              Notification
            </div>
          </li>
        </ul>
        <div className={`flex w-full`}>
          <form className="mx-3 flex-auto">
            <div className="border border-[#dee0e1] px-2 py-1 rounded-md flex focus-within:border-[#2e69ff]">
              <button className="mr-1">
                <CiSearch size={16} />
              </button>
              <input
                className="h-full w-full text-sm font-light min-h-[26px] focus:outline-none"
                placeholder="Search Quora"
                type="text"
                onFocus={handleInputBoxVisibility}
                onBlur={handleInputBoxVisibility}
              />
            </div>
          </form>

          <div
            className={`flex items-center mr-3 ${
              inputBoxVisibility && "hidden"
            }`}
          >
            <button className="text-sm text-[#636466] hover:bg-[#6364661a] rounded-full border border-[#dee0e1] h-[30px] px-4 min-w-[30px]">
              Try Quora+
            </button>
          </div>

          <div
            onClick={handleUserClick}
            ref={userRef}
            className={`px-2 mr-1 flex items-center relative ${
              inputBoxVisibility && "hidden"
            }`}
          >
            <BiUserCircle
              className="cursor-pointer"
              size={30}
              color="#636466"
            />
            {userDropdownVisibility && <UserDropdown />}
          </div>

          <div
            ref={languageRef}
            onClick={handleLanguageClick}
            className={`px-2 mr-1 flex items-center relative ${
              inputBoxVisibility && "hidden"
            }`}
          >
            <CiGlobe className="cursor-pointer" size={30} color="#636466" />
            {languageDropdownVisibility && <LanguageDropdown />}

            {/* {dropdownVisibility &&
              createPortal(
                <NavDropdown onClose={dropdownToggle} />,
                dropDownRoot
              )} */}
          </div>
        </div>

        <div className="flex-shrink-0">
          <button className="bg-[#b92b27] text-white text-sm px-3 h-[30px] rounded-full">
            Add question
          </button>
        </div>
      </nav>
    </header>
  );
}
