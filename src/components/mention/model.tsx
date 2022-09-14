import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useUser } from "~/hooks/use-user";
import { User } from "~/models/user";
import { formatNumber } from "~/utils/format-number";

import { ProfileAvatar } from "../profile/avatar";
import { ProfileDescription } from "../profile/description";
import { ProfileImageBanner } from "../profile/header";

export type WithMentionModelProps = React.ComponentProps<"span"> & { username: string };

export const WithMentionModel: React.FC<WithMentionModelProps> = (props) => {
	const { username, ...elementProps } = props;
	const { data: user } = useUser(username);

	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const resetTimeout = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
	};

	const onMouseEnter = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
		(event) => {
			props.onMouseEnter?.call(null, event);

			resetTimeout();
			timeoutRef.current = setTimeout(() => {
				setVisible(true);
				resetTimeout();
			}, 1000);
		},
		[props.onMouseEnter]
	);

	const onMouseLeave = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
		(event) => {
			props.onMouseLeave?.call(null, event);

			resetTimeout();
			timeoutRef.current = setTimeout(() => {
				setVisible(false);
				resetTimeout();
			}, 500);
		},
		[props.onMouseLeave]
	);

	return (
		<span
			{...elementProps}
			className={twMerge("relative", elementProps.className)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{props.children}
			{visible && user && <MentionModel user={user} />}
		</span>
	);
};

export const MentionModel: React.FC<{
	user: User;
}> = ({ user }) => {
	const mentionUrl = `/${user.username}`;
	const [followed, setFollowed] = useState(false);

	return (
		<div className="absolute top-0 left-0 z-50 mt-8 flex w-96">
			<div className="relative flex w-full flex-col overflow-hidden rounded bg-white shadow-lg">
				<ProfileImageBanner banner={user.profile.banner} />
				<div className="absolute flex w-full p-4 text-white">
					<div className="flex w-full items-center justify-between gap-4">
						<Link href={mentionUrl}>
							<a className="flex gap-4">
								<ProfileAvatar avatar={user.profile.avatar} className="h-16 w-16 rounded" />
								<div className="flex flex-col justify-center">
									<span className="text-xl font-bold">{user.profile.displayName}</span>
									<span className="text-gray-200">@{user.username}</span>
								</div>
							</a>
						</Link>
						{!followed && (
							<button
								className="shrink-0 rounded bg-white py-2 px-4 text-black"
								type="button"
								onClick={() => setFollowed(true)}
							>
								<span>Follow</span>
							</button>
						)}
					</div>
				</div>
				<ProfileDescription className="p-4 text-sm" user={user} />

				<div className="flex gap-4 bg-gray-100 p-4 text-lg">
					<span className="cursor-pointer hover:underline">
						<span className="font-medium">{formatNumber(user.following)}</span> following
					</span>
					<span className="cursor-pointer hover:underline">
						<span className="font-medium">{formatNumber(user.followers)}</span> followers
					</span>
				</div>
			</div>
		</div>
	);
};
