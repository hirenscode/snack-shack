import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
                <Routes>
                    <Route exact path="/" element={<HomeView />} />
                    <Route path="/track-orders/" element={<TrackOrdersView />} />
                    <Route path="/admin/*" element={<AdminHome />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
