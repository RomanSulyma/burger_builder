import React from "react";
import classes from './PopupButton.module.css';

const PopupButton = (props) => {

    let className = [classes.PopupButton];
    let clicked = props.clicked;

    if (props.enabled === false) {
        clicked = null;
        className.push(classes.PopupButtonDisabled);
    }

    return (
        <div onClick={clicked} className={className.join(' ')}>{props.children}</div>
    );
};

export default PopupButton;