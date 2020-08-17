import React from "react";
import {SETTINGS} from "../../common/Constants";

function AdminMainHeader() {
    return <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4 text-center"> {SETTINGS.APP.NAME} </h1>
            <p className="lead text-center"> Chef Console </p>
            <p className="text-center"> Console for Chef, to maintain Order and Menus to be displayed.</p>
        </div>
    </div>;
}

export default AdminMainHeader;
