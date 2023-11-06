const QuestionModal = ({ onClose }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 h-screen w-screen z-40 bg-[rgba(36,36,36,0.9)] flex justify-center items-center"
    >
      <div className="w-[730px] max-w-[90vw] max-h-[80vh] min-h-[400px] bg-white rounded-lg pt-2">
        <div className="flex border-b text-sm font-medium">
          <div className="flex-1 text-center p-2 hover:bg-[rgba(0,0,0,0.03)] border-b-[3px] border-[#2e69ff] cursor-pointer">
            Add Question
          </div>
          <div className="flex-1 text-center p-2 hover:bg-[rgba(0,0,0,0.03)] cursor-pointer">
            Add Post
          </div>
        </div>

        <div className="px-4">
          <div className="my-2"></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
