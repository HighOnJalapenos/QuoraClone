import { Link } from "react-router-dom";

export default function SidebarButton({ name, img, id }) {
  return (
    <Link to={`/spaces/${id}`}>
      <div className="flex flex-row mb-1 h-auto p-2 hover:bg-[#e4e6e6] dark:hover:bg-[rgb(29,29,29)] dark:text-[#b1b3b6] text-[#636466] cursor-pointer rounded">
        <img className="w-5 h-5 mr-2 rounded-sm" src={img} alt="thumbnail" />
        <p className="text-xs text-ellipsis line-clamp-2">{name}</p>
      </div>
    </Link>
  );
}
