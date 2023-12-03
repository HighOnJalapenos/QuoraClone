import ReplyComment from "./ReplyComment";

const Comments = ({ children }) => {
  if (children.length === 0) {
    return null;
  }

  return (
    <>
      {children.map((comment) => {
        return <ReplyComment key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default Comments;
