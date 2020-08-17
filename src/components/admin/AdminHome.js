import React from "react";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import AllMenuItemsView from "../../common/views/AllMenuItemsView";
import AddMenuView from "../../common/views/AddMenuView";
import OrdersListView from "../../common/views/OrdersListView";
import UpdateMenuView from "../../common/views/UpdateMenuView";

function AdminHome({match}) {
    return <>
        <Switch>
            <Route exact path={`${match.path}/orders`} component={OrdersListView}/>
            <Route exact path={`${match.path}/add-new-menu`} component={AddMenuView}/>
            <Route exact path={`${match.path}/all-menu-items`} component={AllMenuItemsView}/>
            <Route exact path={`${match.path}/update-menu-item`} component={UpdateMenuView}/>
            {/*<Route exact path={`${match.path}/operations`} component={AdminOperations}/>*/}
            {/*<Redirect from={match.path} to={`${match.path}/operations`}/>*/}
        </Switch>
    </>;
}

export default AdminHome;
