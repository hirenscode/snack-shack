import React from "react";
import {SETTINGS} from "./Constants";

function MainHeader() {
    return <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4 text-center"> {SETTINGS.APP.NAME} </h1>
            <p className="lead text-center"> {SETTINGS.APP.SUBTITLE} </p>
            <p className="text-center"> just make sure you don't miss out on delicious hand-crafted meals and fill the below form.</p>
        </div>
    </div>;
}

export default MainHeader;
