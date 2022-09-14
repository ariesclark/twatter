import {
	CakeIcon,
	CalendarIcon,
	CheckBadgeIcon,
	LinkIcon,
	MapPinIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useMemo } from "react";

import { User } from "~/models/user";

type ProfileHeaderDetailsItemProps = React.PropsWithChildren<{
	Icon: React.FC<React.ComponentProps<"svg">>;
}>;

const ProfileHeaderDetailsItem: React.FC<ProfileHeaderDetailsItemProps> = ({ Icon, children }) => {
	return (
		<span className="flex items-center gap-2">
			<Icon className="h-5" />
			<span>{children}</span>
		</span>
	);
};

const MinimalUrl: React.FC<{ url: string }> = (props) => {
	const url = useMemo(() => new URL(props.url), [props]);
	return <span>{url.host.replace(/^www./i, "")}</span>;
};

export const ProfileHeaderDetails: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-gray-700">
			{user.profile.url && (
				<ProfileHeaderDetailsItem Icon={LinkIcon}>
					<Link href={user.profile.url}>
						<a className="text-blue-600 hover:underline">
							<MinimalUrl url={user.profile.url} />
						</a>
					</Link>
					{user.profile.urlVerifiedAt && (
						<CheckBadgeIcon className="ml-1 inline h-5 text-green-600" />
					)}
				</ProfileHeaderDetailsItem>
			)}
			{user.profile.location && (
				<ProfileHeaderDetailsItem Icon={MapPinIcon}>
					<Link href={`https://google.com/maps/search/${user.profile.location}`}>
						<a className="hover:underline" target="_blank">
							{user.profile.location}
						</a>
					</Link>
				</ProfileHeaderDetailsItem>
			)}
			<ProfileHeaderDetailsItem Icon={CakeIcon}>
				{`Born on ${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
					new Date(user.profile.bornAt)
				)}`}
			</ProfileHeaderDetailsItem>
			<ProfileHeaderDetailsItem Icon={CalendarIcon}>
				{`Joined in ${new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(
					new Date(user.createdAt)
				)}`}
			</ProfileHeaderDetailsItem>
		</div>
	);
};
