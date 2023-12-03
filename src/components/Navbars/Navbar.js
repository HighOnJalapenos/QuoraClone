import { CiSearch, CiGlobe } from "react-icons/ci";
import { BiUserCircle } from "react-icons/bi";
import {
  Logo,
  ActiveHome,
  InactiveAnswer,
  InactiveFollowing,
  InactiveNotification,
  InactiveSpaces,
  InactiveHome,
  ActiveFollowing,
  ActiveAnswer,
  ActiveSpaces,
  ActiveNotification,
} from "../../assets/icons/IconCollection";
import UserDropdown from "./NavDropdowns/UserDropdown";
import LanguageDropdown from "./NavDropdowns/LanguageDropdown";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import QuestionModal from "../Portal/QuestionModal";
import { createPortal } from "react-dom";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const [inputBoxVisibility, setInputBoxVisibility] = useState(false);
  const [userDropdownVisibility, setUserDropdownVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const userRef = useRef();
  const [languageDropdownVisibility, setLanguageDropdownVisibility] =
    useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const portal = document.getElementById("portal");
  const languageRef = useRef();
  const navigate = useNavigate();

  const openQuestionModal = () => {
    document.documentElement.style.overflow = "hidden";
    setShowQuestionModal(true);
  };

  const closeQuestionModal = () => {
    document.documentElement.style.overflow = "";
    setShowQuestionModal(false);
  };

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

  const notify = (message) => {
    toast(`${message}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const search = (e) => {
    e.preventDefault();
    setSearching(false);
    navigate("/search", { state: { term: searchTerm } });
  };

  return (
    <>
      <header className="hidden navSmall:block border-b bg-white border-[#dee0e1] fixed top-0 left-0 right-0 z-40">
        <nav className="max-w-[1100px] h-[50px] m-auto flex flex-row items-center z-10">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="mr-6 h-full cursor-pointer"
          >
            <Logo
              width={"87.8261px"}
              height={"50px"}
              fill={"rgb(185, 43, 39)"}
            />
          </div>
          <ul className="h-full flex gap-5">
            {/* Home on the Navbar */}

            <li className="h-full relative flex items-center px-2 group cursor-pointer">
              <NavLink to="/">
                {({ isActive, isPending, isTransitioning }) => (
                  <>
                    {isActive ? <ActiveHome /> : <InactiveHome />}
                    {isActive && (
                      <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
                    )}
                    <div className="absolute bg-white py-2 px-4 w-fit right-[-30%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
                      Home
                    </div>
                  </>
                )}
              </NavLink>
            </li>
            {/* Following on the Navbar */}
            <li className="h-full relative flex items-center px-2 group cursor-pointer">
              <NavLink to="/following">
                {({ isActive, isPending, isTransitioning }) => (
                  <>
                    {isActive ? <ActiveFollowing /> : <InactiveFollowing />}
                    {isActive && (
                      <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
                    )}
                    <div className="absolute bg-white py-2 px-4 w-fit right-[-45%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
                      Following
                    </div>
                  </>
                )}
              </NavLink>
            </li>
            {/* Answer on the Navbar */}
            <li className="h-full relative flex items-center px-2 group cursor-pointer">
              <NavLink to="/answer">
                {({ isActive, isPending, isTransitioning }) => (
                  <>
                    {isActive ? <ActiveAnswer /> : <InactiveAnswer />}
                    {isActive && (
                      <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
                    )}
                    <div className="absolute bg-white py-2 px-4 w-fit right-[-36%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
                      Answer
                    </div>
                  </>
                )}
              </NavLink>
            </li>

            {/* Spaces on the Navbar */}
            <li className="h-full relative flex items-center px-2 group cursor-pointer">
              <NavLink to="/spaces">
                {({ isActive, isPending, isTransitioning }) => (
                  <>
                    {isActive ? <ActiveSpaces /> : <InactiveSpaces />}
                    {isActive && (
                      <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
                    )}
                    <div className="absolute bg-white py-2 px-4 w-fit right-[-35%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
                      Spaces
                    </div>
                  </>
                )}
              </NavLink>
            </li>

            {/* Notification on the Navbar */}
            <li className="h-full relative flex items-center px-2 group cursor-pointer">
              <NavLink to="/notification">
                {({ isActive, isPending, isTransitioning }) => (
                  <>
                    {isActive ? (
                      <ActiveNotification />
                    ) : (
                      <InactiveNotification />
                    )}
                    {isActive && (
                      <div className="absolute h-[3px] left-0 right-0 bottom-0 rounded-tl-full rounded-tr-full bg-[#b92b27]"></div>
                    )}
                    <div className="absolute bg-white py-2 px-4 w-fit right-[-60%] text-xs rounded-full top-[calc(100%+8px)] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 group-hover:translate-y-0 -translate-y-1 pointer-events-none border border-[#dee0e1] transition-all ease-in delay-100 duration-100 origin-top">
                      Notification
                    </div>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          <div className={`flex w-full`}>
            <form onSubmit={search} className="mx-3 flex-auto">
              <div className="border border-[#dee0e1] px-2 py-1 rounded-md flex focus-within:border-[#2e69ff]">
                <button className="mr-1">
                  <CiSearch size={16} />
                </button>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-full w-full text-sm font-light min-h-[26px] focus:outline-none"
                  placeholder="Search Quora"
                  type="text"
                  onFocus={(e) => {
                    handleInputBoxVisibility(e);
                    setSearching(true);
                  }}
                  onBlur={(e) => {
                    setSearching(false);
                    handleInputBoxVisibility(e);
                  }}
                />
              </div>
            </form>

            <div
              className={`flex items-center mr-3 ${
                inputBoxVisibility && "hidden"
              }`}
            >
              <button
                onClick={() => navigate("/quoraplus")}
                className="text-sm text-[#636466] hover:bg-[#6364661a] rounded-full border border-[#dee0e1] h-[30px] px-4 min-w-[30px]"
              >
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
            <button
              onClick={openQuestionModal}
              className="bg-[#b92b27] text-white text-sm px-3 h-[30px] rounded-full"
            >
              Add question
            </button>
            {showQuestionModal &&
              createPortal(
                <QuestionModal notify={notify} onClose={closeQuestionModal} />,
                portal
              )}
          </div>
        </nav>
      </header>
      {searching && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(36,36,36,0.9)] z-30 transition-all"></div>
      )}
    </>
  );
}
