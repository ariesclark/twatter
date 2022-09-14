import { twMerge } from "tailwind-merge";

import { getProfileImageUrl } from "~/services/users/profile-image";

export type ProfileAvatarProps = React.ComponentProps<"img"> & { avatar: string | null };

export const ProfileAvatar: React.FC<ProfileAvatarProps> = (props) => {
	const { avatar, ...elementProps } = props;
	const url = getProfileImageUrl("avatar", avatar);

	return (
		<img
			{...elementProps}
			className={twMerge("overflow-hidden rounded w-full h-full", elementProps.className)}
			src={url}
		/>
	);
};
