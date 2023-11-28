import React, { useEffect, useState } from "react";
import { api, setLike, setDislike } from "../api/axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import ThreeDotsLoading from "../assets/icons/ThreeDotsLoading";

import FirstComment from "./FirstComment";
import { Link, useNavigate } from "react-router-dom";

const Post = React.forwardRef(({ post, image, isPost }, ref) => {
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const { author, content, channel, title, likeCount, commentCount, _id } =
    post;
  const [likes, setLikes] = useState(likeCount);
  const [refetchComment, setRefetchComment] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  // const { data, isLoading } = useGetCommentsByIdQuery(_id, {
  //   skip: !commentVisibility || refetchComment,
  // });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/post/${_id}/comments`);
        console.log(response);
        setComments(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (commentVisibility) {
      fetchComments();
    }
  }, [refetchComment, commentVisibility]);

  // const comments = data?.data;

  const showComment = () => {
    setCommentVisibility(!commentVisibility);
  };

  const notify = (message) => {
    toast(`${message}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const like = () => {
    if (!upVote && !downVote) {
      setUpVote(true);
      setLikes((prev) => prev + 1);
      setLike(_id, notify);
    } else if (downVote) {
      setDownVote(false);
      setLikes((prev) => prev + 1);
    } else {
      setUpVote(false);
      setLikes((prev) => prev - 1);
    }
  };

  const dislike = () => {
    if (!upVote && !downVote) {
      setDownVote(true);
      setLikes((prev) => prev - 1);
      setDislike(_id, notify);
    } else if (upVote) {
      setUpVote(false);
      setLikes((prev) => prev - 1);
    } else {
      setDownVote(false);
      setLikes((prev) => prev + 1);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await api.post(`/comment/${_id}`, {
          content: newComment,
        });
      } catch (error) {
        console.log(error);
      } finally {
        notify("Comment added.");
        setRefetchComment((prev) => prev + 1);
        setNewComment("");
      }
    }
  };

  const postBody = (
    <>
      <div className="mb-2 rounded border bg-white">
        <div className="px-3 pt-3 rounded border bg-white">
          <div className="flex flex-nowrap items-start mb-2">
            <Link to={`/user/${author._id}`}>
              <div className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer">
                <img
                  src={author.profileImage}
                  alt="authorProfileImage"
                  className="rounded-full"
                />
              </div>
            </Link>
            <div>
              <div className="leading-none">
                <Link to={`/user/${author._id}`}>
                  <span className="md:text-xs text-sm font-bold cursor-pointer">
                    {author.name}
                  </span>
                </Link>
                <span
                  onClick={notify}
                  className="text-xs text-blue-600 cursor-pointer"
                >
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
          <Link to={isPost ? null : `/question/${_id}`}>
            <div
              className={`font-bold text-lg ${
                !isPost && "cursor-pointer hover:underline"
              }`}
            >
              {title}
            </div>
          </Link>
          <div className="font-light">{content}</div>
          {image && (
            <div>
              <img className="bg-slate-300" src={image} alt="postImg" />
            </div>
          )}

          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <div className="flex border rounded-full border-[#dee0e1] bg-[#00000108] mr-2">
                <button
                  onClick={like}
                  className="px-3 h-[30px] flex items-center border-r rounded-l-full hover:bg-[#00000008]"
                >
                  <ImArrowUp size={15} color={upVote ? "#2e69ff" : "#636466"} />
                  <div
                    className={`transition text-sm ml-1 ${
                      upVote ? "text-[#2e69ff]" : "text-[#636466]"
                    }`}
                  >
                    Upvote • {likes}
                  </div>
                </button>
                <button
                  onClick={dislike}
                  className="px-3 rounded-r-full hover:bg-[#00000008]"
                >
                  <ImArrowDown
                    size={15}
                    color={downVote ? "rgb(203, 75, 16" : "#636466"}
                  />
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
            <form
              onSubmit={handleAddComment}
              className="flex px-3 py-2 justify-between items-center bg-[#f1f2f2]"
            >
              <div>
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://qph.cf2.quoracdn.net/main-thumb-39653657-100-hpoilfexdbvljplkmkksnufgksblgubo.jpeg"
                  alt="profileImage"
                />
              </div>
              <div className="ml-2 flex-grow">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="px-4 py-2 w-full rounded-full"
                />
              </div>
              <div className="ml-1 navSmall:block hidden">
                <button
                  type="submit"
                  className="px-4 bg-[#2e69ff] h-[30px] min-w-[30px] rounded-full text-sm text-white"
                >
                  Add Comment
                </button>
              </div>
            </form>
          )}

          {isLoading && (
            <div className="bg-[#f7f7f8] flex justify-center">
              <ThreeDotsLoading />
            </div>
          )}

          {commentVisibility &&
            comments?.toReversed()?.map((comment) => {
              return <FirstComment key={comment._id} comment={comment} />;
            })}
        </div>
      </div>
    </>
  );

  const postContent = ref ? (
    <div ref={ref}>{postBody}</div>
  ) : (
    <div>{postBody}</div>
  );

  return postContent;
});

export default Post;
