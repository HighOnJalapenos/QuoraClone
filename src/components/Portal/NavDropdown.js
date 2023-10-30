const NavDropdown = ({ onClose }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleClick} className="fixed top-0 w-full h-screen z-50">
      <div className="absolute h-[calc(100vh-82px)] right-[10%] top-[58px] bg-red-400 min-w-[260px] max-w-[260px]">
        This is a dropdown
      </div>
    </div>
  );
};

export default NavDropdown;
