import {useState} from "react";
import { LayoutNode, PanelNode, SplitNode } from "../types/nodeInterfaceAndType.ts";

// 초기 레이아웃 트리
const initialLayout: LayoutNode = {
  type: "split",
  id: "root",
  orientation: "H",
  ratio: 0.5,
  left: {
    type: "pannel",
    id: "panel1",
  },
  right: {
    type: "split",
    id: "split1",
    orientation: "V",
    ratio: 0.5,
    left: {
      type: "pannel",
      id: "panel2",
    },
    right: {
      type: "split",
      id: "split2",
      orientation: "H",
      ratio: 0.5,
      left: {
        type: "pannel",
        id: "panel3",
      },
      right: {
        type: "pannel",
        id: "panel4",
      },
    },
  },
};

export function useNodeMove() {
  const [layout, setLayout] = useState<LayoutNode>(initialLayout);
  const [panelCount, setPanelCount] = useState(4);

  // 패널 이동
  const movePanel = (panelId: string, targetPanelId: string, direction: "left" | "right" | "top" | "bottom") => {
    let movingPanel: PanelNode | null = null;

    // 패널을 트리에서 제거하는 함수
    const removePanel = (node: LayoutNode): LayoutNode | null => {
      if (node.type === "pannel" && node.id === panelId) {
        movingPanel = node;
        return null;
      }
      if (node.type === "split") {
        const left = removePanel(node.left);
        const right = removePanel(node.right);
        if (!left) return right;
        if (!right) return left;
        return { ...node, left, right };
      }
      return node;
    };

    // 패널을 특정 위치에 추가하는 함수
    const addPanel = (node: LayoutNode): LayoutNode => {
      if (node.type === "pannel" && node.id === targetPanelId && movingPanel) {
        return {
          type: "split",
          id: `split-${panelId}-${targetPanelId}`,
          orientation: direction === "left" || direction === "right" ? "H" : "V",
          ratio: 0.5,
          left: direction === "left" || direction === "top" ? movingPanel : node,
          right: direction === "left" || direction === "top" ? node : movingPanel,
        };
      }
      if (node.type === "split") {
        return { ...node, left: addPanel(node.left), right: addPanel(node.right) };
      }
      return node;
    };

    const newLayout = removePanel(layout);
    if (movingPanel && newLayout) {
      setLayout(addPanel(newLayout) as SplitNode);
    }
  };

  // 패널 추가 (우측 하단에 배치)
  const addPanel = () => {
    setPanelCount((prev) => prev + 1);
    const newPanel: PanelNode = { type: "pannel", id: `panel${panelCount + 1}` };

    const addToBottomRight = (node: LayoutNode): LayoutNode => {
      if (node.type === "pannel") {
        return {
          type: "split",
          id: `split-${node.id}-${newPanel.id}`,
          orientation: "H",
          ratio: 0.5,
          left: node,
          right: newPanel,
        };
      }
      if (node.type === "split") {
        return { ...node, right: addToBottomRight(node.right) };
      }
      return node;
    };

    setLayout((prev) => addToBottomRight(prev) as SplitNode);
  };

  // 패널 삭제
  const removePanelById = (panelId: string) => {
    const remove = (node: LayoutNode): LayoutNode | null => {
      if (node.type === "pannel" && node.id === panelId) return null;
      if (node.type === "split") {
        const left = remove(node.left);
        const right = remove(node.right);
        if (!left) return right;
        if (!right) return left;
        return { ...node, left, right };
      }
      return node;
    };

    const newLayout = remove(layout);
    if (newLayout) {
      setLayout(newLayout as SplitNode);
    }
  };

  // 트리 구조 보기 (콘솔 출력)
  const getTreeStructure = () => {
    console.log(JSON.stringify(layout, null, 2));
  };

  // 비율 변경
  const changeSplitRatio = (splitId: string, newRatio: number) => {
    const updateRatio = (node: LayoutNode): LayoutNode => {
      if (node.type === "split" && node.id === splitId) {
        return { ...node, ratio: newRatio };
      }
      if (node.type === "split") {
        node.left = updateRatio(node.left);
        node.right = updateRatio(node.right);
      }
      return node;
    };

    const newLayout = updateRatio(layout);
    if (newLayout) {
      setLayout(newLayout as SplitNode);
    }
  };

  return {
    movePanel,
    addPanel,
    removePanelById,
    getTreeStructure,
    changeSplitRatio,
    layout,
  };
}
