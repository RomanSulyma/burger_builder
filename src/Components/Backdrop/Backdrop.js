import React, {useContext} from "react";
import classes from './Backdrop.module.css'
import Context from "../Context/Context";

function Backdrop() {

    let className = [classes.Backdrop];
    const context = useContext(Context);

    if (!context.visibilityState) {
        className.push(classes.BackdropInvisible);
        className = className.join(' ');
    }

    return (
        <div className={className} onClick={context.visibilityUpdate}/>
    );
}

export default Backdrop;