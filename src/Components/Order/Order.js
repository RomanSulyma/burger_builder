import React from "react";
import classes from "./Order.module.css"
import CheckoutIngredient from "../CheckoutIngredient/CheckoutIngredient";

const Order = (props) => {

    const ingredientsJSON = JSON.parse(props.order.ingredients);

    let ingredients = ingredientsJSON.map(ingredient => {
        const className = ["Checkout", ingredient.name + "Checkout"].join(' ');
        return <CheckoutIngredient classes={className} title={ingredient.name} key={ingredient.id}/>
    });

    return (
        <div className={classes.Order}>
            <div className={classes.OrderRow}>Burger id : {props.order.burgerId}</div>
            <div className={classes.OrderRow}><span>Burger ingredients : </span>{ingredients}</div>
            <div className={classes.OrderRow}> Burger price : {props.order.totalPrice}</div>
            <div className={classes.OrderRow}> Customer name : {props.order.name}</div>
            <div className={classes.OrderRow}> Customer surname : {props.order.surname}</div>
            <div className={classes.OrderRow}> Customer middleName : {props.order.middleName}</div>
            <div className={classes.OrderRow}> Customer email : {props.order.email}</div>
            <div className={classes.OrderRow}> Customer phone : {props.order.phone}</div>
            <div className={classes.OrderRow}> Customer age : {props.order.age}</div>
        </div>
    );
};

export default Order;