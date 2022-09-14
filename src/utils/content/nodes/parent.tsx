import { mapChildren } from "../react";
import { node } from "../tree";
import { ChildfulNode, Node, NodeArray, ReactNodeComponent } from "../types";

export interface ParentNode extends Node<"parent">, ChildfulNode {}

const ReactComponent: ReactNodeComponent<"parent"> = ({ node }) => <span>{mapChildren(node)}</span>;

export const parent = (children: NodeArray): ParentNode =>
	node("parent", { children, ReactComponent });
