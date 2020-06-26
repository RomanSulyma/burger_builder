import React, {useEffect} from "react";
import Loader from "../../Components/Loader/Loader";
import Order from "../../Components/Order/Order";
import classes from "./Orders.module.css"
import * as actionCreators from "../../Redux/ActionCreators";
import {connect} from "react-redux";
import PopupButton from "../../Components/PopupButton/PopupButton";
import errorHandler from "../../HOC/ErrorHandler";

const Orders = (props) => {

    let mainScreen = <Loader/>;

    useEffect(() => {
        props.fetchAllOrders();
    }, []);


    if (props.orders) {

        if (props.orders.length !== 0) {
            mainScreen = props.orders.map(order => {
                return <Order order={order} key={order.burgerId}>{order}</Order>
            });
        } else {
            mainScreen = <h1>Your orders empty :(</h1>
        }
    }

    return (
        <div className={classes.Orders}>
            <PopupButton clicked={props.fetchAllOrders}>All orders</PopupButton>
            <PopupButton clicked={() => props.fetchMyOrders(props.token)}>My orders</PopupButton>
            {mainScreen}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        isAuthorized: state.isAuthorized,
        token: state.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrders: () => dispatch(actionCreators.fetchAllOrders()),
        fetchMyOrders: (token) => dispatch(actionCreators.fetchMyOrders(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders));