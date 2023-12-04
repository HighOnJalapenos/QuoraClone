import { VscVerified } from "react-icons/vsc";

const LanguageDropdown = () => {
  return (
    <div
      style={{ transform: "translate3d(-45%, 50px, 0)" }}
      className="max-h-[calc(100vh-82px)] h-max border border-[#dee0e1] absolute bg-white inset-0 min-w-[260px] max-w-[260px] translate-y-[82px] text-[#282829] rounded-sm overflow-y-auto dark:bg-[#262626] dark:text-[#cdcdcd]"
    >
      <div>
        <div className="px-3 py-2 border-b border-[#dee0e1] dark:border-[#393839] cursor-pointer font-semibold">
          Languages
        </div>

        <div className="py-1 border-b dark:border-[#393839]">
          <div className="flex justify-between items-center hover:bg-[#00000008] px-3 py-2 cursor-pointer">
            <span className="text-sm">English</span>
            <span className="ml-auto">
              <VscVerified size={24} color="blue" />
            </span>
          </div>
        </div>

        <div className="text-sm overflow-visible leading-6 py-2 px-4">
          <div>Add a language</div>
          <div>See all languages</div>
        </div>
      </div>
    </div>
  );
};

export default LanguageDropdown;
