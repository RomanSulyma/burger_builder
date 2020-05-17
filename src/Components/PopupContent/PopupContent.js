import React, {useContext} from "react";
import classes from './PopupContent.module.css';
import Context from "../Context/Context";
import ContactData from "../ContactData/ContactData";

function PopupContent(props) {

    let className = [classes.PopupContent];
    const context = useContext(Context);

    return (
        <div className={className}>
            <p>Total price : {context.priceState}</p>
            <ContactData confirm={props.confirm}/>
        </div>
    );
}

export default PopupContent;