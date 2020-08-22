import React from "react";
import {Route, Switch} from "react-router-dom";
import AllMenuItemsView from "../../common/views/AllMenuItemsView";
import AddMenuView from "../../common/views/AddMenuView";
import OrdersListView from "../../common/views/OrdersListView";
import UpdateMenuView from "../../common/views/UpdateMenuView";
import AdminView from "../../common/views/AdminView";
import {AuthProvider} from "../../common/Auth";
import PrivateRoute from "../../common/PrivateRoute";

function AdminHome({match}) {
    return <>
        <AuthProvider>
            <Switch>
                <PrivateRoute exact path={`${match.path}/orders`} component={OrdersListView}/>
                <PrivateRoute exact path={`${match.path}/add-new-menu`} component={AddMenuView}/>
                <PrivateRoute exact path={`${match.path}/all-menu-items`} component={AllMenuItemsView}/>
                <PrivateRoute exact path={`${match.path}/update-menu-item`} component={UpdateMenuView}/>
                <Route exact path={`${match.path}/`} component={AdminView}/>
            </Switch>
        </AuthProvider>
    </>;
}

export default AdminHome;
