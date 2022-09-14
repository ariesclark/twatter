import React from "react";

import type { BoldNode } from "./nodes/bold";
import type { BreakNode } from "./nodes/break";
import type { EmojiNode } from "./nodes/emoji";
import type { ItalicNode } from "./nodes/italic";
import type { LinkNode } from "./nodes/link";
import type { MentionNode } from "./nodes/mention";
import type { ParentNode } from "./nodes/parent";
import type { TextNode } from "./nodes/text";

export interface Node<T extends NodeType> {
	type: T;
	ReactComponent: ReactNodeComponent<T>;
}

export interface CostlyNode {
	cost: number;
}

export interface ChildfulNode {
	children: NodeArray;
}

export type AnyNode =
	| ParentNode
	| TextNode
	| BoldNode
	| ItalicNode
	| LinkNode
	| MentionNode
	| BreakNode
	| EmojiNode;

export type NodeArray = Array<AnyNode>;

export type NodeType = AnyNode["type"];
export type NodeOf<T extends NodeType, N extends AnyNode = AnyNode> = N extends { type: T }
	? N
	: never;

export type ReactNodeComponent<T extends NodeType, N extends NodeOf<T> = NodeOf<T>> = React.FC<{
	node: N;
}>;

export type AnyReactNodeComponent = ReactNodeComponent<NodeType>;
