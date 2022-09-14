import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { WhatsHappeningPreview } from "./whats-happening";

export type RightAsideProps = React.ComponentProps<"aside"> & { sticky?: RightAsidePropsSticky };

export const RightAside: React.FC<RightAsideProps> = (props) => {
	const { sticky, ...elementProps } = props;

	return (
		<aside
			{...elementProps}
			className={twMerge(
				"hidden h-[2000px] w-80 shrink-0 flex-col xl:flex 2xl:w-96",
				elementProps.className
			)}
		>
			{elementProps.children}
			<RightAsideSticky {...sticky} />
		</aside>
	);
};

export type RightAsidePropsSticky = React.ComponentProps<"div">;
export interface FooterLinkItemProps {
	name: string;
	href: string;
}

const FooterLinkItem: React.FC<FooterLinkItemProps> = ({ name, href }) => {
	return (
		<Link href={href}>
			<a className="hover:underline">{name}</a>
		</Link>
	);
};

export const RightAsideSticky: React.FC<RightAsidePropsSticky> = (props) => {
	return (
		<div
			{...props}
			className={twMerge(
				"sticky top-0 flex flex-col gap-8 py-8 h-full max-h-screen",
				props.className
			)}
		>
			{props.children}
			<WhatsHappeningPreview />
			<footer className="mt-auto flex flex-col text-sm text-gray-700">
				<div className="flex flex-wrap gap-x-2">
					<FooterLinkItem href="/legal/terms-of-service" name="Terms of Service" />
					<FooterLinkItem href="/legal/privacy-policy" name="Privacy Policy" />
					<FooterLinkItem href="/legal/cookies" name="Cookie Policy" />
					<FooterLinkItem href="/security" name="Security Policy" />
					<FooterLinkItem href="/developers" name="Developers" />
					<FooterLinkItem href="/status" name="Status" />
				</div>
				<span className="mt-2">
					Copyright © {new Date().getFullYear()},{" "}
					<Link href="https://ariesclark.com">
						<a className="hover:underline">Aries Clark</a>
					</Link>
					.
				</span>
			</footer>
		</div>
	);
};
