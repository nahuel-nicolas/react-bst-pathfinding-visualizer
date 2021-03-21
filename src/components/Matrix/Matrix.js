import React, { Component } from 'react';
import Row from './row/Row';
import './Matrix.css';

class Matrix extends Component {
    shouldComponentUpdate(nextProps) {
        const hasIdxsChanged =
            this.props.firstIdx !== nextProps.firstIdx ||
            this.props.secondIdx !== nextProps.secondIdx;
        return hasIdxsChanged;
    }

    // componentDidMount() {
    //     console.log("mounted")
    //     console.log(this.matrixRef);
    //     this.props.setDomMatrix(this.matrixRef);
    // }

    // componentDidUpdate() {
    //     this.props.setDomMatrix(this.matrixRef);
    // }

    buildMatrix() {
        const matrix = [];
        for (let i = 0; i < this.props.currentPattern.length; i++) {
            matrix.push(
                <Row 
                    key={i}
                    rowPosition={i}
                    currentPattern={this.props.currentPattern}
                    matrixRef={this.props.matrixRef} 
                />
            );
        }
        return matrix;
    }

    render() {
        return <div id="matrix">{this.buildMatrix()}</div>;
    }
}

export default Matrix;