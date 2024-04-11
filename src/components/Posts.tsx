import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectAllPosts } from "../store/slices/postSlice";
import PostExcerpt from "./PostExcerpt";

const Posts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    if (posts.status === "idle") {
      dispatch(fetchPosts());
    }
  }, [posts, dispatch]);

  let content;

  if (posts.status === "loading") {
    content = <p>Loading...</p>;
  } else if (posts.status === "succeeded") {
    const latestPostFirst = posts.posts
      .slice()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    content = latestPostFirst.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (posts.status === "failed") {
    content = <p>{posts.error}</p>;
  }

  return <>{content}</>;
};

export default Posts;
