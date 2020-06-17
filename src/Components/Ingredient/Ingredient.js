import React from "react";
import './Ingredient.css';

const Ingredient = (props) => {

    const classes = [props.type, 'Ingredient'].join(' ');
    const title = `Price : ${props.price}`;

    return (
        <React.Fragment>
            <div className={classes} onClick={() => props.clicked(props.id)} title={props.title}/>
            <p className="IngredientText">{title}</p>
        </React.Fragment>
    );
};

export default Ingredient;