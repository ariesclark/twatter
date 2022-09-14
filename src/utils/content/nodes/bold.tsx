import { mapChildren } from "../react";
import { node } from "../tree";
import { ChildfulNode, CostlyNode, Node, NodeArray, ReactNodeComponent } from "../types";

export interface BoldNode extends Node<"bold">, ChildfulNode, CostlyNode {}

const ReactComponent: ReactNodeComponent<"bold"> = ({ node }) => <b>{mapChildren(node)}</b>;

export const bold = (children: NodeArray): BoldNode => {
	return node("bold", {
		children,
		cost: 1,
		ReactComponent
	});
};
