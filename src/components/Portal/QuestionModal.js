import { GrClose } from "react-icons/gr";
import { useState } from "react";

import AddQuestion from "./AddComponents/AddQuestion";
import AddPost from "./AddComponents/AddPost";

const QuestionModal = ({ onClose }) => {
  const [showPost, setShowPost] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      document.documentElement.style.overflow = "";
      onClose();
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    document.documentElement.style.overflow = "";
    onClose();
  };

  const handleShowPost = () => {
    if (!showPost) {
      setShowPost(true);
    }
  };

  const handleShowQuestion = () => {
    if (showPost) {
      setShowPost(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 h-screen w-screen z-40 bg-[rgba(36,36,36,0.9)] flex justify-center items-center"
    >
      <div className="w-[730px] max-w-[100vw] h-full sm:max-h-[70vh] sm:min-h-[400px] min-h-screen bg-white rounded-lg flex-col flex relative">
        <div className="z-20">
          <div className="p-2 flex items-center justify-between">
            <button
              onClick={handleClose}
              className="h-[38px] min-w-[38px] px-[6px] rounded-full hover:bg-[rgba(0,0,0,0.03)]"
            >
              <GrClose className="m-auto" size={18} color="rgb(99, 100, 102)" />
            </button>
            <button className="min-w-[38px] h-[38px] bg-[#2e69ff] text-white px-[20px] rounded-full">
              Add
            </button>
          </div>

          <div className="flex border-b text-sm font-medium pt-2">
            <div
              onClick={handleShowQuestion}
              className={`flex-1 text-center p-2 hover:bg-[rgba(0,0,0,0.03)] ${
                !showPost && "border-[#2e69ff] border-b-[3px]"
              } cursor-pointer`}
            >
              Add Question
            </div>
            <div
              onClick={handleShowPost}
              className={`flex-1 text-center p-2 hover:bg-[rgba(0,0,0,0.03)] cursor-pointer ${
                showPost && "border-[#2e69ff] border-b-[3px]"
              }`}
            >
              Add Post
            </div>
          </div>
        </div>

        {!showPost ? <AddQuestion /> : <AddPost />}
      </div>
    </div>
  );
};

export default QuestionModal;
