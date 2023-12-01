import { useParams } from "react-router-dom";
import {
  useGetSpacesByIdQuery,
  useGetSpacesPostByIdQuery,
} from "../redux/services/quoraApi";
import SingleSpacePost from "../components/SingleSpacePost";

export default function SingleSpace() {
  const { id } = useParams();
  const { data, isLoading: spaceIsLoading } = useGetSpacesByIdQuery(id);
  const { data: spacePostData, isLoading: spacePostisLoading } =
    useGetSpacesPostByIdQuery(id);

  if (spaceIsLoading) {
    return (
      <div className="fixed h-full w-full flex items-center justify-center">
        Data is loading
      </div>
    );
  }

  const { image, description, name } = data.data;
  const spacePost = spacePostData?.data;

  return (
    <div className="navSmall:mt-[51px] mt-[88px]">
      <div className="bg-gradient-to-b from-slate-400 to-black">
        <div className="navSmall:w-[1072px] w-full m-auto text-white">
          <div className="rounded-b">
            <img
              src={image}
              alt="bannerImg"
              className="h-[207px] w-full object-cover blur border-b rounded-b"
            />
          </div>
          <div>
            <img
              className="ml-6 mt-[-90px] relative h-30 w-30 rounded-3xl"
              src={image}
              alt="profileImg"
            />
          </div>

          <div className="text-3xl font-bold ml-6 mt-2">{name}</div>
          <div className="text-sm ml-6 py-4">{description}</div>
        </div>
      </div>

      <div className="navSmall:w-[1072px] w-full m-auto flex justify-between px-2 sm:px-6">
        <div className="sm:w-[658px] w-full">
          <div className="border-b mb-2">
            <div className="px-4 py-3 w-fit text-sm border-b-[3px] border-[#195faa] cursor-pointer">
              Posts ({spacePost ? spacePost.length : 0})
            </div>
          </div>

          {spacePostisLoading ? (
            <div className="animate-pulse bg-[rgb(239, 240, 240)]">
              {Array(10).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="h-48 bg-gray-200 mb-3 border border-[#dee0e1]"
                  ></div>
                );
              })}
            </div>
          ) : (
            spacePost?.map((post, i) => {
              return (
                <SingleSpacePost
                  images={post.images}
                  key={post._id}
                  id={post._id}
                  isPost={true}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
