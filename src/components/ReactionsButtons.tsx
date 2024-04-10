import {
  addReaction,
  PostState,
  ReactionState,
} from "@/store/slices/postSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const ReactionsButtons = ({ post }: { post: PostState }) => {
  const dispatch = useDispatch();
  const reactionEmojis = {
    like: "👍",
    wow: "😮",
    heart: "💕",
    rocket: "🚀",
    coffee: "☕",
  };

  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <Button
          key={name}
          title={name}
          className='m-2 w-20'
          onClick={() =>
            dispatch(addReaction({ postID: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name as keyof ReactionState]}
        </Button>
      );
    }
  );

  return <div>{reactionButtons}</div>;
};

export default ReactionsButtons;
