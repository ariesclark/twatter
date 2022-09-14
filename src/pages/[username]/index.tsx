import { NextPage } from "next";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { ProfileHeader, ProfileImageBanner } from "~/components/profile/header";
import { TweetPreview, TweetPreviewProps } from "~/components/tweet/preview";
import { ProfileAvatar } from "~/components/profile/avatar";
import { users } from "~/services";
import { User } from "~/models/user";
import { WithSessionProps, withSessionProps } from "~/utils/with-session-props";
import { Layout } from "~/components/layout";
import { MediaGalleryPreview } from "~/components/profile/media-gallary";

type PageProps = WithSessionProps<{ user: User }>;

export const getServerSideProps = withSessionProps<PageProps>({}, async (context) => {
	const username = context.params?.username as string;

	const user = await users.getByUsername(username, context.session);
	if (!user) return { notFound: true };

	return {
		props: {
			user
		}
	};
});

const ProfileIndexPage: NextPage<PageProps> = function (props) {
	const { user } = props;

	const tweets: Array<TweetPreviewProps> = [
		{
			author: user,
			liked: true,
			message: `Announcing... 🚀

My first **Advanced** TypeScript workshop.

We'll be covering *everything* you need to go from "I know a bit of TypeScript" to being the [indispensable](https://www.merriam-webster.com/dictionary/indispensable) TS wizard on your team.

30 seats - 9AM-2PM PT - Friday July 29th

I'm so pumped ❤️❤️❤️`
		},
		{
			author: user,
			message: `So many things to love from watching my Discord this evening.

First, @tannerlinsley showing up with questions about an advanced TS API. Second, @aries tons of verified TS wizards coming out to offer awesome, helpful advice.
			
Just sat here lurking, loving it.`,
			attachments: [{ kind: "external", url: "https://heroicons.com" }]
		},
		{
			author: user,
			message: `I'm gonna try to open source this as soon as I find some time.
@raycastapp is 🔥`,
			attachments: [{ kind: "external", url: "https://www.youtube.com/watch?v=7AVubBpUzkA" }]
		}
	];

	return (
		<Layout
			container={{ className: "-mt-32" }}
			rightAside={{ className: "mt-32 pt-8", children: <MediaGalleryPreview /> }}
			leftAside={
				<div className="group relative h-48 w-48 overflow-hidden shadow-xl hover:animate-shake-0.5 lg:h-64 lg:w-64">
					<ProfileAvatar avatar={user.profile.avatar} className="group-hover:brightness-75" />
					<button
						className="absolute top-0 hidden h-full w-full items-center justify-center text-white group-hover:flex"
						type="button"
					>
						<PencilSquareIcon className="h-8 w-8" />
					</button>
				</div>
			}
			root={{
				children: <ProfileImageBanner banner={user.profile.banner} />
			}}
		>
			<ProfileHeader user={user} />
			<div className="flex flex-col gap-4">
				{tweets.map((tweet, idx) => (
					<TweetPreview key={idx} {...tweet} />
				))}
			</div>
		</Layout>
	);
};

export default ProfileIndexPage;
