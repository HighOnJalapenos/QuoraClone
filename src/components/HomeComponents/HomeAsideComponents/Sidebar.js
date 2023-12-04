import { useGetSpacesQuery } from "../../../redux/services/quoraApi";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const { data } = useGetSpacesQuery();
  const spacesArray = data?.data;
  return (
    <>
      <div className="mb-4 border-b">
        {spacesArray?.map((space, index) => {
          return (
            <SidebarButton
              key={index}
              id={space._id}
              name={space.name}
              img={space.image}
            />
          );
        })}
      </div>
      <div className="text-xs text-[#939598] dark:text-[#8e9092] overflow-visible leading-6 py-2">
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
