import AskQuestion from "./AskQuestion";
import Post from "../../PostComponents/Post";

import { useState, useRef, useCallback } from "react";
import usePosts from "../../../hooks/usePosts";

export default function MainContent() {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((post) => {
        if (post[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="text-center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={post._id} post={post} />;
    }
    return <Post key={post._id} post={post} />;
  });

  return (
    <div>
      <AskQuestion />
      {isLoading ? (
        <div className="animate-pulse bg-[rgb(239, 240, 240)]">
          {results.map((result, index) => {
            return (
              <div
                key={index}
                className="h-48 bg-gray-200 mb-3 border border-[#dee0e1]"
              ></div>
            );
          })}
        </div>
      ) : (
        content
      )}
    </div>
  );
}
