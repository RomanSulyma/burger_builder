import React from "react";
import classes from "./Order.module.css"
import CheckoutIngredient from "../CheckoutIngredient/CheckoutIngredient";

function Order(props) {

    const ingredientsJSON = JSON.parse(props.burger.ingredients);

    let ingredients = ingredientsJSON.map(ingredient => {
        const className = ["Checkout", ingredient.name + "Checkout"].join(' ');
        return <CheckoutIngredient classes={className} title={ingredient.name} key={ingredient.id}/>
    });

    return (
        <div className={classes.Order}>
            <div className={classes.OrderRow}>Burger id : {props.burger.id}</div>
            <div className={classes.OrderRow}><span>Burger ingredients : </span>{ingredients}</div>
            <div className={classes.OrderRow}> Burger price : {props.burger.totalPrice}</div>
        </div>
    );
}

export default Order;