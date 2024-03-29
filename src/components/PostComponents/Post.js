import React, { useEffect, useState } from "react";
import { api, setLike, setDislike } from "../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import ThreeDotsLoading from "../../assets/icons/ThreeDotsLoading";
import DefaultPhoto from "../../assets/facebook-profile-picture-no-pic-avatar.webp";
import FirstComment from "../CommentComponents/FirstComment";
import { Link, useNavigate } from "react-router-dom";

const Post = React.forwardRef(({ post, image, isPost }, ref) => {
  const navigate = useNavigate();
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const { author, content, channel, title, likeCount, commentCount, _id } =
    post;
  const [likes, setLikes] = useState(likeCount || 0);
  const [refetchComment, setRefetchComment] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/post/${_id}/comments`);
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
        await api.post(`/comment/${_id}`, {
          content: newComment,
        });
      } catch (error) {
      } finally {
        notify("Comment added.");
        setRefetchComment((prev) => prev + 1);
        setNewComment("");
      }
    }
  };

  const postBody = (
    <>
      <div className="mb-2 rounded border dark:bg-[#262626] dark:border-[#262626] dark:text-[#cdcdcd] bg-white">
        <div className="px-3 pt-3">
          <div className="flex flex-nowrap items-start mb-2">
            <Link to={`/user/${author._id}`}>
              <div className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer">
                <img
                  src={author.profileImage ?? DefaultPhoto}
                  alt="authorProfileImage"
                  className="rounded-full h-full object-cover"
                />
              </div>
            </Link>
            <div>
              <div className="leading-none">
                <Link to={`/user/${author._id}`}>
                  <span className="md:text-xs text-sm font-bold cursor-pointer">
                    {author.name || ""}
                  </span>
                </Link>
              </div>
              <div className="leading-none dark:text-[#cdcdcd] text-[#636466]">
                {channel && (
                  <>
                    <span className="text-xs">Posted in the channel</span>
                    <Link to={`/spaces/${channel._id}`}>
                      <span className="text-xs text-black dark:text-white cursor-pointer">
                        {" "}
                        {channel.name}
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {isPost ? (
            <div className="font-bold text-lg">{title}</div>
          ) : (
            <Link to={`/question/${_id}`}>
              <div className="font-bold text-lg cursor-pointer hover:underline">
                {title}
              </div>
            </Link>
          )}
          <div className="font-light">{content}</div>
          {image && (
            <div>
              <img className="bg-slate-300" src={image} alt="postImg" />
            </div>
          )}

          <div className="flex justify-between py-1">
            <div className="flex items-center">
              <div className="flex border rounded-full border-[#dee0e1] dark:border-[#393839] bg-[#00000108] dark:bg-[rgba(255,255,255,0.05)] mr-2">
                <button
                  onClick={like}
                  className="px-3 h-[30px] flex items-center border-r dark:border-[#393839] rounded-l-full hover:bg-[#00000008]"
                >
                  <ImArrowUp
                    size={15}
                    className={`${
                      upVote
                        ? "fill-[#2e69ff]"
                        : "dark:fill-[#b1b3b6] fill-[#636466]"
                    }`}
                  />
                  <div
                    className={`transition text-sm ml-1 ${
                      upVote
                        ? "text-[#2e69ff]"
                        : "text-[#636466] dark:text-[#b1b3b6]"
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
                <FaRegComment
                  size={20}
                  className="dark:fill-[rgb(177,179,182)] fill-[#636466]"
                />
                <span className="text-[#636466] dark:text-[#b1b3b6] text-sm ml-1">
                  {commentCount}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          {commentVisibility && (
            <form
              onSubmit={handleAddComment}
              className="flex px-3 py-2 justify-between items-center bg-[#f1f2f2] dark:bg-[#202020]"
            >
              <div>
                <BiUserCircle
                  size={36}
                  color="rgb(99, 100, 102)"
                  className="h-9 w-9 rounded-full cursor-pointer"
                />
              </div>
              <div className="ml-2 flex-grow">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="px-4 py-2 w-full rounded-full dark:bg-[#181818] dark:outline-none"
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
            <div className="bg-[#f7f7f8] dark:bg-[#202020] flex justify-center">
              <ThreeDotsLoading />
            </div>
          )}

          {commentVisibility &&
            comments?.toReversed()?.map((comment) => {
              return (
                <FirstComment
                  notify={notify}
                  setRefetchComment={setRefetchComment}
                  key={comment._id}
                  comment={comment}
                />
              );
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
