import React from "react";
import MainHeader from "../MainHeader";
import Header from "../Header";
import Footer from "../Footer";
import OrderMenuForm from "../../components/place-order/OrderMenuForm";

function Home() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <OrderMenuForm/>
            </div>
        </main>
        <Footer/>
        </>;
}

export default Home;
