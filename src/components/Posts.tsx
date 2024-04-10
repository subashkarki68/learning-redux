import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/postSlice";
import PostAuthor from "./PostAuthor";
import ReactionsButtons from "./ReactionsButtons";
import TimeAgo from "./TimeAgo";

const Posts: React.FC = () => {
  const posts = useSelector(selectAllPosts);
  const latestFirstPosts = posts
    .slice()
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const renderPosts = latestFirstPosts.map((post) => (
    <article key={post.id} className='mt-5'>
      <h3 className='text-xl'>{post.title}</h3>
      <p>{post.description}</p>
      <PostAuthor authorID={post.authorID} />
      <TimeAgo timestamp={post.timestamp} />
      <ReactionsButtons post={post} />
    </article>
  ));
  return <div>{renderPosts}</div>;
};

export default Posts;
