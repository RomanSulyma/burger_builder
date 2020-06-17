import React from "react";
import classes from './Backdrop.module.css'

const Backdrop = (props) => {

    let className = [classes.Backdrop];

    if (!props.visibilityState) {
        className.push(classes.BackdropInvisible);
        className = className.join(' ');
    }

    return (
        <div className={className} onClick={props.visibilityUpdate}/>
    );
};

export default Backdrop;