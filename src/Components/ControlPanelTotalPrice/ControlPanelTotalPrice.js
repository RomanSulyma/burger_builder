import React from "react";
import classes from './ControlPanelTotalPrice.module.css'

const ControlPanelTotalPrice = (props) => {

    const content = props.children !== 0 ? `Total Price : ${props.children}` : 'Burger empty :(';

    return (
        <div className={classes.ButtonBuy} data-price={content} onClick={props.toCheckout}/>
    );
};

export default ControlPanelTotalPrice;