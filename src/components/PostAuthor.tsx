import { selectAllUsers } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

interface PostAuthorProps {
  userId: string;
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const users = useSelector(selectAllUsers);
  const author =
    users.find((user) => user.id === userId)?.name || "Unknown Author";

  return (
    <span>
      author: <span className='italic'>{author}</span>
    </span>
  );
};

export default PostAuthor;
