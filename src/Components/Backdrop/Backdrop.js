import React from "react";
import classes from './Backdrop.module.css'
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";

function Backdrop(props) {

    let className = [classes.Backdrop];

    if (!props.visibilityState) {
        className.push(classes.BackdropInvisible);
        className = className.join(' ');
    }

    return (
        <div className={className} onClick={props.visibilityUpdate}/>
    );
}

const mapStateToProps = (state) => {
    return {
        visibilityState: state.visibilityState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);