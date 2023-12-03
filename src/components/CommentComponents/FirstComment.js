import { BiUserCircle } from "react-icons/bi";

import Comments from "./Comments";
import { useGetUserByIdQuery } from "../../redux/services/quoraApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/axios";

const FirstComment = ({ comment, setRefetchComment, notify }) => {
  const [userComment, setUserComment] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserByIdQuery(comment.author);
  const author = data?.data;
  const { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (comment.author === userId) {
      setUserComment(true);
    }
  }, []);

  const goToUser = () => {
    navigate(`/user/${_id}`);
  };

  if (isLoading) {
    return null;
  }

  const { name, profileImage, _id } = author;
  const beautifiedName = name[0].toUpperCase() + name.slice(1);

  const editComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", editedComment);
    api
      .patch(`/comment/${comment._id}`, formData)
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
      .delete(`/comment/${comment._id}`)
      .then(() => {
        notify("Comment deleted");
        setRefetchComment((prev) => prev + 1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      key={comment._id}
      className="sm:px-3 px-1 py-2 border-b last:border-b-0"
    >
      {isEditing ? (
        <form>
          <div className="h-full flex">
            <input
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="px-4 py-2 w-full rounded-full outline-none border ml-2"
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
        <div className="flex flex-col sm:flex-row">
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
              <div
                onClick={goToUser}
                className="font-bold text-sm cursor-pointer"
              >
                {beautifiedName}
              </div>
              <div className="text-sm pb-2">{comment.content}</div>
              <Comments children={comment.children} />
            </div>
          </div>

          {userComment && (
            <div className="sm:ml-auto text-xs font-light">
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 mr-2 border rounded-full hover:opacity-75 hover:border-slate-800 transition"
              >
                Edit
              </button>
              <button
                onClick={deleteComment}
                className="px-2 py-1 border rounded-full hover:opacity-75 hover:border-slate-800 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirstComment;
