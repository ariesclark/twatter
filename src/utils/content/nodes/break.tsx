import { node } from "../tree";
import { CostlyNode, Node, ReactNodeComponent } from "../types";

export interface BreakNode extends Node<"break">, CostlyNode {}

const ReactComponent: ReactNodeComponent<"break"> = () => <br />;

export const break_ = (): BreakNode => node("break", { cost: 1, ReactComponent });
