import React from "react";
import classes from './Popup.module.css';
import PopupContent from "../PopupContent/PopupContent";
import {connect} from "react-redux";

function Popup(props) {

    let className = [classes.Popup];

    if (props.visibilityState) {
        className.push(classes.PopupVisible);
        className = className.join(' ');
    }

    return (
        <div className={className}>
            <PopupContent confirm={props.confirm}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        visibilityState: state.visibilityState
    }
};

export default connect(mapStateToProps, null)(Popup);