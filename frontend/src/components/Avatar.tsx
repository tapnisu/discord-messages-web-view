import { APIUser } from "discord-api-types/v10";
import { twMerge } from "tailwind-merge";

export interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  user: APIUser;
}

export default function Avatar(props: AvatarProps) {
  return (
    <img
      {...props}
      src={
        props.user.avatar
          ? `https://cdn.discordapp.com/avatars/${props.user.id}/${props.user.avatar}.webp`
          : "https://cdn.discordapp.com/embed/avatars/0.png"
      }
      alt={`${props.user.global_name ?? props.user.username}'s avatar`}
      className={twMerge("rounded-full size-16", props.className)}
    />
  );
}
