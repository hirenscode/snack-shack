import React from "react";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import OrdersListView from "../../shared/Views/OrdersListView";
import AddMenuView from "../../shared/Views/AddMenuView";

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
