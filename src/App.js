import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from "./components/admin/AdminHome";
import {SETTINGS} from "./common/Constants";
import HomeView from "./common/views/HomeView";
import TrackOrdersView from "./common/views/TrackOrdersView";

function App() {
    useEffect(() => {
        document.title = `${SETTINGS.APP.NAME}`;
    })

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomeView}/>
                    <Route path="/track-orders/" component={TrackOrdersView}/>
                    <Route path="/admin" component={AdminHome}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
