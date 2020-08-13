import React from "react";
import MainHeader from "../MainHeader";
import Header from "../Header";
import Footer from "../Footer";
import OrderMenuView from "../../components/place-order/OrderMenuView";

function Home() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <OrderMenuView/>
            </div>
        </main>
        <Footer/>
        </>;
}

export default Home;
