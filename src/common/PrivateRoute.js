import React, {useContext} from "react";
import {AuthContext} from "./Auth";
import {Route, Redirect} from "react-router-dom";
import {checkUsersPlate} from "./Utility";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return <Route
        {...rest}
        render={routeProps =>
            !!currentUser && checkUsersPlate(currentUser._cau) ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to={"/admin/"} />
            )
        }
    />
}

export default PrivateRoute;
