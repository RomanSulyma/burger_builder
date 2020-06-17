import React from "react";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./CheckoutPanel.module.css";

const CheckoutPanel = (props) => {

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
            case props.nextActions.buy :
                props.updateNextButtonActions(props.nextActions.buy);
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
                           className={classes.CheckoutButton}>Cancel</ControlButton>
            <ControlButton clicked={() => nextAction(props.nextActions.buy)}
                           className={classes.CheckoutButton}>Continue</ControlButton>
        </React.Fragment>
    );

    let text = "Your burger not ready :(";

    if (!props.isAuthorized) {

        text = "Need authorization";
        buttons = (
            <React.Fragment>
                <ControlButton clicked={() => nextAction(props.nextActions.login)}
                               className={classes.CheckoutButton}>Login</ControlButton>
                <ControlButton clicked={() => nextAction(props.nextActions.register)}
                               className={classes.CheckoutButton}>Register</ControlButton>
            </React.Fragment>
        );

    } else if (props.burgerElements.length !== 0) {
        text = "Your burger ready!";
    }

    return (
        <div className={classes.CheckoutPanel}>
            <p>{text}</p>
            {buttons}
        </div>
    );
};

export default CheckoutPanel;