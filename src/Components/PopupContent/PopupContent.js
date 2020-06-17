import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import PopupButton from "../PopupButton/PopupButton";
import classes from './PopupContent.module.css'

const PopupContent = (props) => {

    const validation = (inputElement) => {

        if (inputElement.isValid && inputElement.isTouched) {

            if (!inputElement.value.match(new RegExp(inputElement.regex))) {
                inputElement.isValid = false;
            }
        }
    };

    const toggleButton = (newValidationConstraints) => {

        props.enabledStateUpdate(true);
        newValidationConstraints.forEach(inputElement => {

            if (!inputElement.isValid && inputElement.fieldType === props.fieldType) {
                props.enabledStateUpdate(false);
            }
        });
    };

    const inputHandler = (event, inputElement) => {

        inputElement.value = event.target.value;
        inputElement.isTouched = true;
        inputElement.isValid = true;

        validation(inputElement); // validate and modify input element

        const newValidationConstraints = [...props.validationConstraints];
        const index = newValidationConstraints.findIndex(value => value.id === inputElement.id);

        newValidationConstraints.splice(index, 1, inputElement);

        toggleButton(newValidationConstraints);

        props.updateValidationConstraints(newValidationConstraints);
    };

    const inputs = props.validationConstraints.map(inputElement => {
        if (inputElement.fieldType === props.fieldType) {
            return <CustomInput placeholder={inputElement.placeholder} key={inputElement.id} inputElement={inputElement}
                                changed={(event) => inputHandler(event, inputElement)}/>
        } else {
            return null;
        }
    });

    const error = props.error == null ?
        null :
        <div className={classes.PopupError}>
            {props.error}
        </div>;

    return (
        <div className={classes.PopupContent}>
            {error}
            {inputs}
            <PopupButton clicked={props.visibilityUpdate}>CANCEL</PopupButton>
            <PopupButton clicked={props.confirm} enabled={props.enabledState}>CONFIRM</PopupButton>
        </div>
    );
};

export default PopupContent;