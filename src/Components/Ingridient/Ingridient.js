import React from "react";
import './Ingridient.css';

function Ingridient(props) {

    const classes = [props.type, 'Ingridient'].join(' ');
    const title = `Price : ${props.price}`;

    return (
        <React.Fragment>
            <div className={classes} onClick={() => props.clicked(props.id)} title={props.title}/>
            <p className="IngridientText">{title}</p>
        </React.Fragment>
    );
}

export default Ingridient;