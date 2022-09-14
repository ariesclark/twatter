import NextLink from "next/link";

import { mapChildren } from "../react";
import { node } from "../tree";
import { ChildfulNode, CostlyNode, Node, NodeArray, ReactNodeComponent } from "../types";

export interface LinkNode extends Node<"link">, ChildfulNode, CostlyNode {
	href: string;
}

export { ReactComponent as NodeLinkReact };
const ReactComponent: ReactNodeComponent<"link"> = ({ node }) => (
	<NextLink href={node.href}>
		<a className="text-blue-600 hover:underline">{mapChildren(node)}</a>
	</NextLink>
);

export const link = (href: string, children: NodeArray): LinkNode =>
	node("link", { href, children, cost: 2, ReactComponent });
