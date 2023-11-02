import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";

export default function User() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(id);
  const userData = user?.data;
  console.log(userData);
  const { profileImage, name } = userData;
  return (
    <div className="navSmall:mt-[50px] mt-[72px]">
      {isLoading ? (
        <div className="w-[1100px] m-auto pt-8 flex animate-pulse">
          <div className="w-[572px] bg-gray-200 h-[600px] rounded-lg"></div>
          <div className="w-[356px] bg-gray-200 h-[600px] ml-10 rounded-lg"></div>
        </div>
      ) : (
        <div className="w-[1100px] m-auto pt-8 flex">
          <div className="w-[572px]">
            <div className="flex">
              <div className="h-[120px] w-[120px] mr-6">
                <img
                  src={profileImage}
                  alt="profileImage"
                  className="h-[120px] w-[120px] rounded-full"
                />
              </div>
              <div>
                <div className="text-3xl font-bold">{name}</div>
              </div>
            </div>
          </div>
          <div className="w-[356px] ml-auto">This is right side</div>
        </div>
      )}
    </div>
  );
}
