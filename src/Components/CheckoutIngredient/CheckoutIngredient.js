import React from "react";
import "./CheckoutIngredient.css";

function CheckoutIngredient(props) {

    return (
        <div className={props.classes} title={props.title}/>
    );
}

export default CheckoutIngredient;