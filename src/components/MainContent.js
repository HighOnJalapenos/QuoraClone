import AskQuestion from "./AskQuestion";
import Post from "./Post";

import { useState, useRef, useCallback } from "react";
import usePosts from "../hooks/usePosts";

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
          console.log("We are near the last post");
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
      {content}
      {isLoading && <p className="text-center">Loading Posts</p>}
    </div>
  );
}
