import React, {useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import ControlPanel from "../../Components/ControlPanel/ControlPanel";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../Axios/axiosRequests";
import errorHandler from "../../HOC/ErrorHandler";
import {withRouter} from "react-router";

const BurgerBuilder = (props) => {

    const [availableIngredients, availableIngredientsUpdate] = useState([]);
    const [ingredientsLoaded, ingredientsLoadedUpdate] = useState(false);

    const dispatch = useDispatch();

    const updatePriceState = (price) => dispatch(actionCreators.updatePriceState(price));
    const updateBurgerElements = (burgerElements) => dispatch(actionCreators.updateBurgerElements(burgerElements));
    const fetchBurger = () => dispatch(actionCreators.fetchBurger());

    const burgerLoaded = useSelector((state) => state.burgerLoaded);
    const burgerElements = useSelector((state) => state.burgerElements);
    const priceState = useSelector((state) => state.priceState);

    useEffect(() => {
        loadIngredients();
        if (!burgerLoaded) {
            fetchBurger();
        }
    }, []);

    const addIngredient = (name) => {

        const ingredientId = availableIngredients.findIndex(elem => elem.name === name);
        const ingredient = {...availableIngredients[ingredientId]};
        const ingredientPrice = ingredient.price;

        ingredient.id = Date.now();

        updateBurgerElements([...burgerElements, ingredient]);
        updatePriceState(priceState + ingredientPrice);
    };

    const removeIngredient = (id) => {

        const ingredientId = burgerElements.findIndex(elem => elem.id === id);
        const ingredientPrice = {...burgerElements[ingredientId]}.price;

        updateBurgerElements(burgerElements.filter(elem => elem.id !== id));
        updatePriceState(priceState - ingredientPrice);
    };

    const loadIngredients = async () => {
        try {
            const response = await getIngredients();

            if (response != null && response.data != null) {
                availableIngredientsUpdate(response.data);
            }
        } catch (e) {
            console.log('error load ingredients');
        } finally {
            ingredientsLoadedUpdate(true);
        }
    };

    const toCheckout = () => {
        props.history.push('/checkout');
    };

    let mainScreen = <Loader/>;

    if (ingredientsLoaded && burgerLoaded) {
        mainScreen =
            <React.Fragment>
                <BurgerElements ingredients={burgerElements} clicked={removeIngredient}/>
                <ControlPanel toCheckout={toCheckout} ingredients={availableIngredients} price={priceState}
                              clicked={addIngredient}/>
            </React.Fragment>
    }

    return (
        <div>
            {mainScreen}
        </div>
    );
};

export default errorHandler(withRouter(BurgerBuilder));
