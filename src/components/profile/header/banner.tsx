import { getProfileImageUrl } from "~/services/users/profile-image";

export const ProfileImageBanner: React.FC<{ banner: string | null }> = ({ banner }) => {
	const url = getProfileImageUrl("banner", banner);

	return (
		<div
			className="aspect-[4/1] h-full w-full from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.4)] to-transparent bg-cover bg-center"
			style={{
				backgroundImage: `linear-gradient(to top, var(--tw-gradient-stops)), url(${url})`
			}}
		/>
	);
};
