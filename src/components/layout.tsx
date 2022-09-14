import { twMerge } from "tailwind-merge";

import { LeftAside } from "./left-aside";
import { RightAside, RightAsideProps } from "./right-aside";

export type LayoutProps = React.PropsWithChildren<{
	root?: React.ComponentProps<"div">;
	container?: Omit<React.ComponentProps<"div">, "children">;
	leftAside?: React.ReactNode;
	rightAside?: RightAsideProps;
	content?: Omit<React.ComponentProps<"div">, "children">;
}>;

export const Layout: React.FC<LayoutProps> = (props) => {
	const { root, container, leftAside, rightAside, content, children } = props;

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100">
			<div className={twMerge("relative flex w-full max-w-screen-2xl flex-col", root?.className)}>
				{root?.children}
				<div className="mx-16 flex flex-col gap-8">
					<div {...container} className={twMerge("flex gap-8", container?.className)}>
						<LeftAside>{leftAside}</LeftAside>
						<div {...content} className={twMerge("mt-8 flex w-full flex-col", content?.className)}>
							{children}
						</div>
						<RightAside {...rightAside} />
					</div>
				</div>
			</div>
		</div>
	);
};
