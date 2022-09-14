import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

import { useCurrentUser } from "~/hooks/use-session";

import { Navigation } from "./navigation";
import { ProfileAvatar } from "./profile/avatar";

export type LeftAsideProps = React.PropsWithChildren<React.ComponentProps<"aside">>;

export const LeftAside: React.FC<LeftAsideProps> = (props) => {
	const { children, ...elementProps } = props;
	const user = useCurrentUser();

	return (
		<aside
			{...elementProps}
			className={twMerge("relative flex w-48 shrink-0 flex-col lg:w-64", elementProps.className)}
		>
			{children}
			<Navigation />
			{user && (
				<button
					className="group fixed bottom-0 my-8 flex w-[inherit] items-center gap-4 overflow-hidden rounded hover:bg-white hover:shadow"
					type="button"
				>
					<ProfileAvatar
						avatar={user.profile.avatar}
						className="h-16 w-16 group-hover:rounded-r-none"
					/>
					<div className="flex flex-col text-left">
						<span className="font-bold">{user.profile.displayName}</span>
						<span className="text-sm text-gray-900">{`@${user.username}`}</span>
					</div>
					<EllipsisHorizontalIcon className="ml-auto h-6 w-6 group-hover:mr-4" />
				</button>
			)}
		</aside>
	);
};
