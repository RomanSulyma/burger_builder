import React from "react";
import Ingridient from "../Ingridient/Ingridient";
import classes from './BurgerElements.module.css';

function BurgerElements(props) {

    const className = [classes.Burger, "row"];
    let ingridients;

    ingridients = props.ingridients.map(ingridient => {
        return <Ingridient type={ingridient.name} title={ingridient.name} price={ingridient.price} key={ingridient.id} id={ingridient.id} clicked={props.clicked}/>
    });

    if (props.ingridients.length === 0) {
        ingridients = 'Let\'s add some ingridients';
        className.push(classes.BurgerEmpty);
    }

    return (
        <div className={className.join(' ')}>
            <div className={classes.TopBun}/>
                {ingridients}
            <div className={classes.BottomBun}/>
        </div>
    );
}

export default BurgerElements;