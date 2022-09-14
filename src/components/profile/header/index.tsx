import Link from "next/link";

import { User } from "~/models/user";
import { formatNumber } from "~/utils/format-number";

import { ProfileDescription } from "../description";

import { ProfileHeaderDetails } from "./details";
import { ProfileHeaderNavigation } from "./navigation";
import { ProfileHeaderSubnavigation } from "./subnavigation";

export const ProfileHeader: React.FC<{ user: User }> = ({ user }) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<div className="flex w-fit flex-col text-white drop-shadow-xl">
					<h1 className="text-2xl font-bold">{user.profile.displayName}</h1>
					<Link href={`/${user.username}`}>
						<a className="text-gray-200">@{user.username}</a>
					</Link>
				</div>
				<ProfileHeaderNavigation user={user} />
			</div>
			<ProfileDescription className="mt-16" user={user} />
			<ProfileHeaderDetails user={user} />
			<div className="mt-4 flex gap-4 text-lg">
				<span className="cursor-pointer hover:underline">
					<span className="font-medium">{formatNumber(user.following)}</span> following
				</span>
				<span className="cursor-pointer hover:underline">
					<span className="font-medium">{formatNumber(user.followers)}</span> followers
				</span>
			</div>
			<ProfileHeaderSubnavigation />
		</>
	);
};

export * from "./banner";
export * from "./navigation";
export * from "./subnavigation";
