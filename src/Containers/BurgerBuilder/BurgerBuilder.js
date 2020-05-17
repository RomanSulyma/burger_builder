import React, {useContext, useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import ControlPanel from "../../Components/ControlPanel/ControlPanel";
import axios from 'axios';
import errorHandler from "../../HOC/ErrorHandler";
import Loader from "../../Components/Loader/Loader";
import Context from "../../Components/Context/Context";

function BurgerBuilder(props) {

    const [availableIngridients, availableIngridientsUpdate] = useState([]);
    const [ingredientsLoaded, ingredientsLoadedUpdate] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
        loadIngredients();
        if (context.burgerElements.length === 0) {
            context.loadBurger();
        }
    },[]);

    const addIngridient = (name) => {

        const ingridientId = availableIngridients.findIndex(elem => elem.name === name);
        const ingridient = availableIngridients[ingridientId];
        const ingridientPrice = ingridient.price;

        ingridient.id = context.burgerElementId;
        context.burgerElementIdUpdate(context.burgerElementId + 1);

        const newBurgerElementsState = [...context.burgerElements];
        newBurgerElementsState.push(ingridient);

        context.changeBurgerElements(newBurgerElementsState);
        context.priceStateUpdate(context.priceState + ingridientPrice);
    };

    const removeIngridient = (id) => {

        const ingridientId = context.burgerElements.findIndex(elem => elem.id === id);
        const ingridientPrice = context.burgerElements[ingridientId].price;

        const newBurgerElementsState = [...context.burgerElements];
        newBurgerElementsState.splice(ingridientId, 1);

        context.changeBurgerElements(newBurgerElementsState);
        context.priceStateUpdate(context.priceState - ingridientPrice);
    };

    const loadIngredients = async () => {
        try {
            const response = await axios.get('http://localhost:8080' + '/ingredients');
            availableIngridientsUpdate(response.data);
        } catch (e) {
            console.log('error load ingredients');
        } finally {
            ingredientsLoadedUpdate(true);
        }
    };

    let mainScreen = <Loader/>;

    if(ingredientsLoaded && context.burgerLoaded) {
        mainScreen =
            <React.Fragment>
                <BurgerElements ingridients={context.burgerElements} clicked={removeIngridient}/>
                <ControlPanel ingridients={availableIngridients} price={context.priceState} clicked={addIngridient}/>
            </React.Fragment>
    }

    return (
        <div>
            {mainScreen}
        </div>
    );
}

export default errorHandler(BurgerBuilder, axios);