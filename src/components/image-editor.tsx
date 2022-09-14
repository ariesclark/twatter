import { useMemo, useRef, useState } from "react";

import { useConstrainedState } from "~/hooks/use-constrained-state";

export interface ImageEditorProps {}

export const ImageEditor: React.FC<ImageEditorProps> = () => {
	const [file, setFile] = useState<File | null>(null);
	const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
	const [scale, setScale] = useState(1);

	const [dragging, setDragging] = useState(true);
	const [transformX, setTransformX] = useState(0);
	const [transformY, setTransformY] = useState(0);

	return (
		<div>
			<input
				accept="image/*"
				type="file"
				onChange={({ target }) => setFile(target.files?.[0] ?? null)}
			/>
			<div className="bg-black p-8">
				<div
					className="relative aspect-square overflow-hidden bg-white transition-none"
					onPointerDown={() => setDragging(true)}
					onPointerUp={() => setDragging(false)}
					onPointerMove={(event) => {
						if (!dragging) return;
						const { movementX, movementY } = event;

						setTransformX((transformX) => (transformX += movementX / scale));
						setTransformY((transformY) => (transformY += movementY / scale));

						event.preventDefault();
					}}
					onScroll={(e) => e.preventDefault()}
					onWheel={(event) => {
						event.preventDefault();
						setScale((scale) => Math.min(Math.max(1, (scale += event.deltaY * -0.01)), 4));
					}}
				>
					<div
						className="pointer-events-none h-full w-full bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url(${fileUrl})`,
							transform: `scale(${scale}) translate(${transformX}px, ${transformY}px)`
						}}
					/>
				</div>
			</div>
		</div>
	);
};
