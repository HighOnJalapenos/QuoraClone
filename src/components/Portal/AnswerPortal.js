import { BiUserCircle } from "react-icons/bi";
import { MdClose } from "react-icons/md";

export default function AnswerPortal({
  onClose,
  title,
  newComment,
  setNewComment,
  handleAddComment,
}) {
  const handlePost = (e) => {
    e.preventDefault();
    handleAddComment(e);
    onClose();
  };
  return (
    <div className="fixed inset-0 h-screen w-screen z-40 bg-[rgba(36,36,36,0.9)] flex justify-center items-center">
      <form
        onSubmit={handlePost}
        className="w-[730px] max-w-[100vw] h-full sm:max-h-[80vh] sm:min-h-[400px] min-h-screen bg-white dark:bg-[#181818] rounded-lg dark:border dark:border-[#393839] flex-col flex relative overflow-hidden dark:text-[#cdcdcd]"
      >
        <div className="p-2 flex items-center justify-between border-b dark:border-[#393839]">
          <button className="h-9 min-w-[36px] rounded-full hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
            <MdClose
              size={24}
              className="dark:fill-[rgb(177,179,182) fill-[rgb(99,100,102)]"
            />
          </button>
          <button
            type="submit"
            className="h-9 min-w-[36px] bg-[#2e69ff] hover:bg-[rgb(26,90,255)] px-5 rounded-full text-white text-sm"
          >
            Post
          </button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center">
            <BiUserCircle size={38} className="mr-2" />
            <div className="text-sm font-bold">Digvijay Singh</div>
          </div>
          <div className="font-bold text-xl mt-2">{title}</div>
          <div className="flex-1 mt-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              id="textarea-scrollbar"
              placeholder="Write your Answer..."
              className="resize-none h-full w-full py-2 text-sm focus:outline-none dark:bg-[#181818]"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
