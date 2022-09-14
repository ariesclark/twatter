import { capitalize } from "../capitalize";

import { break_ } from "./nodes/break";
import { parent } from "./nodes/parent";
import { text } from "./nodes/text";
import { rules } from "./rules";
import { AnyNode, ChildfulNode, CostlyNode, NodeArray, NodeOf, NodeType } from "./types";

export type Feature = "styling" | "links" | "mentions";
export type FeatureSet = { [K in Feature]?: boolean };

export interface ParseOptions {
	features?: FeatureSet;
	includeSyntax?: boolean;
}

export const DefaultFeatures: FeatureSet = { links: true, mentions: true, styling: true };

export function normalize(nodes: NodeArray): NodeArray {
	return nodes
		.flatMap((node) => (node.type === "parent" ? normalize(node.children) : node))
		.filter((node, idx, arr) => {
			if ("value" in node) {
				if (node.value.length === 0) return false;
			}
			if (arr.length - 1 === idx && node.type === "break") return false;
			return true;
		});
}

export function getNodeText(node: AnyNode): string {
	if (isChildfulNode(node)) return node.children.map(getNodeText).join("");
	if (node.type === "text") return node.value;
	if (node.type === "break") return `\n`;
	return "";
}

export function getNodeCost(node: AnyNode): number {
	const nodeCost = isCostlyNode(node) ? node.cost : 0;

	if (isChildfulNode(node)) {
		return node.children.reduce((prev, curr) => {
			return prev + getNodeCost(curr);
		}, nodeCost);
	}

	return nodeCost;
}

export function isNode(node: unknown): node is AnyNode {
	return typeof node === "object" && node !== null && "type" in node;
}

export function isChildfulNode(node: unknown): node is ChildfulNode {
	return isNode(node) && "children" in node && Array.isArray(node.children);
}

export function isCostlyNode(node: unknown): node is CostlyNode {
	return isNode(node) && "cost" in node && typeof node.cost === "number";
}

export const node = <T extends NodeType, N extends NodeOf<T> = NodeOf<T>>(
	type: T,
	properties: Omit<N, "type">
): N => {
	const { ReactComponent } = properties as Omit<AnyNode, "type">;
	ReactComponent.displayName = capitalize(type);

	return {
		type,
		...properties,
		ReactComponent
	} as N;
};

function preprocessString(source: string): string {
	return (
		source
			// remove excessive spaces.
			.split(/ +/g)
			.join(" ")
			// remove excessive newlines
			.split(/\n{2,}/g)
			.join("\n\n")
	);
}

export function fromString(source: string, options: ParseOptions = {}): AnyNode {
	options.features ??= DefaultFeatures;

	if (source.includes("\n")) {
		return parent(
			normalize(
				preprocessString(source)
					.split("\n")
					.map((line) => {
						const node = fromString(line.trimStart(), options);
						return [node, node.type !== "break" && break_()].filter(Boolean) as NodeArray;
					})
					.flat(1)
			)
		);
	}

	for (const rule of rules) {
		const [regex, transformer] = rule;

		const match = source.match(regex);
		if (match === null || typeof match.input !== "string" || typeof match.index !== "number")
			continue;

		const prev = fromString(match.input.slice(0, match.index), options);
		const curr = transformer(match, options);
		const after = fromString(match.input.slice(match[0].length + match.index), options);

		return parent([prev, curr, after]);
	}

	return text(source);
}
