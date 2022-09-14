import { TweetPreview, TweetPreviewProps } from "./preview";

export const TweetList: React.FC<{ tweets: Array<TweetPreviewProps> }> = ({ tweets }) => {
	return (
		<div className="flex flex-col gap-4">
			{tweets.map((tweet, idx) => (
				<TweetPreview key={idx} {...tweet} />
			))}
		</div>
	);
};
