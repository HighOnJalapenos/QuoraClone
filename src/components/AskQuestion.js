import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";

import QuestionModal from "./Portal/QuestionModal";
import { createPortal } from "react-dom";

export default function AskQuestion() {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const portal = document.getElementById("portal");

  const openQuestionModal = () => {
    setShowQuestionModal(true);
    console.log(showQuestionModal);
  };

  const closeQuestionModal = () => {
    console.log("debug");
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
          createPortal(<QuestionModal onClose={closeQuestionModal} />, portal)}
      </div>
      <div className="flex flex-row my-1 items-center text-[#636466]">
        <button className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full">
          Ask
        </button>
        <div className="border-r border-[#dee0e1] mx-1 h-4"></div>
        <button className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full">
          Answer
        </button>
        <div className="border-r border-[#dee0e1] mx-1 h-4"></div>
        <button className="flex-1 flex items-center justify-center h-[30px] text-sm cursor-pointer hover:bg-[#00000008] rounded-full">
          Post
        </button>
      </div>
    </div>
  );
}
