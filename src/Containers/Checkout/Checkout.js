import React, {useContext, useEffect} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import Context from "../../Components/Context/Context";
import Popup from "../../Components/Popup/Popup";
import axios from "axios";
import errorHandler from "../../HOC/ErrorHandler";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import Loader from "../../Components/Loader/Loader";

function Checkout() {

    const context = useContext(Context);

    useEffect(() => {
        if (context.burgerElements.length === 0) {
            context.loadBurger();
        }
    },[]);


    const confirmBuy = () => {
        console.log('buy!');
        axios.post('http://localhost:8080' + '/burger', {
            ingredients :  JSON.stringify(context.burgerElements),
            totalPrice : context.priceState,
            burgerElementId : context.burgerElementId
        }).then(response => {
            context.visibilityUpdate();
            console.log(response.status);
        }).catch(error => {
            console.log('error add burger');
        });
    };

    let mainScreen = <Loader/>;

    if (context.burgerLoaded) {
        mainScreen = (
            <React.Fragment>
                <Popup confirm={confirmBuy}/>
                <BurgerElements ingridients={context.burgerElements} clicked={() => {}}/>
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

export default errorHandler(Checkout, axios);