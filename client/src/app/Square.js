import React from 'react';

function Square(props) {
    return (
        <button data-testid={props.testId} className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;
