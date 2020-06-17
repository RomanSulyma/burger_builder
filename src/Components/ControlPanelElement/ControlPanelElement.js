import React from "react";
import classes from './ControlPanelElement.module.css';
import ControlButton from "../ControlButton/ControlButton";

const ControlPanelElement = (props) => {

    return (
        <div className={classes.PanelElement}>
            <p>{props.type}</p>
            <p>Price : {props.price}</p>
            <ControlButton clicked={() => props.clicked(props.type)}
                           className={classes.ButtonIngredient}>Add</ControlButton>
        </div>
    );
};

export default ControlPanelElement;