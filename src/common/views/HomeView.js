import React from "react";
import MainHeader from "../MainHeader";
import Header from "../Header";
import Footer from "../Footer";
import PlaceOrder from "../../components/place-order/PlaceOrder";

function HomeView() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <PlaceOrder/>
            </div>
        </main>
        <Footer/>
        </>;
}

export default HomeView;
