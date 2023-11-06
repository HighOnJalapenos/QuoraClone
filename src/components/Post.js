import React, { useState } from "react";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import ThreeDotsLoading from "../assets/icons/ThreeDotsLoading";

import FirstComment from "./FirstComment";
import { useGetCommentsByIdQuery } from "../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";

const Post = React.forwardRef(({ post }, ref) => {
  const navigate = useNavigate();
  const [commentVisibility, setCommentVisibility] = useState(false);
  const { author, content, channel, title, likeCount, commentCount, _id } =
    post;

  const { data, isLoading } = useGetCommentsByIdQuery(_id, {
    skip: !commentVisibility,
  });
  const comments = data?.data;

  const showComment = () => {
    setCommentVisibility(!commentVisibility);
  };

  const goToUser = () => {
    navigate(`/user/${author._id}`);
  };

  const postBody = (
    <div className="mb-2 rounded border bg-white">
      <div className="px-3 pt-3 rounded border bg-white">
        <div className="flex flex-nowrap items-start mb-2">
          <div
            onClick={goToUser}
            className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer"
          >
            <img
              src={author.profileImage}
              alt="authorProfileImage"
              className="rounded-full"
            />
          </div>
          <div>
            <div className="leading-none">
              <span
                onClick={goToUser}
                className="md:text-xs text-sm font-bold cursor-pointer"
              >
                {author.name}
              </span>
              <span className="text-xs text-blue-600 cursor-pointer">
                {" "}
                • Follow
              </span>
            </div>
            <div className="leading-none text-[#636466]">
              <span className="text-xs">Posted in the channel</span>
              <span className="text-xs text-black cursor-pointer">
                {" "}
                {channel.name}
              </span>
            </div>
          </div>
        </div>

        <div className="font-bold text-lg">{title}</div>
        <div className="font-light">{content}</div>

        <div className="flex justify-between py-1">
          <div className="flex items-center">
            <div className="flex border rounded-full border-[#dee0e1] bg-[#00000108] mr-2">
              <button className="px-3 h-[30px] flex items-center border-r rounded-l-full hover:bg-[#00000008]">
                <ImArrowUp size={15} color="blue" />
                <div className="text-sm ml-1 text-[#636466]">
                  Upvote • {likeCount}
                </div>
              </button>
              <button className="px-3 rounded-r-full hover:bg-[#00000008]">
                <ImArrowDown size={15} color="#636466" />
              </button>
            </div>
            <span
              onClick={showComment}
              className="px-2 flex items-center h-full hover:bg-[#00000008] rounded-full cursor-pointer"
            >
              <FaRegComment size={20} color="#636466" />
              <span className="text-[#636466] text-sm ml-1">
                {commentCount}
              </span>
            </span>
          </div>

          <div className="flex items-center">
            <LuMoreHorizontal size={20} />
          </div>
        </div>
      </div>

      <div>
        {commentVisibility && (
          <div className="flex px-3 py-2 justify-between items-center bg-[#f1f2f2]">
            <div>
              <img
                className="h-9 w-9 rounded-full"
                src="https://qph.cf2.quoracdn.net/main-thumb-39653657-100-hpoilfexdbvljplkmkksnufgksblgubo.jpeg"
                alt="profileImage"
              />
            </div>
            <div className="ml-2 flex-grow">
              <input
                placeholder="Add a comment..."
                className="px-4 py-2 w-full rounded-full"
              />
            </div>
            <div className="ml-1 navSmall:block hidden">
              <button className="px-4 bg-[#2e69ff] h-[30px] min-w-[30px] rounded-full text-sm text-white">
                Add Comment
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="bg-[#f7f7f8] flex justify-center">
            <ThreeDotsLoading />
          </div>
        )}

        {commentVisibility &&
          comments?.map((comment) => {
            return <FirstComment key={comment._id} comment={comment} />;
          })}
      </div>
    </div>
  );

  const postContent = ref ? (
    <div ref={ref}>{postBody}</div>
  ) : (
    <div>{postBody}</div>
  );

  return postContent;
});

export default Post;
