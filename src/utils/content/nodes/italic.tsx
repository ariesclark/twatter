import { mapChildren } from "../react";
import { node } from "../tree";
import { ChildfulNode, CostlyNode, Node, NodeArray, ReactNodeComponent } from "../types";

export interface ItalicNode extends Node<"italic">, ChildfulNode, CostlyNode {}

const ReactComponent: ReactNodeComponent<"italic"> = ({ node }) => <em>{mapChildren(node)}</em>;

export const italic = (children: NodeArray): ItalicNode =>
	node("italic", { children, cost: 1, ReactComponent });
