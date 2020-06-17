import React from "react";

const ControlButton = (props) => {

    return (
        <div onClick={props.clicked} className={props.className}>{props.children}</div>
    );
};

export default ControlButton;