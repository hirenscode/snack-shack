import React from "react";

const TodaySpecial = (props) => {
    const {special} = props;
    return special ? (<strong> Special <i className="fa fa-star"/> </strong>) : <span/>;
}

export default TodaySpecial;
