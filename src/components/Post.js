import React, { useState } from "react";

import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegComment } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";

import Comments from "./Comments";

const Post = React.forwardRef(({ post }, ref) => {
  const [commentVisibility, setCommentVisibility] = useState(false);
  const { author, content, channel, title, likeCount, commentCount } = post;

  const data = [
    {
      _id: "64e5da6cf0965006dc57d534",
      content: "Fall executive easy common.",
      author: "64e4b287a352cf449d3053d9",
      post: "64e4baa85c181547c89bc40f",
      parentComment: null,
      children: [
        {
          _id: "64e5da6cf0965006dc57d536",
          content: "Quickly century street edge mouth serious even short.",
          author: "64e4b287a352cf449d3053d6",
          post: "64e4baa85c181547c89bc40f",
          parentComment: "64e5da6cf0965006dc57d534",
          children: [],
          isEdited: false,
          createdAt: "2023-08-23T10:07:40.781Z",
          __v: 0,
        },
        {
          _id: "64e5da6cf0965006dc57d539",
          content: "Throw usually stop article time pattern address.",
          author: "64e4b287a352cf449d3053a9",
          post: "64e4baa85c181547c89bc40f",
          parentComment: "64e5da6cf0965006dc57d534",
          children: [],
          isEdited: false,
          createdAt: "2023-08-23T10:07:40.858Z",
          __v: 0,
        },
      ],
      isEdited: false,
      createdAt: "2023-08-23T10:07:40.748Z",
      __v: 2,
    },
    {
      _id: "653bebda8e9b5f7b80e0b2f8",
      content: "it's tandav",
      author: "650b14d498e8a1dfeaf8ef20",
      post: "64e4baa85c181547c89bc40f",
      parentComment: null,
      children: [],
      isEdited: false,
      createdAt: "2023-10-27T16:56:58.105Z",
      __v: 0,
    },
    {
      _id: "653bebda3dc7dc9e692ba1aa",
      content: "it's tandav",
      author: "650b14d498e8a1dfeaf8ef20",
      post: "64e4baa85c181547c89bc40f",
      parentComment: null,
      children: [],
      isEdited: false,
      createdAt: "2023-10-27T16:56:58.400Z",
      __v: 0,
    },
    {
      _id: "653bebed3dc7dc9e692ba1c7",
      content: "it's tandav",
      author: "650b14d498e8a1dfeaf8ef20",
      post: "64e4baa85c181547c89bc40f",
      parentComment: null,
      children: [],
      isEdited: false,
      createdAt: "2023-10-27T16:57:17.598Z",
      __v: 0,
    },
    {
      _id: "653c0bdc3dc7dc9e692bb698",
      content: "Good question",
      author: "652c570e378d114c0f902ec5",
      post: "64e4baa85c181547c89bc40f",
      parentComment: null,
      children: [],
      isEdited: false,
      createdAt: "2023-10-27T19:13:32.581Z",
      __v: 0,
    },
  ];

  const showComment = () => {
    setCommentVisibility(true);
  };

  const postBody = (
    <div className="mb-2 rounded border bg-white">
      <div className="px-3 pt-3 rounded border bg-white">
        <div className="flex flex-nowrap items-start mb-2">
          <div className="h-9 w-9 mr-2 flex-shrink-0 cursor-pointer">
            <img
              src={author.profileImage}
              alt="authorProfileImage"
              className="rounded-full"
            />
          </div>
          <div>
            <div className="leading-none">
              <span className="md:text-xs text-sm font-bold">
                {author.name}
              </span>
              <span className="text-xs text-blue-600 cursor-pointer">
                {" "}
                • Follow
              </span>
            </div>
            <div className="leading-none text-[#636466]">
              <span className="text-xs">Posted in the channel</span>
              <span className="text-xs text-black cursor-pointer">
                {" "}
                {channel.name}
              </span>
            </div>
          </div>
        </div>

        <div className="font-bold text-lg">{title}</div>
        <div className="font-light">{content}</div>

        <div className="flex justify-between py-1">
          <div className="flex items-center">
            <div className="flex border rounded-full border-[#dee0e1] bg-[#00000108] mr-2">
              <button className="px-3 h-[30px] flex items-center border-r rounded-l-full hover:bg-[#00000008]">
                <ImArrowUp size={15} color="blue" />
                <div className="text-sm ml-1 text-[#636466]">
                  Upvote • {likeCount}
                </div>
              </button>
              <button className="px-3 rounded-r-full hover:bg-[#00000008]">
                <ImArrowDown size={15} color="#636466" />
              </button>
            </div>
            <span
              onClick={showComment}
              className="px-2 flex items-center h-full hover:bg-[#00000008] rounded-full cursor-pointer"
            >
              <FaRegComment size={20} color="#636466" />
              <span className="text-[#636466] text-sm ml-1">
                {commentCount}
              </span>
            </span>
          </div>

          <div className="flex items-center">
            <LuMoreHorizontal size={20} />
          </div>
        </div>
      </div>

      <div>
        {commentVisibility && (
          <div className="flex px-3 py-2 justify-between items-center bg-[#f1f2f2]">
            <div>
              <img
                className="h-9 w-9 rounded-full"
                src="https://qph.cf2.quoracdn.net/main-thumb-39653657-100-hpoilfexdbvljplkmkksnufgksblgubo.jpeg"
                alt="profileImage"
              />
            </div>
            <div className="ml-2 flex-grow">
              <input
                placeholder="Add a comment..."
                className="px-4 py-2 w-full rounded-full"
              />
            </div>
            <div className="ml-1 navSmall:block hidden">
              <button className="px-4 bg-[#2e69ff] h-[30px] min-w-[30px] rounded-full text-sm text-white">
                Add Comment
              </button>
            </div>
          </div>
        )}

        {commentVisibility &&
          data.map((comment) => {
            return (
              <div
                key={comment._id}
                className="px-3 py-2 border-b last:border-b-0"
              >
                <div className="flex">
                  <img
                    className="h-9 w-9 rounded-full"
                    src="https://qph.cf2.quoracdn.net/main-thumb-60090846-200-gbrnonjyvqguyfuluraqwbfdszwuynxq.jpeg"
                    alt="profileImage"
                  />
                  <div className="ml-2">
                    <div className="font-bold text-sm">
                      Surender Singh Lamba
                    </div>
                    <div className="text-sm">{comment.content}</div>
                    <div className="flex items-center mb-1">
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
      </div>
    </div>
  );

  const postContent = ref ? (
    <div ref={ref}>{postBody}</div>
  ) : (
    <div>{postBody}</div>
  );

  return postContent;
});

export default Post;
