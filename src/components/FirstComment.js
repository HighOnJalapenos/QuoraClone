import { BiUserCircle } from "react-icons/bi";

import Comments from "./Comments";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";

const FirstComment = ({ comment }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserByIdQuery(comment.author);
  const author = data?.data;

  const goToUser = () => {
    navigate(`/user/${_id}`);
  };

  if (isLoading) {
    return null;
  }

  const { name, profileImage, _id } = author;
  const beautifiedName = name[0].toUpperCase() + name.slice(1);

  return (
    <div key={comment._id} className="px-3 py-2 border-b last:border-b-0">
      <div className="flex">
        {profileImage ? (
          <img
            onClick={goToUser}
            className="h-9 w-9 rounded-full cursor-pointer"
            src={profileImage}
            alt="profileImage"
          />
        ) : (
          <BiUserCircle
            onClick={goToUser}
            className="cursor-pointer"
            size={34}
            color="rgb(99, 100, 102)"
          />
        )}

        <div className="ml-2">
          <div onClick={goToUser} className="font-bold text-sm cursor-pointer">
            {beautifiedName}
          </div>
          <div className="text-sm pb-2">{comment.content}</div>
          <Comments children={comment.children} />
        </div>
      </div>
    </div>
  );
};

export default FirstComment;
