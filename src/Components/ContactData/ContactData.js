import React, {useContext, useEffect, useState} from "react";
import classes from "./ContactData.module.css";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import errorHandler from "../../HOC/ErrorHandler";
import PopupButton from "../PopupButton/PopupButton";
import Context from "../Context/Context";

function ContactData(props) {

    const [inputsState, inputsStateUpdate] = useState([]);
    const [enabledState, enabledStateUpdate] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
            loadValidationInputs();
    },[]);

    const loadValidationInputs = async () => {
        try {
            const response = await axios.get('http://localhost:8080' + '/burger/validation-inputs');
            console.log(response.data);
            inputsStateUpdate(response.data);
        } catch (e) {
            console.log('error load validation inputs');
        }
    };

    const validation = (inputElement) => {

        if (inputElement.isValid && inputElement.isTouched) {

            inputElement.rules.map(rule => {

                if(!inputElement.config.value.match(new RegExp(rule.regex))) {
                    inputElement.isValid = false;
                    inputElement.error = rule.errorMessage;
                }
            });
        }
    };

    const toggleButton = (newInputsState) => {

        enabledStateUpdate(true);
        newInputsState.map(inputElement => {

            if(!inputElement.isValid) {
                enabledStateUpdate(false);
            }
        });
    };

    const inputHandler = (event, inputElement) => {

        inputElement.config.value = event.target.value;
        inputElement.isTouched = true;
        inputElement.isValid = true;

        validation(inputElement); // validate and modify input element

        const newInputsState = [...inputsState];
        const index = newInputsState.findIndex(value => value.id === inputElement.id);

        newInputsState.splice(index, 1, inputElement);

        toggleButton(newInputsState);

        inputsStateUpdate(newInputsState);
    };

    const inputs = inputsState.map(inputElement => {
           return <CustomInput key={inputElement.id} inputElement={inputElement} changed={(event) => inputHandler(event, inputElement)}/>
    });

    return (
        <div className={classes.ContactData}>
            {inputs}
            <PopupButton clicked={context.visibilityUpdate}>CANCEL</PopupButton>
            <PopupButton clicked={props.confirm} enabled={enabledState}>CONFIRM</PopupButton>
        </div>
    );
}

export default errorHandler(ContactData, axios);