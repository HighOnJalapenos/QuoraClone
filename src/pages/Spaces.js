import SmallSpaces from "../components/SpaceComponents/SmallSpaces";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddSpaceModal from "../components/Portal/AddSpaceModal";

export default function Spaces() {
  const scrollRef = useRef();
  const [showSpaceModal, setShowSpaceModal] = useState(false);
  const portal = document.getElementById("portal");
  const api = axios.create({
    baseURL: "https://academics.newtonschool.co/api/v1/quora",
    headers: {
      projectID: "bf75w0rs1tml",
    },
  });

  const fetchProjects = async ({ pageParam }) => {
    const { data } = await api.get(`/channel?page=${pageParam}&limit=12`);
    return data;
  };

  const openSpaceModal = () => {
    setShowSpaceModal(true);
  };

  const closeSpaceModal = () => {
    setShowSpaceModal(false);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length < 12) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return (
    <div className="navSmall:pt-20 pt-28">
      <div className="navSmall:max-w-[1100px] w-full min-h-screen mx-auto flex justify-between dark:text-[#cdcdcd]">
        <div className="navSmall:w-[750px] w-full">
          <div className="p-4 bg-white dark:bg-[#262626] sm:bg-[url('https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.tribes.tribe_welcome_banner_full.png-26-64d500fd69494b66.png')] bg-right-bottom bg-contain bg-no-repeat border rounded dark:border-[#262626]">
            <div className="text-lg font-medium mb-1">Welcome to spaces!</div>
            <div className="text-[#636466] text-xs mb-4">
              Follow Spaces to explore your interests on Quora.
            </div>
            <div className="flex gap-2">
              <button
                onClick={openSpaceModal}
                className="h-[30px] pl-4 pr-3 text-xs font-medium text-[#2e69ff] dark:hover:bg-[#282d41] dark:text-[rgb(72,148,253)] border border-[#2e69ff] rounded-full bg-white hover:bg-[#ebf0ff] transition dark:bg-transparent dark:border-[rgb(72,148,253)]"
              >
                Create Spaces
              </button>
              <button
                onClick={() => {
                  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-[30px] pl-4 pr-3 text-xs font-medium text-[#2e69ff] dark:text-[rgb(72,148,253)] dark:hover:bg-[#282d41] border border-[#2e69ff] rounded-full bg-white hover:bg-[#ebf0ff] transition dark:bg-transparent dark:border-[rgb(72,148,253)]"
              >
                Discover Spaces
              </button>
            </div>
          </div>

          <div className="py-6 navSmall:px-0 px-4">
            <div ref={scrollRef} className="text-xl font-bold">
              Discover Spaces
            </div>
            <div className="mt-2 mb-4">
              <div className="py-2 text-sm font-medium">
                Spaces you might like
              </div>
            </div>
            <div className="flex flex-wrap justify-evenly">
              {data?.pages?.map((group, i) => (
                <Fragment key={i}>
                  {group.data.map((space) => (
                    <SmallSpaces key={space._id} space={space} />
                  ))}
                </Fragment>
              ))}
            </div>
            <div className="rounded flex justify-center hover:text-[#282829] text-[#636466] dark:text-[#b1b3b6] hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] dark:bg-transparent transition">
              <button
                disabled={!hasNextPage || isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="h-10 w-full text-sm disabled:cursor-not-allowed"
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "View More"
                  : "Nothing more to load"}
              </button>
            </div>
          </div>
        </div>

        <div className="navSmall:flex flex-col h-36 hidden w-[300px] bg-white dark:bg-[#262626] border rounded dark:border-[#262626]">
          <div className="border-b dark:border-[#393839] py-2 px-4 font-medium text-[rgba(40,40,41,0.71)] dark:text-[#d5d6d6]">
            Pending Invites
          </div>
          <div className="h-full flex items-center justify-center text-[#939598] text-sm">
            No Invites
          </div>
        </div>
      </div>
      {showSpaceModal &&
        createPortal(<AddSpaceModal onClose={closeSpaceModal} />, portal)}
    </div>
  );
}
