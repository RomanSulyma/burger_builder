import React, {useEffect} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import Popup from "../../Components/Popup/Popup";
import axios from "axios";
import errorHandler from "../../HOC/ErrorHandler";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";
import axiosInstance from "../../Axios/axiosConfig";

function Checkout(props) {

    useEffect(() => {
        if (props.burgerElements.length === 0) {
            props.fetchBurger();
        }
    }, []);


    const confirmBuy = () => {
        axiosInstance.post('/burger', {
            ingredients: JSON.stringify(props.burgerElements),
            totalPrice: props.priceState,
            burgerElementId: props.burgerElementId
        }).then(() => {
            props.visibilityUpdate();
        }).catch(() => {
            console.log('error add burger');
        });
    };

    let mainScreen = <Loader/>;

    if (props.burgerLoaded) {
        mainScreen = (
            <React.Fragment>
                <Popup confirm={confirmBuy}/>
                <BurgerElements ingridients={props.burgerElements} clicked={() => {
                }}/>
                <CheckoutPanel/>
            </React.Fragment>
        );
    }

    return (
        <div>
            {mainScreen}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        burgerLoaded: state.burgerLoaded,
        visibilityState: state.visibilityState,
        burgerElements: state.burgerElements,
        priceState: state.priceState,
        burgerElementId: state.burgerElementId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility()),
        fetchBurger: () => dispatch(actionCreators.fetchBurger())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Checkout, axios));