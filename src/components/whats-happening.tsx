import Link from "next/link";

const WhatsHappeningPreviewItem: React.FC = () => {
	return (
		<Link href="/">
			<a className="flex gap-4 rounded bg-white p-4 shadow">
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

export const WhatsHappeningPreview: React.FC = () => {
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
