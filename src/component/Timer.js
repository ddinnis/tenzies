import React from 'react';

function Timer(props) {
    return (
        <div >
        Timer: {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)} : {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.{("0" + ((props.time / 10) % 100)).slice(-2)}
        </div>
    );
}

export default Timer;
