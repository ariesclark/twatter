import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import { findAndReplace as findAndReplaceMdast } from "mdast-util-find-and-replace";
import {
	findAndReplace as findAndReplaceHast,
	FindAndReplaceList
} from "hast-util-find-and-replace";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { parse as parseEmoji } from "twemoji-parser";

const MentionRegex = /@(\w+)/gi;
const EmojiRegex =
	/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
const UrlRegex = /(https?:\/\/)?(\.?\w+)?(\.\w+)\S*/gi;

const MarkdownLink: NormalComponents["a"] = (props) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { node, ...elementProps } = props;

	return (
		<Link href={props.href ?? "#"}>
			<a {...elementProps} className={twMerge("text-blue-600 hover:underline", props.className)} />
		</Link>
	);
};

const Emoji: React.FC<{ src: string }> = ({ src }) => {
	return <img className="inline h-[1em] w-[1em]" {...{ src }} />;
};

const MarkdownImage: NormalComponents["img"] = (props) => {
	const { node, ...elementProps } = props;

	const isEmojiImage = (node.data?.emoji as boolean) || false;
	if (isEmojiImage) return <Emoji src={props.src ?? ""} />;

	return <img {...elementProps} />;
};

export type UserTextBlockFeatures = "mentions" | "styles" | "emojis" | "links";
export const DefaultUserTextBlockFeatures: Record<UserTextBlockFeatures, boolean> = {
	emojis: true,
	mentions: true,
	styles: true,
	links: true
};

export interface UserTextBlockProps {
	className?: string;
	children: string;
	defaultFeatures?: boolean;
	features?: Partial<Record<UserTextBlockFeatures, boolean>>;
}

export const UserTextBlock: React.FC<UserTextBlockProps> = (props) => {
	const { defaultFeatures = true } = props;
	const features = defaultFeatures
		? { ...DefaultUserTextBlockFeatures, ...(props.features ?? {}) }
		: props.features ?? {};

	return (
		<ReactMarkdown
			unwrapDisallowed
			className={twMerge("flex flex-col gap-[1ch]", props.className)}
			allowElement={(element) => {
				if (["p"].includes(element.tagName)) return true;
				if (features.styles && ["strong", "em"].includes(element.tagName)) return true;
				if (features.links && ["a"].includes(element.tagName)) return true;
				if (element.data?.emoji) return true;
				return false;
			}}
			components={{
				a: MarkdownLink,
				img: MarkdownImage
			}}
			rehypePlugins={[
				() => {
					return (node, file, next) => {
						const find: FindAndReplaceList = [];

						if (features.emojis)
							find.push([
								EmojiRegex,
								(match) => {
									const emoji = parseEmoji(match)[0];
									if (!emoji) return false;

									return {
										type: "element",
										tagName: "img",
										data: { emoji: true },
										properties: {
											src: emoji.url,
											alt: match
										},
										children: []
									};
								}
							]);

						findAndReplaceHast(node, find);
						next();
					};
				}
			]}
			remarkPlugins={[
				() => {
					return (node, file, next) => {
						findAndReplaceMdast(node, [
							[
								MentionRegex,
								(match, username) =>
									features.mentions
										? {
												type: "link",
												url: `/${username}`,
												children: [{ type: "text", value: match }]
										  }
										: false
							],
							[
								UrlRegex,
								(match) =>
									features.links
										? {
												type: "link",
												url: match,
												children: [{ type: "text", value: match }]
										  }
										: false
							]
						]);
						next();
					};
				}
			]}
		>
			{props.children}
		</ReactMarkdown>
	);
};

export type LimitedUserTextBlockProps = Omit<UserTextBlockProps, "defaultFeatures">;

export const LimitedUserTextBlock: React.FC<LimitedUserTextBlockProps> = (props) => {
	return (
		<UserTextBlock
			{...props}
			defaultFeatures={false}
			features={{ emojis: true, ...props.features }}
		>
			{props.children}
		</UserTextBlock>
	);
};
