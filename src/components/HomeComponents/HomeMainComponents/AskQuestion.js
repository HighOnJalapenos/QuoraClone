import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import QuestionModal from "../../Portal/QuestionModal";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function AskQuestion() {
  const navigate = useNavigate();
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const portal = document.getElementById("portal");

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

  const openQuestionModal = () => {
    document.documentElement.style.overflow = "hidden";
    setShowQuestionModal(true);
  };

  const closeQuestionModal = () => {
    setShowQuestionModal(false);
  };

  return (
    <div className="mb-2 border border-[#dee0e1] bg-white rounded">
      <div className="pt-3 px-3 flex items-center">
        <BiUserCircle size={32} />
        <div
          onClick={openQuestionModal}
          className="ml-2 flex-grow flex items-center h-[32px] border rounded-full border-[#dee0e1] bg-[#f7f7f8] hover:bg-[#f1f2f2] cursor-pointer"
        >
          <div className="ml-2 text-sm text-[#636466]">
            What do you want to ask or share
          </div>
        </div>
        {showQuestionModal &&
          createPortal(
            <QuestionModal notify={notify} onClose={closeQuestionModal} />,
            portal
          )}
      </div>
      <div className="flex flex-row my-1 items-center text-[#636466]">
        <button
          onClick={openQuestionModal}
          className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full"
        >
          Ask
        </button>
        <div className="border-r border-[#dee0e1] mx-1 h-4"></div>
        <button
          onClick={() => navigate("/answer")}
          className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full"
        >
          Answer
        </button>
        <div className="border-r border-[#dee0e1] mx-1 h-4"></div>
        <button
          onClick={openQuestionModal}
          className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full"
        >
          Post
        </button>
      </div>
    </div>
  );
}
