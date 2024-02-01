import { BiUserCircle } from "react-icons/bi";

const AddPost = ({ setFormData }) => {
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

  return (
    <div className="px-4 my-4 h-full flex flex-col">
      <div className="mb-2 flex items-center">
        <BiUserCircle size={38} />
        <button className="h-[30px] min-w-[30px] flex items-center max-w-max">
          <div className="ml-1 text-sm font-bold">Digvijay Singh</div>
        </button>
      </div>

      <div className="pt-2 pb-4 h-full flex flex-col">
        <div className="mb-2">
          <input
            onChange={handleInput}
            name="title"
            placeholder="Title of the post"
            maxLength={100}
            className="w-full focus:outline-none dark:border-[rgba(177,179,182,0.2)] focus:border-blue-600 border p-2 rounded text-base font-medium h-8 dark:bg-transparent"
          ></input>
        </div>
        <div className="mb-2 h-full">
          <textarea
            name="content"
            onChange={handleInput}
            placeholder="Content of the post"
            className="w-full focus:outline-none dark:border-[rgba(177,179,182,0.2)] border focus:border-blue-600 rounded h-full resize-none p-2 break-words text-sm dark:bg-transparent"
          ></textarea>
        </div>
      </div>

      <div>
        <input
          onChange={handleImage}
          className="block w-full text-sm text-gray-900 dark:text-white dark:border-[rgba(177,179,182,0.2)] border border-gray-300 rounded bg-gray-50 focus:outline-none dark:bg-transparent cursor-pointer"
          name="images"
          type="file"
        />
      </div>
    </div>
  );
};

export default AddPost;
