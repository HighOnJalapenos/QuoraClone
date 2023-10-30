export default function SidebarButton() {
  return (
    <div className="flex flex-row mb-1 h-auto p-2 hover:bg-[#e4e6e6] cursor-pointer rounded last:border-b">
      <img
        className="w-5 h-5 mr-2 rounded-sm"
        src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/458.jpg"
        alt="thumbnail"
      />
      <p className="text-xs text-ellipsis line-clamp-2 text-[#636466]">
        Data Science Hub
      </p>
    </div>
  );
}
