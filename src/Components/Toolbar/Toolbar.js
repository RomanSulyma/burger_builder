import React from "react";
import classes from './Toolbar.module.css';
import {NavLink} from "react-router-dom";

const Toolbar = () => {

    const className = [classes.Toolbar].join(' ');

    return (
        <div className={className}>
            <ul>
                <NavLink to="/burger" className={classes.ToolbarButton}
                         activeClassName={classes.ToolbarButtonActive}>Builder</NavLink>
                <NavLink to="/orders" className={classes.ToolbarButton}
                         activeClassName={classes.ToolbarButtonActive}>Orders</NavLink>
                <NavLink to="/checkout" className={classes.ToolbarButton}
                         activeClassName={classes.ToolbarButtonActive}>Checkout</NavLink>
            </ul>
        </div>
    );
};

export default Toolbar;