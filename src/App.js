import { useCallback, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import Logo from './assets/logo.png';

import {
  Background,
  MiniMap,
  Controls,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ImageUploaderNode from './ImageUploaderNode.js';

const initialNodes = [
  {
    id: 'input-1',
    type: 'imgUpdater',
    position: { x: 0, y: 0 },
    data: { value: 'Input 1' },
  },
  {
    id: 'input-2',
    type: 'imgUpdater',
    position: { x: 230, y: 0 },
    data: { value: 'Input 2' },
  },
  {
    id: 'output-1',
    type: 'imgUpdater',
    position: { x: 100, y: 250 },
    data: { value: 'Output' },
  },
];

const initialEdges = [
  { id: 'e-1', source: 'input-1', target: 'output-1', animated: true },
  { id: 'e-2', source: 'input-2', target: 'output-1', animated: true },
];

const nodeTypes = { imgUpdater: ImageUploaderNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const addNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'imgUpdater',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { value: '' },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const removeNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  return (
    <div className='h-screen w-full flex flex-col items-center'>
      <div className='flex'>
        <img src={Logo} alt='logo' className='w-18 h-20 mt-4'/>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-5xl mt-4 font-bold text-fuchsia-800'>Salieabs</h1>
          <h1 className='text-2xl mb-4 font-bold text-orange-500'>React Flow Task</h1>
        </div>
      </div>
      <div className="h-4/6 w-8/12 rounded-3xl border-2 border-orange-500 bottom-1">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background variant="cross" color='fuchsia' gap={12} size={1} className='rounded-3xl' />
            <Controls />
            <MiniMap className='bg-white' />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="absolute bottom-5 left-6/12 flex space-x-4">
        <button
          onClick={addNode}
          className='bg-fuchsia-500 text-white px-4 py-2 rounded-lg'
        >
          Add Node
        </button>
        <button
          onClick={() => removeNode(nodes[nodes.length - 1]?.id)}
          className='bg-orange-500 text-white px-4 py-2 rounded-lg'
          disabled={nodes.length === 0}
        >
          Remove Last Node
        </button>
      </div>
    </div>
  );
}

export default Flow;
