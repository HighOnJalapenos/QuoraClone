import React, { useEffect, useState } from "react";
import { api, setLike, setDislike } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import ThreeDotsLoading from "../assets/icons/ThreeDotsLoading";
import FirstComment from "./FirstComment";
import { Link } from "react-router-dom";

export default function UserPost({ post, image, isPost, setRefetchPosts }) {
  const { content, title, _id, author } = post;
  const { userId } = JSON.parse(localStorage.getItem("user"));

  const [commentVisibility, setCommentVisibility] = useState(false);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [refetchComment, setRefetchComment] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userPost, setUserPost] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

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

  useEffect(() => {
    if (author === userId) {
      setUserPost(true);
    }
  }, []);

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
      setLike(_id, notify);
    } else if (downVote) {
      setDownVote(false);
    } else {
      setUpVote(false);
    }
  };

  const dislike = () => {
    if (!upVote && !downVote) {
      setDownVote(true);
      setDislike(_id, notify);
    } else if (upVote) {
      setUpVote(false);
    } else {
      setDownVote(false);
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

  const deletePost = () => {
    api
      .delete(`/post/${_id}`)
      .then((response) => {
        setRefetchPosts((prev) => prev + 1);
        notify("Post has been deleted");
      })
      .catch((error) => console.log(error));
  };

  const handleEditing = () => {
    if (!currentlyEditing) {
      setCurrentlyEditing(true);
      return;
    }
    const formData = new FormData();
    formData.append("content", updatedContent);
    formData.append("title", updatedTitle);
    api
      .patch(`/post/${_id}`, formData)
      .then((response) => {
        setCurrentlyEditing(false);
        setRefetchPosts((prev) => prev + 1);
        notify("Post has been edited");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="mb-2 rounded border bg-white">
        <div className="px-3 pt-3 rounded border bg-white">
          {currentlyEditing ? (
            <div className="flex flex-col">
              <input
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="my-1 border rounded p-2"
                type="text"
                value={updatedTitle}
              ></input>
              {content && (
                <textarea
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  rows={4}
                  className="resize-none my-1 border rounded p-2"
                  value={updatedContent}
                ></textarea>
              )}
            </div>
          ) : (
            <>
              <Link
                className="cursor-default"
                to={isPost ? null : `/question/${_id}`}
              >
                <div
                  className={`font-bold text-lg ${
                    !isPost && "cursor-pointer hover:underline"
                  }`}
                >
                  {title}
                </div>
              </Link>
              <div className="font-light">{content}</div>
            </>
          )}

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
                    className={`transition text-sm ml-1 sm:block hidden ${
                      upVote ? "text-[#2e69ff]" : "text-[#636466]"
                    }`}
                  >
                    Upvote
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
              </span>
            </div>

            {userPost && (
              <div className="flex items-center">
                <button
                  onClick={handleEditing}
                  className="px-2 py-1 mr-2 text-sm border rounded-full hover:opacity-75 hover:border-slate-800 transition"
                >
                  {currentlyEditing ? "Save" : "Edit"}
                </button>
                <button
                  onClick={deletePost}
                  className="px-2 py-1 text-sm border rounded-full hover:opacity-75 hover:border-slate-800 transition"
                >
                  Delete
                </button>
              </div>
            )}
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
              return (
                <FirstComment
                  setRefetchComment={setRefetchComment}
                  notify={notify}
                  key={comment._id}
                  comment={comment}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
