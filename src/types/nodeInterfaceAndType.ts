export type LayoutNode = PanelNode | SplitNode;

export interface PanelNode {
  type: "pannel";
  id: string;
}

export interface SplitNode {
  type: "split";
  id: string;
  left: LayoutNode;
  right: LayoutNode;
  orientation: "H" | "V";
  ratio: number;
}

export type Direction = "right" | "left" | "bottom" | "top";