import { ImArrowUp, ImArrowDown } from "react-icons/im";

const Comments = ({ children }) => {
  if (children.length === 0) {
    return null;
  }

  return (
    <>
      {children.map((comment) => {
        return (
          <div key={comment._id}>
            <div className="flex">
              <img
                alt="profileImage"
                className="h-[18px] w-[18px] rounded-full"
                src="https://qph.cf2.quoracdn.net/main-thumb-60090846-200-gbrnonjyvqguyfuluraqwbfdszwuynxq.jpeg"
              />
              <div className="ml-2">
                <div className="font-bold h-5 text-[13px]">
                  Surender Singh Lamba
                </div>
                <div className="text-sm">{comment.content}</div>
                <div className="flex items-center">
                  <div className="flex border rounded-full border-[#dee0e1] bg-[#00000108] my-1">
                    <button className="px-3 h-[30px] flex items-center border-r rounded-l-full hover:bg-[#00000008]">
                      <ImArrowUp size={15} color="blue" />
                    </button>
                    <button className="px-3 rounded-r-full hover:bg-[#00000008]">
                      <ImArrowDown size={15} color="#636466" />
                    </button>
                  </div>
                </div>
                <Comments children={comment.children} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
