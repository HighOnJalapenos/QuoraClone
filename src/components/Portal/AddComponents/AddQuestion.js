import { BiUserCircle, BiSolidRightArrow } from "react-icons/bi";
import { GoPeople } from "react-icons/go";

import { useState, useRef } from "react";

const AddQuestion = () => {
  const [wordCountWarning, setWordCountWarning] = useState(false);
  const [question, setQuestion] = useState("");
  const ref = useRef();

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleInput = (e) => {
    setQuestion(e.target.value);
    if (250 - question.length < 25) {
      setWordCountWarning(true);
    } else {
      setWordCountWarning(false);
    }

    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight}px`;
    }
  };
  return (
    <div className="overflow-y-auto h-full">
      <div className="px-4 my-4">
        <div className="text-[#2e69ff] p-4 font-semibold bg-[#ebf0ff] rounded-lg mb-4">
          <div>Tips on getting good answers quickly</div>
          <div className="text-sm font-normal">
            • Make sure your question has not been asked already
          </div>
          <div className="text-sm font-normal">
            • Keep your question short and to the point
          </div>
          <div className="text-sm font-normal">
            • Double-check grammar and spelling
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-2 flex items-center">
          <BiUserCircle size={18} />
          <BiSolidRightArrow
            size={10}
            fill="rgb(99, 100, 102)"
            className="ml-2"
          />
          <button className="ml-2 h-[30px] min-w-[30px] pl-[10px] pr-[15px] border rounded-full flex items-center max-w-max">
            <GoPeople size={18} color="rgb(99, 100, 102)" />
            <div className="ml-1 text-sm text-[#636466] font-medium">
              Public
            </div>
          </button>
        </div>

        <div className="pt-2 pb-4">
          <div className="mb-2 border-b hover:border-blue-600">
            <textarea
              value={question}
              maxLength={250}
              onKeyDown={handleEnterKey}
              ref={ref}
              onInput={handleInput}
              rows={1}
              placeholder='Start your question with "What", "Why", "How" etc.'
              className="w-full focus:outline-none text-[18px] leading-[1.4] sm:h-[26px] h-[50px] min-h-[26px] resize-none break-words"
            ></textarea>
          </div>
          {wordCountWarning && (
            <div className="text-xs text-red-600">
              {250 - question.length} words remaining
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;