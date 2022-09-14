import { useMemo } from "react";

import { WithMentionModel } from "~/components/mention/model";

import { node } from "../tree";
import { ChildfulNode, CostlyNode, Node, NodeArray, ReactNodeComponent } from "../types";

import { link, NodeLinkReact } from "./link";

export interface MentionNode extends Node<"mention">, ChildfulNode, CostlyNode {
	userId: string;
}

const ReactComponent: ReactNodeComponent<"mention"> = ({ node }) => {
	const linkNode = useMemo(() => link(`/${node.userId}`, node.children), [node]);

	return (
		<WithMentionModel username={node.userId}>
			<NodeLinkReact node={linkNode} />
		</WithMentionModel>
	);
};

export const mention = (userId: string, children: NodeArray): MentionNode =>
	node("mention", { userId, children, cost: 2, ReactComponent });
