export const ProfileHeaderSubnavigation: React.FC = () => {
	return (
		<div className="my-4 flex gap-8">
			<span className="underline">Tweets</span>
			<span className="cursor-pointer hover:underline">Tweets & Replies</span>
			<span className="cursor-pointer hover:underline">Media</span>
			<span className="cursor-pointer hover:underline">Likes</span>
		</div>
	);
};
