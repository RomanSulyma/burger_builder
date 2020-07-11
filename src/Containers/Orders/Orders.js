import React, {useEffect} from "react";
import Loader from "../../Components/Loader/Loader";
import Order from "../../Components/Order/Order";
import classes from "./Orders.module.css"
import * as actionCreators from "../../Redux/ActionCreators";
import {useDispatch, useSelector} from "react-redux";
import PopupButton from "../../Components/PopupButton/PopupButton";
import errorHandler from "../../HOC/ErrorHandler";

const Orders = () => {

    let mainScreen = <Loader/>;

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const dispatch = useDispatch();

    const fetchAllOrders = () => dispatch(actionCreators.fetchAllOrders());
    const fetchMyOrders = (token) => dispatch(actionCreators.fetchMyOrders(token));

    const orders = useSelector((state) => state.orders);
    const token = useSelector((state) => state.token);

    if (orders) {

        if (orders.length !== 0) {
            mainScreen = orders.map(order => {
                return <Order order={order} key={order.burgerId}>{order}</Order>
            });
        } else {
            mainScreen = <h1>Your orders empty :(</h1>
        }
    }

    return (
        <div className={classes.Orders}>
            <PopupButton clicked={fetchAllOrders}>All orders</PopupButton>
            <PopupButton clicked={() => fetchMyOrders(token)}>My orders</PopupButton>
            {mainScreen}
        </div>
    );
};

export default errorHandler(Orders);
