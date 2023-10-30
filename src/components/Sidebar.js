import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const arr = new Array(10).fill(null);
  return (
    <>
      <div className="mb-4">
        {arr.map((_, index) => {
          return <SidebarButton key={index} />;
        })}
      </div>
      <div className="text-xs text-[#939598] overflow-visible leading-6 py-2">
        <span> • About</span>
        <span> • Careers</span>
        <span> • Terms</span>
        <span> • Privacy</span>
        <span> • Businesses</span>
        <span> • Press</span>
      </div>
    </>
  );
}
