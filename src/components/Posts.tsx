import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/postSlice";
import PostAuthor from "./PostAuthor";

const Posts: React.FC = () => {
  const posts = useSelector(selectAllPosts);
  const renderPosts = posts.map((post) => (
    <article key={post.id} className='mt-5'>
      <h3 className='text-xl'>{post.title}</h3>
      <p>{post.description}</p>
      <PostAuthor authorID={post.authorID} />
    </article>
  ));
  return <div>{renderPosts}</div>;
};

export default Posts;
