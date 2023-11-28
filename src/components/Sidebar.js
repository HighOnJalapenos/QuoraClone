import { useGetSpacesQuery } from "../redux/services/quoraApi";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const { data } = useGetSpacesQuery();
  const spacesArray = data?.data;
  return (
    <>
      <div className="mb-4">
        {spacesArray?.map((space, index) => {
          return (
            <SidebarButton key={index} name={space.name} img={space.image} />
          );
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
