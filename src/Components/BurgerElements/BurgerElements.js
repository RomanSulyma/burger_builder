import React from "react";
import Ingredient from "../Ingredient/Ingredient";
import classes from './BurgerElements.module.css';

const BurgerElements = (props) => {

    const className = [classes.Burger, "row"];
    let ingredients;

    ingredients = props.ingredients.map(ingredient => {
        return <Ingredient type={ingredient.name} title={ingredient.name} price={ingredient.price} key={ingredient.id}
                           id={ingredient.id} clicked={props.clicked}/>
    });

    if (props.ingredients.length === 0) {
        ingredients = `Let's add some ingredients`;
        className.push(classes.BurgerEmpty);
    }

    return (
        <div className={className.join(' ')}>
            <div className={classes.TopBun}/>
            {ingredients}
            <div className={classes.BottomBun}/>
        </div>
    );
};

export default BurgerElements;