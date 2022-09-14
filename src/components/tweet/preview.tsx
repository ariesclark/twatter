import {
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	ShareIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { User } from "~/models/user";
import { Content } from "~/utils/content/react";

import { WithMentionModel } from "../mention/model";
import { ProfileAvatar } from "../profile/avatar";

import { TweetPreviewAttachment, TweetPreviewAttachmentProps } from "./preview-attachment";

export interface TweetPreviewProps {
	author: User;
	message: string;
	attachments?: Array<TweetPreviewAttachmentProps>;
	liked?: boolean;
}

export const TweetPreview: React.FC<TweetPreviewProps> = (props) => {
	const { author, message, attachments = [] } = props;
	const [liked, setLiked] = useState(props.liked ?? false);

	return (
		<div className="flex gap-4 rounded bg-white p-4 shadow">
			<ProfileAvatar avatar={author.profile.avatar} className="h-14 w-14" />
			<div className="flex w-full flex-col">
				<div className="flex items-center justify-between">
					<div className="flex h-fit items-center gap-2">
						<WithMentionModel username={author.username}>
							<Link href={`/${author.username}`}>
								<a className="flex h-fit items-center gap-2">
									<span className="font-bold">{author.profile.displayName}</span>
									<span className="text-sm text-gray-900 hover:underline">@{author.username}</span>
								</a>
							</Link>
						</WithMentionModel>
						<span>·</span>
						<span className="text-sm text-gray-900"> Aug 16</span>
					</div>
					<EllipsisHorizontalIcon className="w-6" />
				</div>
				<Content className="" value={message} />
				{attachments.length !== 0 && (
					<div className="mt-2 flex flex-col gap-2">
						{attachments.map((attachment, attachmentIdx) => (
							<TweetPreviewAttachment key={attachmentIdx} {...attachment} />
						))}
					</div>
				)}
				<div className="mt-4 flex gap-4 text-gray-600">
					<div className="flex items-center gap-1.5 text-sm">
						<ChatBubbleOvalLeftEllipsisIcon className="w-6" />
						<span>24</span>
					</div>
					<div className="flex items-center gap-1.5 text-sm">
						<ShareIcon className="w-6" />
						<span>{(2483).toLocaleString()}</span>
					</div>
					<div className={twMerge("flex items-center gap-1.5 text-sm", liked && "text-red-600")}>
						<button className="" type="button" onClick={() => setLiked((liked) => !liked)}>
							{liked ? <SolidHeartIcon className="w-6" /> : <HeartIcon className="w-6" />}
						</button>
						<button className="hover:underline" type="button">
							{(4235).toLocaleString()}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
