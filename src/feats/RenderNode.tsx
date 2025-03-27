import {LayoutNode} from "../types/nodeInterfaceAndType.ts";

export const RenderNode = ({ node, width, height, x, y }: { node: LayoutNode; width: number; height: number; x: number; y: number }) => {
  if (node.type === "pannel") {
    return (
      <div className={`absolute border border-black font-bold flex justify-center items-center`} style={{ left: x, top: y, width, height }}>
        {node.id}
      </div>
    );
  }

  const isHorizontal = node.orientation === "H";
  const leftWidth = isHorizontal ? width * node.ratio : width;
  const leftHeight = isHorizontal ? height : height * node.ratio;
  const rightWidth = isHorizontal ? width * (1 - node.ratio) : width;
  const rightHeight = isHorizontal ? height : height * (1 - node.ratio);

  return (
    <>
      <RenderNode node={node.left} width={leftWidth} height={leftHeight} x={x} y={y} />
      <RenderNode node={node.right} width={rightWidth} height={rightHeight} x={isHorizontal ? x + leftWidth : x} y={isHorizontal ? y : y + leftHeight} />
    </>
  );
};