import { useEffect, useRef } from 'react';
import NodeOnClickContext from '../../../../context/NodeOnClickContext';

function Node({ position, currentPattern, currentRowRef }) {
    const nodeType = getNodeType(position, currentPattern);
    const currentNodeRef = useRef(null);
    useEffect(() => currentRowRef.push(currentNodeRef), []);
    return (
        <NodeOnClickContext.Consumer>
            {(nodeContext) => (
                <div 
                    className={nodeType} 
                    ref={currentNodeRef}
                    onClick={() => nodeContext.nodeOnClickHandler(
                        currentNodeRef, position)}
                >
                    <i onClick={() => nodeContext.nodeOnClickHandler(
                        currentNodeRef, position)}></i>
                </div>
                )
            }
        </NodeOnClickContext.Consumer>
    );
}

function getNodeType(idxs, currentPattern) {
    return currentPattern[idxs[0]][idxs[1]] === 0 ? "node" : "node blocked";
}

export default Node;