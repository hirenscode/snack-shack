import React from "react";
import MainHeader from "../MainHeader";
import Header from "../Header";
import Footer from "../Footer";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";

function Home() {
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

export default Home;
