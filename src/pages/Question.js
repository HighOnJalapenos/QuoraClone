import { useParams } from "react-router-dom";
import Answers from "../components/PostComponents/Answers";
import AnswerPortal from "../components/Portal/AnswerPortal";
import { useGetPostByIdQuery } from "../redux/services/quoraApi";
import { api, setLike, setDislike } from "../api/axios";
import { toast } from "react-toastify";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { LiaPenSquareSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Question() {
  const { id } = useParams();
  const { data, isLoading: postLoading } = useGetPostByIdQuery(id);
  console.log(data);
  const [commentData, setCommentData] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [portalVisibility, setPortalVisibility] = useState(false);
  const [refetchComment, setRefetchComment] = useState(0);
  const [newComment, setNewComment] = useState("");
  const portal = document.getElementById("portal");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/post/${id}/comments`);
        setCommentData(response?.data?.data);
      } catch (error) {}
    };

    fetchComments();
  }, [refetchComment]);

  const openAnswerPortal = () => {
    setPortalVisibility(true);
  };

  const hideAnswerPortal = () => {
    setPortalVisibility(false);
  };

  const handleAddComment = async (e) => {
    e?.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await api.post(`/comment/${id}`, {
          content: newComment,
        });
      } catch (error) {
        console.log(error);
      } finally {
        notify("Comment added");
        setSubmitButtonDisabled(false);
        setRefetchComment((prev) => prev + 1);
        setNewComment("");
      }
    }
  };

  const like = () => {
    setLike(id, notify);
  };

  const dislike = () => {
    setDislike(id, notify);
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

  return (
    <div className="max-w-[658px] min-h-screen mx-auto navSmall:mt-8 mt-[72px] pt-8 lg:flex block flex-row items-stretch pb-8">
      <div className="w-full h-full">
        <div className="bg-white dark:bg-[#262626] dark:border-[#262626] border rounded px-3 pt-3">
          <div className="text-xl font-bold dark:text-[#cdcdcd]">
            {data?.data?.title}
          </div>
          <div className="py-1 flex justify-between">
            <button
              onClick={openAnswerPortal}
              className="h-10 border rounded-full dark:border-[rgba(177,179,182,0.2)] px-5 text-[#636466] dark:text-[#b1b3b6] text-sm hover:bg-[rgba(0,0,0,0.03)] transition flex items-center gap-1"
            >
              <LiaPenSquareSolid
                size={30}
                className="dark:fill-[#b1b3b6] fill-[#636466]"
              />
              Answer
            </button>
            {portalVisibility &&
              createPortal(
                <AnswerPortal
                  newComment={newComment}
                  setNewComment={setNewComment}
                  handleAddComment={handleAddComment}
                  title={data?.data?.title}
                  onClose={hideAnswerPortal}
                  setSubmitButtonDisabled={setSubmitButtonDisabled}
                  submitButtonDisabled={submitButtonDisabled}
                />,
                portal
              )}

            <div className="flex gap-2">
              <button
                onClick={like}
                className="px-3 hover:bg-[#00000008] dark:hover:bg-[rgba(255,255,255,0.04)] dark:border-[#393839] dark:border rounded-full flex items-center"
              >
                <ImArrowUp size={15} color="#636466" />
              </button>
              <button
                onClick={dislike}
                className="px-3 hover:bg-[#00000008] dark:hover:bg-[rgba(255,255,255,0.04)] dark:border-[#393839] dark:border rounded-full flex items-center"
              >
                <ImArrowDown size={15} color="#636466" />
              </button>
            </div>
          </div>
        </div>

        {commentData?.toReversed().map((singleAnswer) => {
          return (
            <Answers
              key={singleAnswer._id}
              setRefetchComment={setRefetchComment}
              singleAnswer={singleAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}
