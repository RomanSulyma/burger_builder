import React from "react";

function ControlButton(props) {

    return (
        <div onClick={props.clicked} className={props.className}>{props.children}</div>
    );
}

export default ControlButton;