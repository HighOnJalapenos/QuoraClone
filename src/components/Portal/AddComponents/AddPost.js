import { BiUserCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { useState } from "react";
import ImageUploading from "react-images-uploading";

const AddPost = () => {
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState([]);

  const handleInput = (e) => {
    setQuestion(e.target.value);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
            placeholder="Title of the post"
            maxLength={100}
            className="w-full focus:outline-none focus:border-blue-600 border p-2 rounded text-base font-medium h-8"
          ></input>
        </div>
        <div className="mb-2 h-full">
          <textarea
            value={question}
            onInput={handleInput}
            placeholder="Content of the post"
            className="w-full focus:outline-none border focus:border-blue-600 rounded h-full resize-none p-2 break-words text-sm"
          ></textarea>
        </div>
      </div>

      <div className="h-10">
        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
        >
          {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
            // write your building UI
            <div className="flex items-center gap-5 text-sm">
              <button
                className="h-max w-max border rounded-full text-xs px-2 py-2 hover:opacity-70 bg-blue-500 text-white hover:scale-105 shrink-0"
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload Image
              </button>
              {imageList.map((image, index) => (
                <div key={index} className="flex items-center truncate">
                  <div className="text-xs text-blue-500 truncate">
                    {image.file.name}
                  </div>
                  <button
                    className="text-xs text-black"
                    onClick={() => onImageRemove(index)}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default AddPost;
