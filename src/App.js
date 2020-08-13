import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./shared/Views/Home";
import TrackOrdersView from "./shared/Views/TrackOrdersView";
import AdminHome from "./components/Admin/AdminHome";

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
