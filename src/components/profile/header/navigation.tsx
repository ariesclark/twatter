import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, EnvelopeOpenIcon } from "@heroicons/react/24/solid";

import { User } from "~/models/user";

const MessageButton: React.FC<{ user: User }> = () => {
	return (
		<button className="group flex items-center justify-center text-white" type="button">
			<EnvelopeIcon className="inline w-8 group-hover:hidden" />
			<EnvelopeOpenIcon className="hidden w-8 animate-shake-1 group-hover:inline" />
		</button>
	);
};

export const ProfileHeaderNavigation: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div className="flex h-fit items-center gap-4">
			<MessageButton user={user} />
			<button className="w-32 rounded bg-white px-3 py-2" type="button">
				Follow
			</button>
			<EllipsisHorizontalIcon className="w-8 text-white" />
		</div>
	);
};
