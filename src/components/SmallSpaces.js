import DefaultImage from "../assets/facebook-profile-picture-no-pic-avatar.webp";
import { useNavigate } from "react-router-dom";

export default function SmallSpaces({ space }) {
  const { image, name, description, _id } = space;
  const navigate = useNavigate();

  console.log(space);
  return (
    <div
      className="h-52 sm:w-44 w-32 border rounded mb-2 rounded-t-lg bg-white cursor-pointer"
      onClick={() => navigate(`/spaces/${_id}`)}
    >
      {image ? (
        <>
          <div className="h-[50px]">
            <img
              className="h-[50px] w-full object-cover rounded-t-lg"
              src={image}
              alt="spaceImg"
            />
          </div>
          <div className="mt-[-22px] mx-auto h-11 w-11">
            <img
              src={image}
              alt="profileImg"
              className="h-10 w-10 border-2 border-white rounded relative"
            />
          </div>
        </>
      ) : (
        <>
          <div className="h-[50px]">
            <img
              className="h-[50px] w-full object-cover rounded-t-lg"
              src={DefaultImage}
              alt="spaceImg"
            />
          </div>
          <div className="mt-[-22px] mx-auto h-11 w-11">
            <img
              src={DefaultImage}
              alt="profileImg"
              className="h-10 w-10 border-2 border-white rounded relative"
            />
          </div>
        </>
      )}
      <div className="pt-1 px-2 pb-2">
        <div className="text-center text-sm font-bold mb-1 hover:underline">
          {name}
        </div>
        <div className="text-xs line-clamp-4 text-center font-light">
          {description}
        </div>
      </div>
    </div>
  );
}
