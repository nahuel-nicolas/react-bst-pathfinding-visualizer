import React, { useEffect, useState } from 'react';
import mapPatterns from '../utilities/map-patterns';
import Matrix from '../components/Matrix/Matrix';
import NodeOnClickContext from '../context/NodeOnClickContext';
import bstFunction from '../utilities/bst';
import './App.css';

function App() {
  // const {top, left, width, height} = element.getBoundingClientRect();
  const { width } = document.querySelector("body").getBoundingClientRect();
  let isMobile = width < 800 ? 0 : 1;

  const [firstIdx, setFirstIdx] = useState(isMobile);
  const [secondIdx, setSecondIdx] = useState(3);
  const [currentMapPattern, setCurrentMapPattern] = useState(
    mapPatterns[firstIdx][secondIdx]
  );

  const [isStartNodeButtonToggle, setIsStartNodeButtonToggle] = useState(true);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [startNodePosition, setStartNodePosition] = useState(null);
  const [endNodePosition, setEndNodePosition] = useState(null);
  const [domMatrix, setDomMatrix] = useState([]);

  const [isPlayButtonEnabled, setIsPlayButtonEnabled] = useState(false);
  const [areBoardButtonsEnabled, setAreBoardButtonsEnabled] = useState(true);
  const [isMatrixTraversed, setIsMatrixTraversed] = useState(false);

  const nodeOnClickHandler = (currentNode, currentNodePosition, 
  isStartNodeButtonToggle, setStartNodePosition, setEndNodePosition, 
  startNodePosition, endNodePosition, setStartNode, setEndNode, 
  startNode, endNode, currentMapPattern, cleanEveryNodeClasses) => {
    const isCurrentNodeBlocked = currentMapPattern
      [currentNodePosition[0]][currentNodePosition[1]] === 1;
    if (isCurrentNodeBlocked) {
      return;
    }

    const setEdgeNodeHandler = (edgeNode, setEdgeNode, 
    setEdgeNodePosition, iconClassName) => {
      if (edgeNode !== null) {
        edgeNode.classList.remove("edge");
        edgeNode.querySelector("i").className = "";
      }
      currentNode.classList.add("edge");
      currentNode.querySelector("i").className = iconClassName;
      setEdgeNode(currentNode);
      setEdgeNodePosition(currentNodePosition);
    }

    if (startNodePosition === currentNodePosition) {
      setStartNode(null);
      setStartNodePosition(null);
    }
    if (endNodePosition === currentNodePosition) {
      setEndNode(null);
      setEndNodePosition(null);
    }

    // Application
    cleanEveryNodeClasses();
    if (isStartNodeButtonToggle) {
      setEdgeNodeHandler(startNode, setStartNode, 
        setStartNodePosition, "fas fa-map-marker-alt");
    } else {
      setEdgeNodeHandler(endNode, setEndNode, 
        setEndNodePosition, "far fa-dot-circle");
    }
  }

  const matrixRef = [];

  const cleanEveryNodeClasses = () => {
    if (isMatrixTraversed) {
      const classesToRemove = {
        "traversed": true,
        "path-node": true
      }
      for (let i = 0; i < domMatrix.length; i++) {
        for (let j = 0; j < domMatrix[i].length; j++) {
          const currentNode = domMatrix[i][j].current;
          if (currentNode === null) continue;
          for (let classToRemove in classesToRemove) {
            currentNode.classList.remove(classToRemove);
          }
        }
      }
      setIsMatrixTraversed(false)
    }
  }

  const increaseBoardIdxHandler = (isIncreasing) => {
    let currentMapPatternIdx = secondIdx;
    const mapPatternIdxLength = mapPatterns[firstIdx].length;
    if (isIncreasing) {
      currentMapPatternIdx++;
      if (currentMapPatternIdx === mapPatternIdxLength) {
        currentMapPatternIdx = 0;
      }
    } else {
      currentMapPatternIdx--;
      if (currentMapPatternIdx < 0) {
        currentMapPatternIdx = mapPatternIdxLength - 1;
      }
    }

    const removeEdgeNodes = () => {
      const removeEdgeNode = (edgeNode, setEdgeNode, setEdgeNodePosition) => {
        if (edgeNode !== null) {
          edgeNode.classList.remove("edge");
          edgeNode.querySelector("i").className = "";
          setEdgeNode(null);
          setEdgeNodePosition(null);
        }
      }
      removeEdgeNode(startNode, setStartNode, setStartNodePosition);
      removeEdgeNode(endNode, setEndNode, setEndNodePosition);
    }
    setSecondIdx(currentMapPatternIdx);
    setCurrentMapPattern(mapPatterns[firstIdx][currentMapPatternIdx]);
    cleanEveryNodeClasses();
    removeEdgeNodes();
    setIsMatrixTraversed(false);
  }

  const playButtonHandler = async (diagonalMoves) => {
    if (isPlayButtonEnabled) {
      cleanEveryNodeClasses();
      setIsPlayButtonEnabled(false);
      setAreBoardButtonsEnabled(false);
      await bstFunction(
        startNodePosition,
        endNodePosition,
        currentMapPattern,
        domMatrix,
        diagonalMoves
      );
      setIsPlayButtonEnabled(true);
      setAreBoardButtonsEnabled(true);
      setIsMatrixTraversed(true);
    }
  }

  useEffect(() => {
    setDomMatrix(matrixRef)
  }, []);

  // useEffect(() => {
  //   setDomMatrix(matrixRef)
  // }, [firstIdx, secondIdx]);

  useEffect(() => {
    if (startNode !== null && endNode !== null) {
      setIsPlayButtonEnabled(true);
    } else {
      setIsPlayButtonEnabled(false);
    }
  }, [startNode, endNode]);

  return (
    <div className="App">
      <NodeOnClickContext.Provider value={{
        "nodeOnClickHandler": (currentNodeRef, currentNodePosition) => nodeOnClickHandler(
          currentNodeRef.current, currentNodePosition, isStartNodeButtonToggle,  
          setStartNodePosition, setEndNodePosition, startNodePosition, endNodePosition,
          setStartNode, setEndNode, startNode, endNode, currentMapPattern, cleanEveryNodeClasses)
        }}
      >
        <Matrix 
          currentPattern={currentMapPattern}
          matrixRef={matrixRef}
          firstIdx={firstIdx}
          secondIdx={secondIdx}
          setDomMatrix={setDomMatrix}
        />
      </NodeOnClickContext.Provider>
      <div className="btn-container">
        <button 
          onClick={() => setIsStartNodeButtonToggle(true)}
          disabled={isStartNodeButtonToggle || !areBoardButtonsEnabled}
        >
          <i className="fas fa-map-marker-alt"></i>
        </button>
        <button 
          onClick={() => setIsStartNodeButtonToggle(false)}
          disabled={!isStartNodeButtonToggle || !areBoardButtonsEnabled}
        >
          <i className="far fa-dot-circle"></i>
        </button>
      </div>
      <div className="board-buttons">
        <button 
          onClick={() => increaseBoardIdxHandler(false)}
          disabled={!areBoardButtonsEnabled}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          onClick={() => playButtonHandler(true)} 
          disabled={!isPlayButtonEnabled}
        >
          Play
        </button>
        <button 
          onClick={() => increaseBoardIdxHandler(true)}
          disabled={!areBoardButtonsEnabled}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
