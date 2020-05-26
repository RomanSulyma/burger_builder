import React from "react";
import ControlButton from "../ControlButton/ControlButton";
import classes from "./CheckoutPanel.module.css";
import {withRouter} from "react-router";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";

function CheckoutPanel(props) {

    let text = "Your burger not ready :(";

    if (props.burgerElements.length !== 0) {
        text = "Your burger ready!";
    }

    const toBurgerBuilder = () => {
        props.history.push('/burger');
    };

    return (
        <div className={classes.CheckoutPanel}>
            <p>{text}</p>
            <ControlButton clicked={toBurgerBuilder} className={classes.CheckoutButton}>Cancel</ControlButton>
            <ControlButton clicked={props.visibilityUpdate} className={classes.CheckoutButton}>Continue</ControlButton>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        burgerElements: state.burgerElements
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutPanel));