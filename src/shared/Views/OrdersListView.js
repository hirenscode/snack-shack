import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import OrdersList from "../../components/OrdersList/OrdersList";
import AdminMainHeader from "../../components/Admin/AdminMainHeader";

function OrdersListView() {
    return <>
        <Header/>
        <main role="main">
            <AdminMainHeader/>
            <div className="container">
                <OrdersList/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default OrdersListView;
