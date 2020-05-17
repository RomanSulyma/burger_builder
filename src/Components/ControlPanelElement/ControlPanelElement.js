import React from "react";
import classes from './ControlPanelElement.module.css';
import ControlButton from "../ControlButton/ControlButton";

function ControlPanelElement(props) {

    const className = [classes.PanelElement].join(' ');

    return (
        <div className={className}>
            <p>{props.type}</p>
            <p>Price : {props.price}</p>
            <ControlButton clicked={() => props.clicked(props.type)} className={classes.ButtonIngridient}>Add</ControlButton>
        </div>
    );
}

export default ControlPanelElement;