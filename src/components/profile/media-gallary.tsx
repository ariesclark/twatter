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

export const MediaGalleryPreview: React.FC = () => {
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
