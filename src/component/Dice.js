import React from "react";

export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#71C9CE" : "#f0f8ff"
    }

    return(
        <div className="dice" style={styles} onClick={props.holdDice}>
            <div className="dice-num" >
                {props.value}
            </div>
        </div>
    )
}