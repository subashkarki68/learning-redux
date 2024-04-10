import { selectAllUsers } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

interface PostAuthorProps {
  authorID: string;
}

const PostAuthor = ({ authorID }: PostAuthorProps) => {
  const users = useSelector(selectAllUsers);
  const author =
    users.find((user) => user.id === authorID)?.name || "Unknown Author";

  return (
    <span>
      author: <span className='italic'>{author}</span>
    </span>
  );
};

export default PostAuthor;
