import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";

import { BiUserCircle } from "react-icons/bi";
import ThreeDotsLoading from "../../assets/icons/ThreeDotsLoading";

import FirstComment from "../CommentComponents/FirstComment";
import { api } from "../../api/axios";
import { toast } from "react-toastify";

export default function Answers({ singleAnswer, setRefetchComment }) {
  const navigate = useNavigate();
  const { author, content, _id, children } = singleAnswer;
  const { data: authorData, isLoading } = useGetUserByIdQuery(author);

  const [commentVisibility, setCommentVisibility] = useState(false);
  const [userComment, setUserComment] = useState(false);
  const [editedComment, setEditedComment] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (author === "6538dbb07831f45044740153") {
      setUserComment(true);
    }
  }, []);

  const goToUser = () => {
    navigate(`/user/${author}`);
  };

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

  const editComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", editedComment);
    api
      .patch(`/comment/${_id}`, formData)
      .then((response) => {
        console.log(response);
        notify("Comment has been edited.");
        setIsEditing(false);
        setRefetchComment((prev) => prev + 1);
      })
      .catch((error) => console.log(error));
  };

  const deleteComment = (e) => {
    e.preventDefault();
    api
      .delete(`/comment/${_id}`)
      .then((response) => {
        console.log(response);
        notify("Comment deleted");
        setRefetchComment((prev) => prev + 1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="my-2 rounded border bg-white">
      <div className="px-3 pt-3">
        <div className="flex flex-nowrap mb-2 items-center">
          <div
            onClick={goToUser}
            className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer"
          >
            {authorData?.data?.profileImage ? (
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
                {authorData?.data?.name}
              </span>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form>
            <div className="h-full flex">
              <input
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="px-4 py-2 w-full outline-none border"
              />
              <button
                type="submit"
                onClick={editComment}
                className="h-[30px] my-auto text-sm ml-2 px-2 py-1 bg-[#2e69ff] text-white rounded-full"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col">
            <div className="font-light">{content}</div>
            {userComment && (
              <div className="pt-2 pb-1 text-xs font-light shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-2 py-1 mr-2 border rounded-full hover:bg-[#00000008] hover:border-slate-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={deleteComment}
                  className="px-2 py-1 border rounded-full hover:bg-[#00000008] hover:border-slate-800 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

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
