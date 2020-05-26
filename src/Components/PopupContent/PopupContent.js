import React from "react";
import classes from './PopupContent.module.css';
import ContactData from "../ContactData/ContactData";
import {connect} from "react-redux";

function PopupContent(props) {

    let className = [classes.PopupContent];

    return (
        <div className={className}>
            <p>Total price : {props.priceState}</p>
            <ContactData confirm={props.confirm}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        priceState: state.priceState
    }
};

export default connect(mapStateToProps, null)(PopupContent);