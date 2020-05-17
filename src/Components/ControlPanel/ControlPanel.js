import React from "react";
import ControlPanelElement from "../ControlPanelElement/ControlPanelElement";
import ControlPanelTotalPrice from "../ControlPanelTotalPrice/ControlPanelTotalPrice";

function ControlPanel(props) {

    let elements = props.ingridients.map(element => {
        return <ControlPanelElement type={element.name} price={element.price} key={element.id} clicked={props.clicked}/>
    });

    return (
        <React.Fragment>
            <ControlPanelTotalPrice>{props.price}</ControlPanelTotalPrice>
            <div className="row">
                {elements}
            </div>
        </React.Fragment>
    );
}

export default ControlPanel;