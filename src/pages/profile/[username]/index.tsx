import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import {
	BellIcon,
	DotsHorizontalIcon,
	HashtagIcon,
	HomeIcon,
	InboxIcon,
	UserIcon
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Profile } from "../../../utils/api";
import { TweetPreview, TweetPreviewProps } from "../../../components/tweet/preview";
import { UserTextBlock } from "../../../components/user-text-block";
import { formatNumber } from "../../../utils/format-number";

export const getStaticPaths: GetStaticPaths = () => {
	return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps<{ username: string }, { username: string }> = (
	context
) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { username } = context.params!;

	return {
		props: {
			username
		}
	};
};

const WhatsHappeningPreviewItem: React.FC<{}> = () => {
	return (
		<Link href="#">
			<a className="flex gap-4 rounded bg-gray-100 p-4 shadow hover:bg-white">
				<div className="flex flex-col">
					<div className="flex gap-2 text-sm text-gray-600">
						<span>Music</span>
						<span>·</span>
						<span>Last night</span>
					</div>
					<span className="text-lg font-medium leading-5">
						Demi Lovato releases new album Holy Fvck
					</span>
					<span className="mt-2 text-sm text-gray-600">#HOLYFVCK</span>
				</div>
				<div
					className="h-24 w-24 shrink-0 rounded bg-cover bg-center"
					style={{
						backgroundImage: `url(https://pbs.twimg.com/semantic_core_img/1560086624628719616/AZjZ_djM?format=jpg&name=240x240)`
					}}
				/>
			</a>
		</Link>
	);
};

const WhatsHappeningPreview: React.FC = () => {
	return (
		<div className="flex flex-col gap-4">
			<span className="text-2xl font-medium">What&apos;s happening?</span>
			<div className="flex flex-col gap-4">
				<WhatsHappeningPreviewItem />
				<WhatsHappeningPreviewItem />
				<WhatsHappeningPreviewItem />
			</div>
		</div>
	);
};

const MediaGalleryPreviewPicture: React.FC<{ url: string }> = ({ url }) => {
	return (
		<div
			className="h-24 w-full rounded bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${url})`
			}}
		/>
	);
};

const MediaGalleryPreview: React.FC = () => {
	return (
		<div className="grid h-fit w-full grid-cols-3 grid-rows-2 gap-1">
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/media/FaXO2k2XwAAWEd0?format=jpg&name=medium" />
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/media/FaWwzHpXkAISJYh?format=jpg&name=medium" />
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/media/FaWuqrAWQAACp-V?format=jpg&name=medium" />
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/tweet_video_thumb/FaNu51vXoAEvEdR.jpg" />
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/tweet_video_thumb/FaMWQ6FWYAAXAkD.jpg" />
			<MediaGalleryPreviewPicture url="https://pbs.twimg.com/media/FZ9SeKIXgAA7Apm?format=jpg&name=medium" />
		</div>
	);
};

export interface NavigationItemProps {
	Icon: React.FC<React.ComponentProps<"svg">>;
	name: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ Icon, name }) => {
	return (
		<Link passHref href="#">
			<a className="flex items-center gap-4 rounded p-2 hover:bg-gray-100 hover:shadow">
				<Icon className="w-8 shrink-0 lg:w-10" />
				<span className="text-xl lg:text-2xl">{name}</span>
			</a>
		</Link>
	);
};

const Navigation: React.FC = () => {
	return (
		<div className="sticky top-0 flex h-screen w-full flex-col gap-2 py-8">
			<NavigationItem Icon={HomeIcon} name="Home" />
			<NavigationItem Icon={HashtagIcon} name="Explore" />
			<NavigationItem Icon={BellIcon} name="Notifications" />
			<NavigationItem Icon={InboxIcon} name="Messages" />
			<NavigationItem Icon={UserIcon} name="Profile" />
			<NavigationItem Icon={HomeIcon} name="Home" />
		</div>
	);
};

const ProfileIndexPage: NextPage<{ username: string }> = function (props) {
	const profile: Profile = {
		...props,
		name: "Matt Pocock",
		description: `The Rodney Mullen of TypeScript - @wesbos
		Speaker, teacher, and Developer Advocate at @vercel. Ex-voice coach. He/him.
		Building Total Typescript 🧙`,
		followers: 93041,
		following: 3240219,
		banner_url: "https://pbs.twimg.com/profile_banners/346640777/1658411534/1500x500",
		avatar_url: "https://pbs.twimg.com/profile_images/1545418058260516865/zN6_f-ot_400x400.png"
	};

	const tweets: Array<TweetPreviewProps> = [
		{
			author: profile,
			liked: true,
			message: `Announcing... 🚀

My first **Advanced** TypeScript workshop.

We'll be covering *everything* you need to go from "I know a bit of TypeScript" to being the [indispensable](https://www.merriam-webster.com/dictionary/indispensable) TS wizard on your team.

30 seats - 9AM-2PM PT - Friday July 29th

I'm so pumped ❤️❤️❤️`
		},
		{
			author: profile,
			message: `So many things to love from watching my Discord this evening.

First, @tannerlinsley showing up with questions about an advanced TS API. Second, @johndoe tons of verified TS wizards coming out to offer awesome, helpful advice.
			
Just sat here lurking, loving it.`,
			attachments: [{ kind: "external", url: "https://heroicons.com" }]
		},
		{
			author: profile,
			message: `I'm gonna try to open source this as soon as I find some time.
@raycastapp is 🔥`,
			attachments: [
				{ kind: "external", url: "https://www.youtube.com/watch?v=BnyU7HmTQJs" },
				{ kind: "external", url: "https://vimeo.com/262386141" }
			]
		}
	];

	return (
		<div className="flex flex-col items-center justify-center bg-gray-200">
			<div className="flex w-full max-w-screen-2xl flex-col">
				<div className="flex px-16">a</div>
				<div className="flex flex-col">
					<div
						className="aspect-[4/1] h-full w-full from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.4)] to-transparent bg-cover bg-center"
						style={{
							backgroundImage: `linear-gradient(to top, var(--tw-gradient-stops)), url(${profile.banner_url})`
						}}
					/>
					<div className="mx-16 flex flex-col gap-8">
						<div className="-mt-32 flex gap-8">
							<div className="flex w-48 shrink-0 flex-col lg:w-64">
								<img
									className="h-48 w-48 rounded shadow-xl lg:h-64 lg:w-64"
									src={profile.avatar_url}
								/>
								<Navigation />
							</div>
							<div className="mt-8 flex w-full flex-col">
								<div className="flex items-center justify-between">
									<div className="flex w-fit flex-col text-white drop-shadow-xl">
										<h1 className="text-2xl font-bold">{profile.name}</h1>
										<Link href={`/${profile.username}`}>
											<a className="text-gray-200">@{profile.username}</a>
										</Link>
									</div>
									<div className="flex h-fit items-center gap-4">
										<DotsHorizontalIcon className="w-6 text-white" />
										<button className="w-32 rounded bg-white px-3 py-2" type="button">
											Follow
										</button>
									</div>
								</div>
								<UserTextBlock className="mt-16">{profile.description}</UserTextBlock>
								<div className="mt-4 flex gap-4 text-lg">
									<span className="cursor-pointer hover:underline">
										<span className="font-medium">{formatNumber(profile.following)}</span> following
									</span>
									<span className="cursor-pointer hover:underline">
										<span className="font-medium">{formatNumber(profile.followers)}</span> followers
									</span>
								</div>
								<div className="my-4 flex gap-8">
									<span className="underline">Tweets</span>
									<span className="cursor-pointer hover:underline">Tweets & Replies</span>
									<span className="cursor-pointer hover:underline">Media</span>
									<span className="cursor-pointer hover:underline">Likes</span>
								</div>
								<div className="flex flex-col gap-4">
									{tweets.map((tweet, idx) => (
										<TweetPreview key={idx} {...tweet} />
									))}
								</div>
							</div>
							<div className="mt-32 hidden h-[2000px] w-80 shrink-0 flex-col gap-8 pt-8 xl:flex 2xl:w-96">
								<MediaGalleryPreview />
								<WhatsHappeningPreview />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileIndexPage;
