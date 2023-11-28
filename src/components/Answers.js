import { useState } from "react";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";

import { BiUserCircle } from "react-icons/bi";
import ThreeDotsLoading from "../assets/icons/ThreeDotsLoading";

import FirstComment from "./FirstComment";

export default function Answers({ singleAnswer }) {
  const { author, content, _id, children } = singleAnswer;
  const { data: authorData, isLoading, isError } = useGetUserByIdQuery(author);
  const navigate = useNavigate();
  const [commentVisibility, setCommentVisibility] = useState(false);

  if (isLoading) {
    return <div>Data is loading</div>;
  }

  const goToUser = () => {
    navigate(`/user/${author}`);
  };

  const showComment = () => {
    setCommentVisibility(!commentVisibility);
  };

  return (
    <div className="my-2 rounded border bg-white">
      <div className="px-3 pt-3">
        <div className="flex flex-nowrap mb-2 items-center">
          <div
            onClick={goToUser}
            className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer"
          >
            {authorData.data.profileImage ? (
              <img
                src={authorData.data.profileImage}
                alt="authorProfileImage"
                className="rounded-full"
              />
            ) : (
              <BiUserCircle size={36} />
            )}
          </div>
          <div>
            <div className="leading-none">
              <span
                onClick={goToUser}
                className="md:text-xs text-sm font-bold cursor-pointer"
              >
                {authorData.data.name}
              </span>
              <span className="text-xs text-blue-600 cursor-pointer">
                {" "}
                • Follow
              </span>
            </div>
          </div>
        </div>

        <div className="font-light">{content}</div>

        <div className="py-1">
          <div className="flex items-center border rounded-full">
            <div
              onClick={showComment}
              className="px-2 flex items-center h-7 w-full hover:bg-[#00000008] cursor-pointer rounded-full"
            >
              <span className="text-[#636466] text-xs font-bold m-auto">
                {children.length} Comments
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {isLoading && (
          <div className="bg-[#f7f7f8] flex justify-center">
            <ThreeDotsLoading />
          </div>
        )}

        {commentVisibility &&
          children?.map((comment) => {
            return <FirstComment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );
}
