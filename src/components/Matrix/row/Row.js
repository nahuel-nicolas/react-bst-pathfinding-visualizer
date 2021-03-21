import { useEffect } from 'react';
import Node from './node/Node';

function Row({ rowPosition, currentPattern, matrixRef }) {
    const nodesRow = [];
    const currentRowRef = [];
    for (
            let colPosition = 0; 
            colPosition < currentPattern[rowPosition].length;
            colPosition++
        ) 
    {
        nodesRow.push(
            <Node 
                key={[rowPosition, colPosition]}
                currentRowRef={currentRowRef}
                position={[rowPosition, colPosition]}
                currentPattern={currentPattern}
            />
        );
    }
    useEffect(() => {
        matrixRef.push(currentRowRef);
    }, []);
    return <div className="row">{nodesRow}</div>;
}



export default Row;