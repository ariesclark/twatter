import { User } from "~/models/user";
import { Content } from "~/utils/content/react";

export type ProfileDescriptionProps = React.ComponentProps<"div"> & { user: User };

export const ProfileDescription: React.FC<ProfileDescriptionProps> = (props) => {
	const { user, ...elementProps } = props;

	return (
		<Content
			{...elementProps}
			value={
				user.profile.description ||
				`No description available, [ask them](/${user.username}/message) to add one.`
			}
		/>
	);
};
