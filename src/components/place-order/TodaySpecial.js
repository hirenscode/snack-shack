import React from "react";

const TodaySpecial = (props) => {
    const {special} = props;
    return special ? (<strong> Special <i className="fa fa-star"></i> </strong>) : <span/>;
}

export default TodaySpecial;
