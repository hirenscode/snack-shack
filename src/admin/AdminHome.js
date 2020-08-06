import React from "react";
import AddMenuView from "../shared/views/AddMenuView";
import OrdersListView from "../shared/views/OrdersListView";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import AdminOperations from "./AdminOperations";
import Redirect from "react-router-dom/es/Redirect";

function AdminHome({match}) {
    return <>
        <Switch>
            <Route exact path={`${match.path}/orders`} component={OrdersListView}/>
            <Route exact path={`${match.path}/add-new-menu`} component={AddMenuView}/>
            {/*<Route exact path={`${match.path}/operations`} component={AdminOperations}/>*/}
            {/*<Redirect from={match.path} to={`${match.path}/operations`}/>*/}
        </Switch>
    </>;
}

export default AdminHome;
