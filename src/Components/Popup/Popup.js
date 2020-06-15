import React from "react";
import classes from './Popup.module.css';
import PopupContent from "../PopupContent/PopupContent";

function Popup(props) {

    let className = [classes.Popup];

    if (props.visibilityState) {
        className.push(classes.PopupVisible);
        className = className.join(' ');
    }

    return (
        <div className={className}>
            <PopupContent validationConstraints={props.validationConstraints} visibilityUpdate={props.visibilityUpdate}
                          updateValidationConstraints={props.updateValidationConstraints} error={props.error}
                          fieldType={props.popupFields} enabledState={props.enabledState}
                          enabledStateUpdate={props.enabledStateUpdate} confirm={props.confirm}/>
        </div>
    );
}


export default Popup;