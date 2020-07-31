import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./shared/views/Home";
import AddMenuForm from "./components/AddMenuForm";
import OrdersListView from "./shared/views/OrdersListView";
import TrackOrdersView from "./shared/views/TrackOrdersView";
import AdminHome from "./admin/AdminHome";

function App() {

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/track-orders/" component={TrackOrdersView}/>
                    <Route path="/admin/" component={AdminHome}/>
                    <Route path="/admin/orders" component={OrdersListView}/>
                    <Route path="/admin/add-new-menu" component={AddMenuForm}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
