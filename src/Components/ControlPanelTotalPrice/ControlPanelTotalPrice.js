import React from "react";
import classes from './ControlPanelTotalPrice.module.css'

function ControlPanelTotalPrice(props) {

    const className = [classes.ButtonBuy].join(' ');
    const content = props.children !== 0 ? `Total Price : ${props.children}` : 'Burger empty :(';

    return (
        <div className={className} data-price={content} onClick={props.toCheckout}/>
    );
}

export default ControlPanelTotalPrice;