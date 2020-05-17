import React, {useContext} from "react";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./CheckoutPanel.module.css";
import Context from "../Context/Context";
import {withRouter} from "react-router";

function CheckoutPanel(props) {

    const context = useContext(Context);
    let text = "Your burger not ready :(";

    if (context.burgerElements.length !== 0) {
        text = "Your burger ready!";
    }

    const toBurgerBuilder = () => {
        props.history.push('/burger');
    };

    return (
        <div className={classes.CheckoutPanel}>
            <p>{text}</p>
            <ControlButton clicked={toBurgerBuilder} className={classes.CheckoutButton}>Cancel</ControlButton>
            <ControlButton clicked={context.visibilityUpdate} className={classes.CheckoutButton}>Continue</ControlButton>
        </div>
    );
}

export default withRouter(CheckoutPanel);