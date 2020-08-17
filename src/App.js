import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./shared/views/Home";
import TrackOrdersView from "./shared/views/TrackOrdersView";
import AdminHome from "./components/Admin/AdminHome";
import {SETTINGS} from "./shared/Constants";

function App() {
    useEffect(() => {
        document.title = `${SETTINGS.APP.NAME}`;
    })

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
