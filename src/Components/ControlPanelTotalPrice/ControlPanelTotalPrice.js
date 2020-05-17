import React from "react";
import classes from './ControlPanelTotalPrice.module.css'
import {withRouter} from "react-router";

function ControlPanelTotalPrice(props) {

    const className = [classes.ButtonBuy].join(' ');
    const content = props.children !== 0 ? `Total Price : ${props.children}` : 'Burger empty :(';

    const toCheckout = () => {
        props.history.push('/checkout');
    };

    return (
        <div className={className} data-price={content} onClick={toCheckout}/>
    );
}

export default withRouter(ControlPanelTotalPrice);