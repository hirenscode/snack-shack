import MainHeader from "../MainHeader";
import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import TrackOrders from "../../components/TrackOrder/TrackOrders";

function TrackOrdersView() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <TrackOrders/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default TrackOrdersView;
