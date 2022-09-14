import { bold } from "./nodes/bold";
import { emoji } from "./nodes/emoji";
import { italic } from "./nodes/italic";
import { link } from "./nodes/link";
import { mention } from "./nodes/mention";
import { parent } from "./nodes/parent";
import { text } from "./nodes/text";
import { ParseOptions } from "./tree";
import { AnyNode } from "./types";

export type RuleTransformerFunction = (match: RegExpMatchArray, options: ParseOptions) => AnyNode;
export type Rule = [RegExp, RuleTransformerFunction];

export const rules: Array<Rule> = [
	[
		/\*\*([^*]+)\*\*/,
		([input, value], options) => {
			if (!options.features?.styling) return text(input);
			const node = bold([text(value)]);

			if (options.includeSyntax) return parent([text("**"), node, text("**")]);
			return node;
		}
	],
	[
		/\*([^*]+)\*/,
		([input, value], options) => {
			if (!options.features?.styling) return text(input);
			const node = italic([text(value)]);

			if (options.includeSyntax) return parent([text("*"), node, text("*")]);
			return node;
		}
	],
	[
		/@(?<username>\w+)/,
		(match, options) => {
			const { username } = match.groups as { username: string };
			const node = text(`@${username}`);

			if (!options.features?.mentions) return node;
			return mention(username, [node]);
		}
	],
	[
		/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
		([value]) => emoji(value)
	],
	[
		/\[(?<name>[^[\]]+)\]\((?<href>[^()]+)\)/,
		(match, options) => {
			const { name, href } = match.groups as { name: string; href: string };
			if (!options.features?.links) return text(match[0]);
			const node = link(href, [text(name)]);

			if (options.includeSyntax) return parent([text("["), node, text(`](${href})`)]);
			return node;
		}
	]
];
