import { BellIcon, HashtagIcon, HomeIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useCurrentUser } from "~/hooks/use-session";

export interface NavigationItemProps {
	Icon: React.FC<React.ComponentProps<"svg">>;
	name: string;
	href: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ Icon, name, href }) => {
	return (
		<Link passHref href={href}>
			<a className="flex items-center gap-4 rounded p-2 hover:bg-white hover:shadow">
				<Icon className="w-8 shrink-0 lg:w-10" />
				<span className="text-xl lg:text-2xl">{name}</span>
			</a>
		</Link>
	);
};

export const Navigation: React.FC = () => {
	const user = useCurrentUser();

	return (
		<div className="sticky top-0 flex h-screen flex-col justify-between gap-8 pt-8">
			<div className="flex w-full flex-col gap-2">
				<NavigationItem href="/" Icon={HomeIcon} name="Home" />
				<NavigationItem href="/explore" Icon={HashtagIcon} name="Explore" />
				<NavigationItem href="/notifications" Icon={BellIcon} name="Notifications" />
				<NavigationItem href="/messages" Icon={InboxIcon} name="Messages" />
				<NavigationItem
					href={user ? `/${user.username}` : "/login"}
					Icon={UserIcon}
					name="Profile"
				/>
			</div>
		</div>
	);
};
