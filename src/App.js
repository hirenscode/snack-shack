import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./shared/views/Home";
import TrackOrdersView from "./shared/views/TrackOrdersView";
import AdminHome from "./admin/AdminHome";

function App() {

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/track-orders/" component={TrackOrdersView}/>
                    <Route path="/admin" component={AdminHome}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
