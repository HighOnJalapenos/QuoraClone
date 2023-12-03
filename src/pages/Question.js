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
  const [commentData, setCommentData] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);

  const [portalVisibility, setPortalVisibility] = useState(false);
  const [refetchComment, setRefetchComment] = useState(0);
  const [newComment, setNewComment] = useState("");
  const portal = document.getElementById("portal");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentLoading(true);
        const response = await api.get(`/post/${id}/comments`);
        console.log(response);
        setCommentData(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCommentLoading(false);
      }
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
    <div className="max-w-[658px] mx-auto navSmall:mt-8 mt-[72px] pt-8 lg:flex block flex-row items-stretch pb-8">
      <div className="w-full h-full">
        <div className="bg-white border rounded px-3 pt-3">
          <div className="text-xl font-bold">{data?.data?.title}</div>
          <div className="py-1 flex justify-between">
            <button
              onClick={openAnswerPortal}
              className="h-10 border rounded-full px-5 text-[#636466] text-sm hover:bg-[rgba(0,0,0,0.03)] transition flex items-center gap-1"
            >
              <LiaPenSquareSolid size={30} color="#636466" />
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
                />,
                portal
              )}

            <div className="flex">
              <button
                onClick={like}
                className="px-3 hover:bg-[#00000008] rounded-full flex items-center"
              >
                <ImArrowUp size={15} color="#636466" />
              </button>
              <button
                onClick={dislike}
                className="px-3 rounded-full hover:bg-[#00000008] flex items-center"
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
