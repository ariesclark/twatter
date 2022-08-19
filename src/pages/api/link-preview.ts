import { parse as parseHtml } from "node-html-parser";

import type { NextApiRequest, NextApiResponse } from "next";

export type LinkPreviewKind = "summary" | "detailed";

export interface LinkPreview {
	siteName?: string;
	url: string;
	kind: LinkPreviewKind;
	title?: string;
	description?: string;
	image?: {
		url: string;
		width?: number;
		height?: number;
		alt?: string;
	};
	video?: {
		url: string;
		width?: number;
		height?: number;
	};
}

export async function getLinkPreview(url: URL): Promise<LinkPreview> {
	const response = await fetch(url, {
		headers: {
			"User-Agent": "Twitterbot/1.0"
		}
	});

	if (!response.ok) throw new Error("Request failed");

	// We've followed redirects, what is the actual url?
	url = new URL(response.url);

	const html = parseHtml(await response.text());
	const metaTags = html.querySelectorAll("meta");

	const tags: Record<string, string> = Object.fromEntries(
		metaTags.map((element) => {
			const key = element.getAttribute("name") || element.getAttribute("property");
			const value = element.getAttribute("content");
			return [key, value];
		})
	);

	function getProperty(
		keys: Array<string>,
		fallback?: () => string | undefined
	): string | undefined {
		for (const key of keys) if (tags[key]) return tags[key];
		return typeof fallback === "function" ? fallback() : void 0;
	}

	const siteName = getProperty(["og:site_name", "al:ios:app_name", "al:android:app_name"]);

	const title = getProperty(["og:title", "twitter:title"], () => html.querySelector("title")?.text);

	const description = getProperty(["og:description", "twitter:description", "description"]);

	const imageUrl = getProperty([
		"og:image:secure_url",
		"og:image",
		"twitter:image",
		"twitter:image:src"
	]);

	const imageWidth = Number.parseInt(getProperty(["og:image:width"]) ?? "");
	const imageHeight = Number.parseInt(getProperty(["og:image:height"]) ?? "");

	const image: LinkPreview["image"] = imageUrl
		? {
				url: imageUrl,
				width: imageWidth,
				height: imageHeight,
				alt: getProperty(["og:image:alt", "twitter:image:alt"])
		  }
		: void 0;

	let videoUrl = getProperty(["og:video:secure_url", "og:video:url", "twitter:player"]);
	if (videoUrl?.includes("youtube.com")) videoUrl = `${videoUrl}?autoplay=1`;

	const videoWidth = getProperty(["og:video:width", "twitter:player:width"]);
	const videoHeight = getProperty(["og:video:height", "twitter:player:height"]);

	const video: LinkPreview["video"] = videoUrl
		? {
				url: videoUrl,
				width: Number.parseInt(videoWidth || ""),
				height: Number.parseInt(videoHeight || "")
		  }
		: void 0;

	const twitterCard = getProperty(["twitter:card"]) || "summary";
	let kind: LinkPreviewKind = "summary";

	if (twitterCard === "summary_large_image" && imageHeight !== imageWidth) kind = "detailed";
	if (video) kind = "detailed";

	return {
		siteName,
		url: url.toString(),
		kind,
		title,
		description,
		image,
		video,
		tags
	};
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		const preview = await getLinkPreview(new URL(req.query.url as string));
		res.status(200).json(preview);
	} catch (reason) {
		console.error(reason)
		res.status(400).json({ error: reason });
	}
}
