import { GoSearch } from "react-icons/go";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  Logo,
  InactiveHome,
  InactiveAnswer,
  InactiveFollowing,
  InactiveNotification,
  InactiveSpaces,
} from "../assets/icons/IconCollection";
import { BiUserCircle } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";

const SmallNavbar = () => {
  return (
    <header className="block navSmall:hidden border-b bg-white border-[#dee0e1] fixed top-0 left-0 right-0 z-40">
      <div className="h-11 bg-[#b92b27] flex justify-between items-center">
        <button className="pl-1 ml-2 flex items-center">
          <div>
            <GoSearch size={24} color="white" />
          </div>
          <div className="text-sm text-white ml-1 font-medium">Search</div>
        </button>
        <div>
          <Logo width={77.287} height={44} fill={"rgb(255, 255, 255)"} />
        </div>
        <button className="flex items-center mr-2">
          <div>
            <AiOutlinePlusCircle size={24} fill="white" />
          </div>
          <div className="text-sm text-white">Add</div>
        </button>
      </div>

      <div className="h-11 bg-[#f7f7f8] flex">
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <InactiveHome />
        </div>
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <InactiveFollowing />
        </div>
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <InactiveAnswer />
        </div>
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <InactiveSpaces />
        </div>
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <InactiveNotification />
        </div>
        <div className="px-2 h-full border-r flex items-center justify-center flex-1">
          <BiUserCircle size={24} />
        </div>
        <div className="px-2 h-full flex items-center justify-center flex-1">
          <CiGlobe size={24} />
        </div>
      </div>
    </header>
  );
};

export default SmallNavbar;
