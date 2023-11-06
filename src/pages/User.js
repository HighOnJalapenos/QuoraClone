import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/services/quoraApi";

import { RiUserAddLine } from "react-icons/ri";

export default function User() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(id);
  const userData = user?.data;
  const {
    profileImage,
    name,
    skills,
    workExperience,
    education,
    address,
    createdAt,
    gender,
    email,
    phone,
    isFollowed,
  } = userData || {};

  return (
    <div className="navSmall:mt-[50px] mt-[72px] bg-white h-screen">
      {isLoading ? (
        <div className="navSmall:w-[1100px] m-auto pt-8 flex animate-pulse">
          <div className="navSmall:w-[572px] navSmall:m-0 m-4 w-full bg-gray-200 h-[600px] rounded-lg"></div>
          <div className="w-[356px] bg-gray-200 h-[600px] ml-10 rounded-lg navSmall:block hidden"></div>
        </div>
      ) : (
        <div className="navSmall:w-[1100px] m-auto pt-8 flex navSmall:flex-row flex-col px-4">
          <div className="navSmall:w-[572px] w-full pb-2">
            <div className="flex navSmall:items-start items-center border-b border-[#dee0e1] pb-2">
              <div className="navSmall:h-[120px] navSmall:w-[120px] h-[78px] w-[78px] mr-6 shrink-0">
                <img
                  src={profileImage}
                  alt="profileImage"
                  className="navSmall:h-[120px] navSmall:w-[120px] h-[78px] w-[78px] rounded-full"
                />
              </div>
              <div className="flex flex-col justify-between gap-2">
                <div className="text-3xl font-bold">{name}</div>
                <div className="line-clamp-3 text-base font-bold">
                  Skills:{" "}
                  {skills?.map((skill, index) => {
                    if (index === skills.length - 1) {
                      return (
                        <span className="text-sm font-normal" key={index}>
                          {skill}.
                        </span>
                      );
                    }
                    return (
                      <span className="text-sm font-normal" key={index}>
                        {skill},{" "}
                      </span>
                    );
                  })}
                </div>
                <div>
                  {isFollowed ? (
                    <button className="flex items-center text-blue-500 bg-white px-4 h-[30px] rounded-full text-sm border border-blue-500">
                      <RiUserAddLine className="inline-block mr-1 fill-blue-500" />{" "}
                      Following
                    </button>
                  ) : (
                    <button className="flex items-center bg-blue-500 text-white px-4 h-[30px] rounded-full text-sm">
                      <RiUserAddLine
                        className="inline-block mr-1"
                        color="white"
                      />{" "}
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="navSmall:w-[356px] navSmall:ml-auto w-full">
            <div>
              <div className="border-b py-2 font-medium">
                Credentials and Highlights
              </div>
              <div className="mt-2">
                {workExperience?.map((experience, index) => {
                  const { companyName, designation, startDate, endDate } =
                    experience;
                  return (
                    <div key={index} className="text-sm py-1">
                      {designation} at {companyName}
                      <span className="text-[#939598] ml-1">
                        {startDate.slice(0, 4)}-{endDate.slice(0, 4)}
                      </span>
                    </div>
                  );
                })}

                {education?.map((education, index) => {
                  const { degree, schoolName, startDate, endDate } = education;
                  return (
                    <div key={index} className="text-sm py-1">
                      {degree} at {schoolName}
                      <span className="text-[#939598] ml-1">
                        {startDate.slice(0, 4)}-{endDate.slice(0, 4)}
                      </span>
                    </div>
                  );
                })}

                {address?.map((address, index) => {
                  const { city, country, state } = address;
                  return (
                    <div key={index} className="text-sm py-1">
                      Lives in {city}, {state}, {country}
                    </div>
                  );
                })}

                <div className="text-sm py-1">
                  Phone: <span className="text-[#939598]">{phone}</span>
                </div>
                <div className="text-sm py-1">
                  Email: <span className="text-[#939598]">{email}</span>
                </div>
                <div className="text-sm py-1">
                  {gender[0].toUpperCase() + gender.slice(1)}
                </div>
                <div className="text-sm py-1">
                  Joined {createdAt.slice(0, 4)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
