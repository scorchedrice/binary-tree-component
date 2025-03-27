import "./App.css";
import { RenderNode } from "./feats/RenderNode.tsx";
import { useNodeMove } from "./feats/useNodeMove.ts";
import { useState } from "react";
import {Direction} from "./types/nodeInterfaceAndType.ts";

function App() {
  const { movePanel, addPanel, removePanelById, changeSplitRatio, layout, getTreeStructure } = useNodeMove();
  const [fromPanel, setFromPanel] = useState("");
  const [targetPanel, setTargetPanel] = useState("");
  const [direction, setDirection] = useState<Direction>("left");
  const [removePanelId, setRemovePanelId] = useState("");
  const [splitId, setSplitId] = useState("");
  const [newRatio, setNewRatio] = useState("0.5");

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="From Panel ID"
          value={fromPanel}
          onChange={(e) => setFromPanel(e.target.value)}
          className="px-2 py-1 border"
        />
        <input
          type="text"
          placeholder="Target Panel ID"
          value={targetPanel}
          onChange={(e) => setTargetPanel(e.target.value)}
          className="px-2 py-1 border"
        />
        <select value={direction} onChange={(e) => setDirection(e.target.value as Direction)} className="px-2 py-1 border">
          <option value="left">좌측</option>
          <option value="right">우측</option>
          <option value="top">상단</option>
          <option value="bottom">하단</option>
        </select>
        <button
          onClick={() => movePanel(fromPanel, targetPanel, direction)}
          className="px-4 py-2 bg-green-500 text-white"
        >
          이동
        </button>
      </div>

      <div className="mb-4 space-x-2">
        <button onClick={addPanel} className="px-4 py-2 bg-blue-500 text-white">패널 추가</button>
        <input
          type="text"
          placeholder="삭제할 패널 ID"
          value={removePanelId}
          onChange={(e) => setRemovePanelId(e.target.value)}
          className="px-2 py-1 border"
        />
        <button onClick={() => removePanelById(removePanelId)} className="px-4 py-2 bg-red-500 text-white">삭제</button>
      </div>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Split ID"
          value={splitId}
          onChange={(e) => setSplitId(e.target.value)}
          className="px-2 py-1 border"
        />
        <input
          type="text"
          placeholder="New Ratio (0~1)"
          value={newRatio}
          onChange={(e) => setNewRatio(e.target.value)}
          className="px-2 py-1 border"
        />
        <button
          onClick={() => changeSplitRatio(splitId, parseFloat(newRatio))}
          className="px-4 py-2 bg-yellow-500 text-white"
        >
          비율 변경
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={() => console.log(getTreeStructure())}
          className="px-4 py-2 bg-gray-500 text-white"
        >
          트리 구조 보기 (콘솔 출력)
        </button>
      </div>

      <div className="relative w-[1200px] h-[600px] border-2 border-black">
        <RenderNode node={layout} width={1200} height={600} x={0} y={0} />
      </div>
    </div>
  );
}

export default App;
