import React from "react";
import classes from "./CustomInput.module.css";

function CustomInput(props) {

    const inputClasses = [classes.CustomInput];
    const errorClasses = [classes.Error];

    if (!props.inputElement.isValid && props.inputElement.isTouched) {
        inputClasses.push(classes.CustomInputInvalid);
        errorClasses.push(classes.ErrorActive);
    }

    return (
        <div>
            <input onChange={props.changed} className={inputClasses.join(' ')} {...props.inputElement.config}/>
            <div className={errorClasses.join(' ')}>{props.inputElement.error}</div>
        </div>

    );
}

export default CustomInput;