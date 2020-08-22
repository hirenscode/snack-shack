import {Link} from "react-router-dom";
import React from "react";

const Operation = ({title, description, buttonTitle, buttonSvg, goToSource, onClick}) => {
    return <div className="col-sm-6">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title"> {title} </h5>
                <p className="card-text"> {description} </p>
                <Link to={goToSource} className="btn btn-primary" onClick={onClick}>
                    {buttonSvg} &nbsp; {buttonTitle}
                </Link>
            </div>
        </div>
    </div>;
}

export default Operation;
