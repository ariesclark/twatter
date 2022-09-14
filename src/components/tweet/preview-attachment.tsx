import { BookOpenIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/future/image";

import { useLinkPreview } from "~/hooks/use-link-preview";
import { LinkPreview, LinkPreviewKind } from "~/pages/api/link-preview";
import { LimitedContent } from "~/utils/content/react";

export type AttachmentKind = "external" | "image" | "video";

export interface TweetPreviewAttachmentProps {
	kind: AttachmentKind;
	url: string;
}

interface AttachmentKindProps {
	preview: LinkPreview;
}

const AttachmentPrettyUrl: React.FC<{ url: string; className?: string }> = (props) => {
	const url = new URL(props.url);

	const host = url.host.replace(/^www./i, "");

	const pathname = url.pathname
		.split("/")
		.map((value) => (value.length > 16 ? `${value.slice(0, 5)}...` : value))
		.join("/");

	const search = url.search.length > 16 ? `${url.search.slice(0, 16)}...` : url.search;

	return (
		<Link href={props.url}>
			<a className={twMerge("text-xs text-gray-300", props.className)} title={url.toString()}>
				<span>{`${url.protocol}//`}</span>
				<span className="font-medium">{host}</span>
				<span>{pathname}</span>
				<span>{search}</span>
			</a>
		</Link>
	);
};

const TweetAttachmentSummary: React.FC<AttachmentKindProps> = ({ preview }) => {
	const description = preview?.description?.replace(/\n/, " ") || "No description available.";

	return (
		<div className="relative flex gap-4 overflow-hidden rounded bg-gray-100 shadow-md">
			<div className="flex h-28 w-28 shrink-0 items-center justify-center bg-black/5">
				{preview.image?.url ? (
					<div
						className="h-28 w-28 bg-cover bg-center"
						style={{ backgroundImage: `url(${preview.image?.url})` }}
					/>
				) : (
					<BookOpenIcon className="w-16 text-gray-500" />
				)}
			</div>

			<div className="my-2 flex flex-col justify-center">
				<AttachmentPrettyUrl
					className="text-gray-700 before:absolute before:inset-0"
					url={preview.url}
				/>
				<LimitedContent className="font-medium" value={preview?.title ?? ""} />
				<LimitedContent
					className="mr-8 text-sm text-gray-800"
					value={description?.length > 96 ? `${description.slice(0, 96)}...` : description}
				/>
			</div>
		</div>
	);
};

const TweetAttachmentDetailedVideo: React.FC<AttachmentKindProps> = ({ preview }) => {
	const { image, video } = preview;

	const [visible, setVisible] = useState(false);

	return (
		<div className="relative flex w-full flex-col gap-2 overflow-hidden rounded bg-gray-100 shadow-md">
			{visible ? (
				<iframe
					className="w-full"
					src={preview.video?.url}
					style={{ aspectRatio: `${video?.width}/${video?.height}` }}
				/>
			) : (
				<div
					className="w-full bg-cover bg-center"
					style={{
						backgroundImage: `url(${image?.url})`,
						aspectRatio: `${video?.width}/${video?.height}`
					}}
				>
					<div className="relative flex h-full flex-col bg-black/40 text-white">
						<button
							className="flex h-full items-center justify-center"
							type="button"
							onClick={() => setVisible(true)}
						>
							<svg
								className="w-8"
								fill="currentColor"
								viewBox="0 0 384 512"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
							</svg>
						</button>
						<div className="pointer-events-none absolute bottom-0 flex w-full items-center justify-between p-4">
							<div className="flex flex-col">
								<span className="text-lg font-medium">{preview.title}</span>
								<AttachmentPrettyUrl className="pointer-events-auto" url={preview.url} />
							</div>
							<Link href={preview.url}>
								<a className="pointer-events-auto">
									<ArrowTopRightOnSquareIcon className="w-6" />
								</a>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const TweetAttachmentDetailed: React.FC<AttachmentKindProps> = ({ preview }) => {
	const { image, video } = preview;

	const description = preview?.description ?? "";

	return video ? (
		<TweetAttachmentDetailedVideo preview={preview} />
	) : (
		<div className="relative flex flex-col gap-4 overflow-hidden rounded bg-gray-100 shadow-md">
			{image?.url && (
				<Image
					className="w-full"
					height={image.height ?? 512}
					src={image.url}
					style={{ aspectRatio: `${image.width}/${image.height}` }}
					width={image.width ?? 1024}
				/>
			)}
			<div className="mx-4 mb-4 flex flex-col justify-center">
				<AttachmentPrettyUrl
					className="text-gray-700 before:absolute before:inset-0"
					url={preview.url}
				/>
				<LimitedContent className="font-medium" value={preview.title ?? ""} />
				<LimitedContent
					className="mr-8 text-sm text-gray-800"
					value={description?.length > 96 ? `${(description ?? "").slice(0, 96)}...` : description}
				/>
			</div>
		</div>
	);
};

const AttachmentKindMap: Record<LinkPreviewKind, React.FC<AttachmentKindProps>> = {
	detailed: TweetAttachmentDetailed,
	summary: TweetAttachmentSummary
};

export const TweetPreviewAttachment: React.FC<TweetPreviewAttachmentProps> = (props) => {
	const { data: preview } = useLinkPreview(props.url);
	const AttachmentKind = preview ? AttachmentKindMap[preview.kind] : () => null;

	return preview ? <AttachmentKind preview={preview} /> : <span>{props.url}</span>;
};
