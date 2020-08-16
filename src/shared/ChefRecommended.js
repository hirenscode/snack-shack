import React from "react";

const ChefRecommended = (props) => {
    const {recommendation} = props;
    return recommendation ? (<strong> Chef <i className="fa fa-hat-wizard" style={{color: "#3B479D"}}/> </strong>) : <span/>;
}

export default ChefRecommended;
