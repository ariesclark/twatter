import { node } from "../tree";
import { CostlyNode, Node, ReactNodeComponent } from "../types";

export interface TextNode extends Node<"text">, CostlyNode {
	value: string;
}

const ReactComponent: ReactNodeComponent<"text"> = ({ node }) => <span>{node.value}</span>;

export const text = (value: string) => node("text", { value, cost: value.length, ReactComponent });
