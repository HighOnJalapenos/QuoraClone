import { RiMessage2Line } from "react-icons/ri";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuDollarSign } from "react-icons/lu";
import { LiaChartBarSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";

const UserDropdown = () => {
  return (
    <div
      style={{ transform: "translate3d(-45%, 50px, 0)" }}
      className="max-h-[calc(100vh-82px)] h-max border border-[#dee0e1] absolute bg-white inset-0 min-w-[260px] max-w-[260px] translate-y-[82px] text-[#282829] rounded-sm overflow-y-auto"
    >
      <div>
        <div className="px-4 py-4 border-b border-[#dee0e1] cursor-pointer hover:opacity-60">
          <div>
            <img
              src="https://qph.cf2.quoracdn.net/main-thumb-39653657-200-hpoilfexdbvljplkmkksnufgksblgubo.jpeg"
              alt="profileImg"
              className="h-10 w-10 rounded-full mb-2 mt-4"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black font-bold text-xl">Digvijay Singh</span>
            <span>Go to</span>
          </div>
        </div>

        <div className="py-1 border-b">
          <div className="flex justify-start items-center hover:bg-[#00000008] px-4 py-2 cursor-pointer">
            <span className="pr-2">
              <RiMessage2Line size={24} />
            </span>
            <span className="text-sm">Messages</span>
          </div>

          <div className="flex justify-start items-center hover:bg-[#00000008] px-4 py-2 cursor-pointer">
            <span className="pr-2">
              <HiOutlineSpeakerphone size={24} />
            </span>
            <span className="text-sm">Create Ad</span>
          </div>

          <div className="flex justify-start items-center hover:bg-[#00000008] px-4 py-2 cursor-pointer">
            <span className="pr-2">
              <LuDollarSign size={24} />
            </span>
            <span className="text-sm">Monetization</span>
          </div>

          <div className="flex justify-start items-center hover:bg-[#00000008] px-4 py-2 cursor-pointer">
            <span className="pr-2">
              <LiaChartBarSolid size={24} />
            </span>
            <span className="text-sm">Your Content and Stats</span>
          </div>

          <div className="flex justify-start items-center hover:bg-[#00000008] px-4 py-2 cursor-pointer">
            <span className="pr-2">
              <BiLogOut size={24} />
            </span>
            <span className="text-sm">Log Out</span>
          </div>
        </div>

        <div className="text-sm text-[#939598] overflow-visible leading-6 py-2 px-4">
          <span>About</span>
          <span> • Careers</span>
          <span> • Terms</span>
          <span> • Privacy</span>
          <span> • Businesses</span>
          <span> • Press</span>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
