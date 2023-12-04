import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api/axios";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const AddSpaceModal = ({ onClose }) => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    description: "",
    images: null,
  };

  const [formData, setFormData] = useState(initialFormData);

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.files[0],
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    document.documentElement.style.overflow = "";
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("images", formData.images);
    e.preventDefault();
    api
      .post("/channel/", data)
      .then((response) => {
        const id = response.data.data._id;
        notify("Space has been created");
        onClose();
        navigate(`/spaces/${id}`);
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 h-screen w-screen z-40 bg-[rgba(36,36,36,0.9)] flex justify-center items-center"
    >
      <form
        onSubmit={handleAddPost}
        className="w-[730px] max-w-[100vw] h-full sm:max-h-[70vh] sm:min-h-[400px] min-h-screen bg-white dark:bg-[#181818] dark:border-[#393839] dark:border dark:text-[#cdcdcd] rounded-lg flex-col flex relative"
      >
        <div className="z-20 px-2">
          <div className="py-2 flex items-center justify-between">
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
              type="submit"
              className="min-w-[38px] h-[38px] bg-[#2e69ff] text-white px-[20px] rounded-full"
            >
              Add
            </button>
          </div>
          <div className="ps-2 text-xl font-bold">Create a Space</div>
          <div className="ps-2 text-sm text-[#636466]">
            Share your interests, curate content, host discussions, and more.
          </div>
        </div>

        <div className="px-4 my-4 h-full flex flex-col">
          <div className="pt-2 pb-4 h-full flex flex-col">
            <div className="mb-2">
              <input
                required
                onChange={handleInput}
                name="name"
                placeholder="Name of the Space"
                maxLength={100}
                className="w-full focus:outline-none dark:border-[rgba(177,179,182,0.2)] dark:bg-transparent focus:border-blue-600 border p-2 rounded text-base font-medium h-8"
              ></input>
            </div>
            <div className="mb-2 h-full">
              <textarea
                required
                name="description"
                onChange={handleInput}
                placeholder="Include a few keywords to show people what to expect if they join."
                className="w-full focus:outline-none dark:border-[rgba(177,179,182,0.2)] border dark:bg-transparent focus:border-blue-600 rounded h-full resize-none p-2 break-words text-sm"
              ></textarea>
            </div>
          </div>

          <div>
            <input
              required
              onChange={handleImage}
              className="block w-full text-sm text-gray-900 border dark:border-[rgba(177,179,182,0.2)] dark:bg-transparent border-gray-300 rounded bg-gray-50 focus:outline-none cursor-pointer"
              name="images"
              type="file"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSpaceModal;
