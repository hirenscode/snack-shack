import MainHeader from "../MainHeader";
import React from "react";
import OrdersList from "../../components/OrdersList";
import Header from "../Header";
import Footer from "../Footer";

function OrdersListView() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <OrdersList/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default OrdersListView;
