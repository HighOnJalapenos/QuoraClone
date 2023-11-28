export default function SidebarButton({ name, img }) {
  return (
    <div className="flex flex-row mb-1 h-auto p-2 hover:bg-[#e4e6e6] cursor-pointer rounded last:border-b">
      <img className="w-5 h-5 mr-2 rounded-sm" src={img} alt="thumbnail" />
      <p className="text-xs text-ellipsis line-clamp-2 text-[#636466]">
        {name}
      </p>
    </div>
  );
}
