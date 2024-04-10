import { formatDistanceToNow, parseISO } from "date-fns";

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
  const timeString = formatDistanceToNow(parseISO(timestamp));
  return (
    <span title={timestamp} className='block italic'>
      - {timeString} ago
    </span>
  );
};

export default TimeAgo;
