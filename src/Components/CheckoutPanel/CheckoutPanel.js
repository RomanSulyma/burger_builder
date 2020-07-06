import React from "react";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./CheckoutPanel.module.css";

const CheckoutPanel = (props) => {

    const firstButtonClass = classes.CheckoutButton;
    const secondButtonClass = [classes.CheckoutButton, classes.CheckoutButtonSecond].join(' ');
    const singleButtonClass = [classes.CheckoutButton, classes.CheckoutButtonSingle].join(' ');

    const nextAction = (action) => {
        switch (action) {
            case props.nextActions.login :
                props.updateNextButtonActions(props.nextActions.login);
                props.visibilityUpdate();
                break;
            case props.nextActions.register :
                props.updateNextButtonActions(props.nextActions.register);
                props.visibilityUpdate();
                break;
            case props.nextActions.order :
                props.updateNextButtonActions(props.nextActions.order);
                props.visibilityUpdate();
                break;
            case props.nextActions.cancel :
                props.toBurgerBuilder();
                break;
            default :
                break;
        }
    };

    let buttons = (
        <React.Fragment>
            <ControlButton clicked={() => nextAction(props.nextActions.cancel)}
                           className={firstButtonClass}>Cancel</ControlButton>
            <ControlButton clicked={() => nextAction(props.nextActions.order)}
                           className={secondButtonClass}>Continue</ControlButton>
        </React.Fragment>
    );

    let text = "Your burger ready!";

    if (props.burgerElements.length === 0) {

        text = "Your burger not ready :(";

        buttons = (
            <React.Fragment>
                <ControlButton clicked={() => nextAction(props.nextActions.cancel)}
                               className={singleButtonClass}>Cancel</ControlButton>
            </React.Fragment>
        );

    } else if (!props.isAuthorized) {

        text = "Need authorization";

        buttons = (
            <React.Fragment>
                <ControlButton clicked={() => nextAction(props.nextActions.login)}
                               className={firstButtonClass}>Login</ControlButton>
                <ControlButton clicked={() => nextAction(props.nextActions.register)}
                               className={secondButtonClass}>Register</ControlButton>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.CheckoutPanel}>
            <p>{text}</p>
            {buttons}
        </div>
    );
};

export default CheckoutPanel;
