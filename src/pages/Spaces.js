import SmallSpaces from "../components/SmallSpaces";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

export default function Spaces() {
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
      console.log(lastPage);
      if (lastPage.data.length < 12) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  console.log(hasNextPage);

  return (
    <div className="navSmall:mt-20 mt-28">
      <div className="navSmall:max-w-[1100px] w-full h-screen mx-auto flex justify-between">
        <div className="navSmall:w-[750px] w-full">
          <div className="p-4 bg-white sm:bg-[url('https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.tribes.tribe_welcome_banner_full.png-26-64d500fd69494b66.png')] bg-right-bottom bg-contain bg-no-repeat border rounded">
            <div className="text-lg font-medium mb-1">Welcome to spaces!</div>
            <div className="text-[#636466] text-xs mb-4">
              Follow Spaces to explore your interests on Quora.
            </div>
            <div className="flex gap-2">
              <button className="h-[30px] pl-4 pr-3 text-xs font-medium text-[#2e69ff] border border-[#2e69ff] rounded-full bg-white hover:bg-[#ebf0ff] transition">
                Create Spaces
              </button>
              <button className="h-[30px] pl-4 pr-3 text-xs font-medium text-[#2e69ff] border border-[#2e69ff] rounded-full bg-white hover:bg-[#ebf0ff] transition">
                Discover Spaces
              </button>
            </div>
          </div>

          <div className="py-6 navSmall:px-0 px-4">
            <div className="text-xl font-bold">Discover Spaces</div>
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
            <div className="rounded flex justify-center hover:text-[#282829] text-[#636466] hover:bg-[rgba(0,0,0,0.03)] transition">
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

        <div className="navSmall:flex flex-col h-36 hidden w-[300px] bg-white border rounded">
          <div className="border-b py-2 px-4 font-medium text-[rgba(40,40,41,0.71)]">
            Pending Invites
          </div>
          <div className="h-full flex items-center justify-center text-[#939598] text-sm">
            No Invites
          </div>
        </div>
      </div>
    </div>
  );
}
