import { PostState } from "@/store/slices/postSlice";
import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const PostExcerpt = ({ post }: { post: PostState }) => {
  return (
    <article className='mt-5'>
      <h3 className='text-xl'>{post.title}</h3>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.timestamp} />
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
