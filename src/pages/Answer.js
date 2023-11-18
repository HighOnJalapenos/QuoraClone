import usePosts from "../hooks/usePosts";
import { useState } from "react";

import { MdClose } from "react-icons/md";
import { LiaPenSquareSolid } from "react-icons/lia";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaStar } from "react-icons/fa";

const Answer = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);
  console.log(results);

  return (
    <div className="max-w-[572px] mx-auto navSmall:mt-[50px] mt-[72px] pt-8 lg:flex block flex-row items-stretch">
      <div className="w-full h-full border rounded bg-white">
        <div className="px-4 py-2 border-b text-xs text-[#636466] flex items-center">
          <div className="bg-[#b92b27] h-6 w-6 flex items-center justify-center mr-2 rounded">
            <FaStar color="white" />
          </div>
          Questions for you
        </div>
        <div>
          {results?.map((post, index) => {
            return (
              <div key={post._id} className="px-4 pt-4 border-b">
                <div className="flex items-center">
                  <div className="font-medium hover:underline cursor-pointer">
                    {post.title}
                  </div>
                  <div className="ml-auto w-9 h-9 rounded-full hover:bg-[rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 cursor-pointer">
                    <MdClose size={18} />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold text-[#939598]">
                    {post.commentCount} answers •
                  </div>
                </div>

                <div className="py-1 flex justify-between">
                  <button className="h-9 border rounded-full px-5 text-[#636466] text-sm hover:bg-[rgba(0,0,0,0.03)] transition flex items-center gap-1">
                    <LiaPenSquareSolid size={24} color="#636466" />
                    Answer
                  </button>

                  <div className="flex">
                    <button className="px-3 hover:bg-[#00000008] rounded-full flex items-center">
                      <ImArrowUp size={15} color="blue" />
                    </button>
                    <button className="px-3 rounded-full hover:bg-[#00000008] flex items-center">
                      <ImArrowDown size={15} color="#636466" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Answer;
