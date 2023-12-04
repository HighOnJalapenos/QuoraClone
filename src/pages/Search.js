import { useLocation } from "react-router-dom";
import { useGetSearchPostQuery } from "../redux/services/quoraApi";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { LiaPenSquareSolid } from "react-icons/lia";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { setLike, setDislike } from "../api/axios";
import { toast } from "react-toastify";

const Search = () => {
  const data = useLocation();
  const term = data.state.term;
  const {
    data: result,
    isError,
    isLoading,
    error,
  } = useGetSearchPostQuery(term);
  console.log(result);

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

  const like = (id) => {
    setLike(id, notify);
  };

  const dislike = (id) => {
    setDislike(id, notify);
  };

  return (
    <div className="max-w-[572px] min-h-screen mx-auto navSmall:pt-[81px] pt-[117px] lg:flex block flex-row items-stretch">
      <div className="w-full h-full border rounded bg-white dark:bg-[#262626] dark:border-[#262626]">
        <div className="px-4 py-2 border-b dark:border-[#393839] text-xs text-[#636466] dark:text-[#b1b3b6] flex items-center">
          <div className="bg-[#b92b27] h-6 w-6 flex items-center justify-center mr-2 rounded">
            <FaStar color="white" />
          </div>
          Search Results
        </div>

        {isError ? (
          <div className="px-4 p-4 border-b dark:border-[#393839] dark:text-[#cdcdcd] text-center">
            No search results found
          </div>
        ) : (
          <div>
            {result?.data?.map((post) => {
              return (
                <div
                  key={post._id}
                  className="px-4 pt-4 border-b dark:border-[#393839]"
                >
                  <div className="flex items-center">
                    <Link to={`/question/${post._id}`}>
                      <div className="font-medium hover:underline cursor-pointer dark:text-[#cdcdcd]">
                        {post.title}
                      </div>
                    </Link>
                    <div className="ml-auto w-9 h-9 rounded-full hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] flex items-center justify-center shrink-0 cursor-pointer">
                      <MdClose
                        size={18}
                        className="dark:fill-[rgb(177,179,182)]"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="text-xs font-bold text-[#939598]">
                      {post.commentCount} answers •
                    </div>
                  </div>

                  <div className="py-1 flex justify-between">
                    <Link to={`/question/${post._id}`}>
                      <button className="h-9 border rounded-full px-5 text-[#636466] dark:border-[#393839] dark:text-[#b1b3b6] dark:hover:bg-[rgba(255,255,255,0.04)] text-sm hover:bg-[rgba(0,0,0,0.03)] transition flex items-center gap-1">
                        <LiaPenSquareSolid
                          size={24}
                          className="dark:fill-[#b1b3b6] fill-[#636466]"
                        />
                        Answer
                      </button>
                    </Link>

                    <div className="flex gap-2">
                      <button
                        onClick={() => like(post._id)}
                        className="px-3 hover:bg-[#00000008] dark:hover:bg-[rgba(255,255,255,0.04)] dark:border-[#393839] dark:border rounded-full flex items-center"
                      >
                        <ImArrowUp size={15} color="blue" />
                      </button>
                      <button
                        onClick={() => dislike(post._id)}
                        className="px-3 rounded-full hover:bg-[#00000008] dark:hover:bg-[rgba(255,255,255,0.04)] dark:border-[#393839] dark:border flex items-center"
                      >
                        <ImArrowDown size={15} color="#636466" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
