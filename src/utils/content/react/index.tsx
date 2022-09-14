import { useMemo } from "react";

import { fromString, isNode, ParseOptions } from "../tree";
import { AnyNode, AnyReactNodeComponent, ChildfulNode } from "../types";

export type ContentProps = React.ComponentProps<"div"> & {
	options?: ParseOptions;
	value: string | AnyNode;
};

export type UseSyntaxTreeReturn = AnyNode & { ReactComponent: AnyReactNodeComponent };

export function useSyntaxTree(
	value: string | AnyNode,
	options: ParseOptions = {}
): UseSyntaxTreeReturn {
	return useMemo(
		() => (isNode(value) ? value : fromString(value, options)),
		[value, options]
	) as UseSyntaxTreeReturn;
}

type MapNodesFunction<T> = (node: AnyNode, nodeIndex: number) => T;

export function mapChildren(node: ChildfulNode): Array<React.ReactElement>;
export function mapChildren<T>(node: ChildfulNode, fn?: MapNodesFunction<T>): Array<T>;
export function mapChildren(node: ChildfulNode, fn?: MapNodesFunction<unknown>): Array<unknown> {
	return node.children.map(
		fn ??
			((childNode, childNodeIndex) => {
				const ReactComponent = childNode.ReactComponent as AnyReactNodeComponent;
				return <ReactComponent key={childNodeIndex} node={childNode} />;
			})
	);
}

export const Content: React.FC<ContentProps> = (props) => {
	const { value, options, ...elementProps } = props;

	const node = useSyntaxTree(value, options);
	const ReactComponent = node.ReactComponent as AnyReactNodeComponent;

	return (
		<div {...elementProps}>
			<ReactComponent node={node} />
		</div>
	);
};

export const LimitedContent: React.FC<ContentProps> = (props) => {
	return <Content {...props} options={{ ...props.options, features: {} }} />;
};
