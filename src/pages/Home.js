import Sidebar from "../components/HomeComponents/HomeAsideComponents/Sidebar";
import MainContent from "../components/HomeComponents/HomeMainComponents/MainContent";
import "../css/home.css";

export default function Home() {
  return (
    <div className="max-w-[1100px] mx-auto navSmall:mt-[50px] mt-[72px] pt-4 lg:flex block flex-row items-stretch">
      <div className="w-[123.5px] sticky top-[66px] h-[calc(100vh-66px)] overflow-y-auto sidebar-scroll navSmall:block hidden">
        <Sidebar />
      </div>
      <div className="navSmall:w-[588.5px] navSmall:ml-4 w-full">
        <MainContent />
      </div>
      <div className="w-[356px] ml-4 navSmall:block hidden"></div>
    </div>
  );
}
