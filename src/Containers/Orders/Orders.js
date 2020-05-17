import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import Order from "../../Components/Order/Order";
import ErrorHandler from "../../HOC/ErrorHandler";
import classes from "./Orders.module.css"

function Orders() {

    const [burgers , burgersUpdate] = useState([]);
    const [burgersLoaded, burgersLoadedUpdate] = useState(false);

    useEffect(() => {
        loadAllBurgers();
    },[]);

    const loadAllBurgers = async () => {
        try {
            burgersLoadedUpdate(false);
            const response = await axios.get('http://localhost:8080' + '/burger');
            if(response.data !== '') {
                burgersUpdate(response.data);
            }
            burgersLoadedUpdate(true);
        } catch (e) {
            console.log('error load orders');
        } finally {

        }
    };

    let mainScreen = <Loader/>;

    if (burgersLoaded) {

        if (burgers.length !== 0) {
            mainScreen = burgers.map(burger => {
                return <Order burger={burger} key={burger.id}>{burger}</Order>
            });
        } else {
            mainScreen = <h1>Your orders empty :(</h1>
        }
    }

    return (
        <div className={classes.Orders}>
            {mainScreen}
        </div>
    );
}

export default ErrorHandler(Orders, axios);