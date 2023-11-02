import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { BiUserCircle } from "react-icons/bi";

import Comments from "./Comments";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";

const FirstComment = ({ comment }) => {
  const { data, isLoading } = useGetUserByIdQuery(comment.author);
  const author = data?.data;

  if (isLoading) {
    return null;
  }

  const { name, profileImage, _id } = author;
  const beautifiedName = name[0].toUpperCase() + name.slice(1);
  return (
    <div key={comment._id} className="px-3 pt-2 border-b last:border-b-0">
      <div className="flex">
        {profileImage ? (
          <img
            className="h-9 w-9 rounded-full cursor-pointer"
            src={profileImage}
            alt="profileImage"
          />
        ) : (
          <BiUserCircle
            className="cursor-pointer"
            size={34}
            color="rgb(99, 100, 102)"
          />
        )}

        <div className="ml-2">
          <div className="font-bold text-sm cursor-pointer">
            {beautifiedName}
          </div>
          <div className="text-sm">{comment.content}</div>
          <div className="flex items-center mb-1">
            <div className="flex border rounded-full border-[#dee0e1] bg-[#00000108] my-1">
              <button className="px-3 h-[30px] flex items-center border-r rounded-l-full hover:bg-[#00000008]">
                <ImArrowUp size={15} color="blue" />
              </button>
              <button className="px-3 rounded-r-full hover:bg-[#00000008]">
                <ImArrowDown size={15} color="#636466" />
              </button>
            </div>
          </div>
          <Comments children={comment.children} />
        </div>
      </div>
    </div>
  );
};

export default FirstComment;
