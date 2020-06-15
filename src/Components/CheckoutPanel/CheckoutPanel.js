import React from "react";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./CheckoutPanel.module.css";

export const nextActions = {
    login: 'login',
    register: 'register',
    buy: 'buy',
    cancel: 'cancel'
};

function CheckoutPanel(props) {

    const nextAction = (action) => {
        switch (action) {
            case nextActions.login :
                props.updateNextButtonActions(nextActions.login);
                props.visibilityUpdate();
                break;
            case nextActions.register :
                props.updateNextButtonActions(nextActions.register);
                props.visibilityUpdate();
                break;
            case nextActions.buy :
                props.updateNextButtonActions(nextActions.buy);
                props.visibilityUpdate();
                break;
            case nextActions.cancel :
                props.toBurgerBuilder();
                break;
        }
    };

    let buttons = (
        <React.Fragment>
            <ControlButton clicked={() => nextAction(nextActions.cancel)}
                           className={classes.CheckoutButton}>Cancel</ControlButton>
            <ControlButton clicked={() => nextAction(nextActions.buy)}
                           className={classes.CheckoutButton}>Continue</ControlButton>
        </React.Fragment>
    );

    let text = "Your burger not ready :(";

    if (!props.isAuthorized) {

        text = "Need authorization";
        buttons = (
            <React.Fragment>
                <ControlButton clicked={() => nextAction(nextActions.login)}
                               className={classes.CheckoutButton}>Login</ControlButton>
                <ControlButton clicked={() => nextAction(nextActions.register)}
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
}

export default CheckoutPanel;