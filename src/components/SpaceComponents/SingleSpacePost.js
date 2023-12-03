import { useGetPostByIdQuery } from "../../redux/services/quoraApi";
import Post from "../PostComponents/Post";

export default function SingleSpacePost({ id, images, isPost }) {
  const { data, isLoading } = useGetPostByIdQuery(id);
  const result = data?.data;
  const noOfImage = images?.length;
  return (
    <>
      {isLoading ? (
        <div>This is loading</div>
      ) : noOfImage ? (
        <Post post={result} image={images[0]} isPost={isPost} />
      ) : (
        <Post post={result} isPost={isPost} />
      )}
    </>
  );
}
