import { Button } from "./ui/button";

const ReactionsButtons = ({ postID }: { postID: string }) => {
  const reactionButtons = {
    like: "👍",
    wow: "😮",
    heart: "💕",
    rocket: "🚀",
    coffee: "☕",
  };

  const reactions = Object.entries(reactionButtons).map(([name, emoji]) => {
    return (
      <Button title={name} className='m-2 w-20'>
        {emoji} 0
      </Button>
    );
  });

  return <div>{reactions}</div>;
};

export default ReactionsButtons;
