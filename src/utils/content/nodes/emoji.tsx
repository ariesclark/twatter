import { parse } from "twemoji-parser";

import { node } from "../tree";
import { CostlyNode, Node, ReactNodeComponent } from "../types";

export interface EmojiNode extends Node<"emoji">, CostlyNode {
	emoji: string;
	url: string;
}

const ReactComponent: ReactNodeComponent<"emoji"> = ({ node }) => (
	<img alt={node.emoji} className="inline h-[1em] w-[1em]" src={node.url} />
);

export const emoji = (raw: string): EmojiNode => {
	const entity = parse(raw)[0];
	if (!entity) throw new Error(`Unknown emoji: ${raw}`);

	return node("emoji", { url: entity.url, emoji: raw, cost: 2, ReactComponent });
};
