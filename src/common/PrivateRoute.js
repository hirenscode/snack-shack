import React, {useContext} from "react";
import {AuthContext} from "./Auth";
import {Route, Navigate} from "react-router-dom";
import {checkUsersPlate} from "./Plate";

const PrivateRoute = ({children, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    
    if (!currentUser || !checkUsersPlate(currentUser._cau)) {
        return <Navigate to="/admin/" replace />;
    }

    return children;
}

export default PrivateRoute;
