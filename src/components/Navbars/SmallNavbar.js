import { GoSearch } from "react-icons/go";
import { MdClose } from "react-icons/md";
import {
  Logo,
  InactiveHome,
  InactiveAnswer,
  InactiveFollowing,
  InactiveNotification,
  InactiveSpaces,
  ActiveHome,
  ActiveFollowing,
  ActiveSpaces,
  ActiveAnswer,
  ActiveNotification,
} from "../../assets/icons/IconCollection";
import { BiUserCircle } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const SmallNavbar = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [showInputbox, setShowInputBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const id = useSelector((state) => state.auth.user.userId);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [showInputbox]);

  const handleInputBox = () => {
    setShowInputBox(!showInputbox);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/search", { state: { term: searchTerm } });
      setSearchTerm("");
    }
  };

  return (
    <header className="block navSmall:hidden border-b bg-white border-[#dee0e1] fixed top-0 left-0 right-0 z-40">
      <div className="h-11 bg-[#b92b27]">
        {showInputbox ? (
          <div className="h-full">
            <form onSubmit={search} className="h-full py-2 flex">
              <button
                type="button"
                onClick={handleInputBox}
                className="h-full min-w-max rounded-full px-1 hover:opacity-80"
              >
                <MdClose size={20} color="white" />{" "}
              </button>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={inputRef}
                className="h-full bg-red-900 px-2 mr-2 w-full rounded text-xs outline-none text-white"
                placeholder="Search Quora"
              />
            </form>
          </div>
        ) : (
          <div className="h-full flex relative">
            <button onClick={handleInputBox} className="pl-1 flex items-center">
              <div>
                <GoSearch size={24} color="white" />
              </div>
              <div className="text-sm text-white ml-1 font-medium">Search</div>
            </button>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Logo width={77.287} height={44} fill={"rgb(255, 255, 255)"} />
            </div>
          </div>
        )}
      </div>

      <div className="h-11 bg-[#f7f7f8] flex">
        <NavLink className="flex-1" to="/">
          {({ isActive }) => (
            <>
              <div className="px-2 h-full border-r flex items-center justify-center flex-1">
                {isActive ? <ActiveHome /> : <InactiveHome />}
              </div>
            </>
          )}
        </NavLink>

        <NavLink className="flex-1" to="/following">
          {({ isActive }) => (
            <>
              <div className="px-2 h-full border-r flex items-center justify-center flex-1">
                {isActive ? <ActiveFollowing /> : <InactiveFollowing />}
              </div>
            </>
          )}
        </NavLink>

        <NavLink className="flex-1" to="/answer">
          {({ isActive }) => (
            <>
              <div className="px-2 h-full border-r flex items-center justify-center flex-1">
                {isActive ? <ActiveAnswer /> : <InactiveAnswer />}
              </div>
            </>
          )}
        </NavLink>

        <NavLink className="flex-1" to="/spaces">
          {({ isActive }) => (
            <>
              <div className="px-2 h-full border-r flex items-center justify-center flex-1">
                {isActive ? <ActiveSpaces /> : <InactiveSpaces />}
              </div>
            </>
          )}
        </NavLink>

        <NavLink className="flex-1" to="/notification">
          {({ isActive }) => (
            <>
              <div className="px-2 h-full border-r flex items-center justify-center flex-1">
                {isActive ? <ActiveNotification /> : <InactiveNotification />}
              </div>
            </>
          )}
        </NavLink>

        <NavLink className="flex-1" to={`/user/${id}`}>
          <div className="px-2 h-full border-r flex items-center justify-center flex-1">
            <BiUserCircle size={24} color="rgb(99,100,102)" />
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default SmallNavbar;
