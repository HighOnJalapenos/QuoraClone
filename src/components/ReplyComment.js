import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { BiUserCircle } from "react-icons/bi";
import Comments from "./Comments";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";

const ReplyComment = ({ comment }) => {
  const { data, isLoading } = useGetUserByIdQuery(comment.author);
  const author = data?.data;
  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  const { name, profileImage, _id } = author;
  const beautifiedName = name[0].toUpperCase() + name.slice(1);

  const goToUser = () => {
    navigate(`/user/${_id}`);
  };

  return (
    <div key={comment._id}>
      <div className="flex">
        {profileImage ? (
          <img
            onClick={goToUser}
            alt="profileImage"
            className="h-[18px] w-[18px] rounded-full cursor-pointer"
            src={profileImage}
          />
        ) : (
          <BiUserCircle
            onClick={goToUser}
            className="cursor-pointer"
            size={18}
            color="rgb(99, 100, 102)"
          />
        )}
        <div className="ml-2">
          <div
            onClick={goToUser}
            className="font-bold h-5 text-[13px] cursor-pointer"
          >
            {beautifiedName}
          </div>
          <div className="text-sm">{comment.content}</div>
          <div className="flex items-center">
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

export default ReplyComment;
