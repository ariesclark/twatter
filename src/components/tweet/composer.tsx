import React, { useRef, useState } from "react";

import { useSyntaxTree } from "~/utils/content/react";
import { getNodeCost } from "~/utils/content/tree";
import { AnyNode } from "~/utils/content/types";

const PostCost: React.FC<{ node: AnyNode }> = ({ node }) => {
	const cost = getNodeCost(node);
	return <span className="text-sm">{cost}</span>;
};

export const TweetComposer: React.FC = () => {
	const [message, setMessage] = useState("foo bar");

	const node = useSyntaxTree(message, { includeSyntax: false });
	const { ReactComponent } = node;

	const inputRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div>
			<textarea
				className="w-full"
				ref={inputRef}
				rows={message.split("\n").length}
				value={message}
				onBlur={() => setMessage((message) => message.trim())}
				onChange={({ target }) => setMessage(target.value)}
			/>
			<div className="relative" onClick={(event) => console.log(event)}>
				<ReactComponent node={node} />
			</div>
			<PostCost node={node} />
		</div>
	);
};
