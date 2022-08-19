import { ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Profile } from "../../utils/api";
import { UserTextBlock } from "../user-text-block";

import { TweetPreviewAttachment, TweetPreviewAttachmentProps } from "./preview-attachment";

export interface TweetPreviewProps {
	author: Profile;
	message: string;
	attachments?: Array<TweetPreviewAttachmentProps>;
	liked?: boolean;
}

export const TweetPreview: React.FC<TweetPreviewProps> = (props) => {
	const { author, message, attachments = [] } = props;
	const [liked, setLiked] = useState(props.liked ?? false);

	return (
		<div className="flex gap-4 rounded bg-white p-4 shadow">
			<img className="h-14 w-14 rounded" src={author.avatar_url} />
			<div className="flex w-full flex-col">
				<div className="flex items-center justify-between">
					<div className="flex h-fit items-center gap-2">
						<span className="font-bold">{author.name}</span>
						<Link href={`/${author.username}`}>
							<a className="text-sm text-gray-900">@{author.username}</a>
						</Link>
						<span>·</span>
						<span className="text-sm text-gray-900"> Aug 16</span>
					</div>
					<DotsHorizontalIcon className="w-6" />
				</div>
				<UserTextBlock>{message}</UserTextBlock>
				{attachments.length !== 0 && (
					<div className="mt-2 flex flex-col gap-2">
						{attachments.map((attachment, attachmentIdx) => (
							<TweetPreviewAttachment key={attachmentIdx} {...attachment} />
						))}
					</div>
				)}
				<div className="mt-4 flex gap-4 text-gray-600">
					<div className="flex items-center gap-1.5 text-sm">
						<ChatIcon className="w-6" />
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
