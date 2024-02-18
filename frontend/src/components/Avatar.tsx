import { twMerge } from "tailwind-merge";
import { Author } from "../lib/types";

export interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  author: Author;
}

export default function Avatar(props: AvatarProps) {
  return (
    <img
      {...props}
      src={props.author.avatarURL}
      alt={`${props.author.username}'s avatar`}
      className={twMerge("rounded-full size-16", props.className)}
    />
  );
}
