import { MdClose } from "react-icons/md";
import { useRef, useState } from "react";
import { api } from "../../api/axios";
import AddQuestion from "./AddComponents/AddQuestion";
import AddPost from "./AddComponents/AddPost";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QuestionModal = ({ onClose, notify }) => {
  const ref = useRef();
  const id = useSelector((state) => state.auth.user.userId);
  const navigate = useNavigate();
  const initialFormData = {
    title: "",
    content: "",
    images: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPost, setShowPost] = useState(false);
  const [submitButtonaDisabled, setSubmitButtonDisabled] = useState(false);

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

  const handleAddPost = (e) => {
    setSubmitButtonDisabled(true);
    document.documentElement.style.overflow = "";
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("images", formData.images);
    e.preventDefault();
    api
      .post("/post", data)
      .then((response) => {
        notify("Post has been added");
        setSubmitButtonDisabled(false);
        onClose();
        navigate(`/user/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 h-screen w-screen z-40 bg-[rgba(36,36,36,0.9)] flex justify-center items-center"
    >
      <form
        ref={ref}
        className="w-[730px] max-w-[100vw] h-full sm:max-h-[70vh] sm:min-h-[400px] min-h-screen bg-white dark:bg-[#181818] dark:border-[#393839] dark:border dark:text-[#cdcdcd] rounded-lg flex-col flex relative"
      >
        <div className="z-20">
          <div className="p-2 flex items-center justify-between">
            <button
              onClick={handleClose}
              className="h-[38px] min-w-[38px] px-[6px] rounded-full hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)]"
            >
              <MdClose
                className="m-auto dark:fill-[rgb(177,179,182)] fill-[rgb(99,100,102)]"
                size={24}
              />
            </button>
            <button
              disabled={submitButtonaDisabled}
              type="submit"
              onClick={handleAddPost}
              className="min-w-[38px] h-[38px] bg-[#2e69ff] text-white px-[20px] rounded-full disabled:bg-blue-800 disabled:cursor-wait"
            >
              Add
            </button>
          </div>

          <div className="flex border-b dark:border-[#393839] text-sm font-medium pt-2">
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

        {!showPost ? (
          <AddQuestion setFormData={setFormData} />
        ) : (
          <AddPost setFormData={setFormData} />
        )}
      </form>
    </div>
  );
};

export default QuestionModal;
