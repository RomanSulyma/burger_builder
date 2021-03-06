import React from "react";
import ControlPanelElement from "../ControlPanelElement/ControlPanelElement";
import ControlPanelTotalPrice from "../ControlPanelTotalPrice/ControlPanelTotalPrice";

const ControlPanel = (props) => {

    let elements = props.ingredients.map(element => {
        return <ControlPanelElement type={element.name} price={element.price} key={element.id} clicked={props.clicked}/>
    });

    return (
        <React.Fragment>
            <ControlPanelTotalPrice toCheckout={props.toCheckout}>{props.price}</ControlPanelTotalPrice>
            <div className="row">
                {elements}
            </div>
        </React.Fragment>
    );
};

export default ControlPanel;