import React from "react";

const PreparingMenuCard = (props) => {
    const {imageSource, title, message, updateTime, show} = props;

    const visibility = show ? "visible" : "invisible d-none";

    return <div className={`card bg-dark text-white ${visibility}`}>
        <img src={imageSource} className="card-img" alt="..."/>
            <div className="card-img-overlay">
                <h5 className="card-title"> {title} </h5>
                <p className="card-text"> {message} </p>
                <p className="card-text"> Last updated {updateTime} </p>
            </div>
    </div>
}

export default PreparingMenuCard;
