import React, {useContext} from "react";
import classes from './Popup.module.css';
import PopupContent from "../PopupContent/PopupContent";
import Context from "../Context/Context";

function Popup(props) {

    let className = [classes.Popup];
    const context = useContext(Context);

    if (context.visibilityState) {
        className.push(classes.PopupVisible);
        className = className.join(' ');
    }

    return (
        <div className={className}>
            <PopupContent confirm={props.confirm}/>
        </div>
    );
}

export default Popup;