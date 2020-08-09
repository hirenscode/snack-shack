import React from "react";
import OrdersList from "../../components/orders-list/OrdersList";
import Header from "../Header";
import Footer from "../Footer";
import AdminMainHeader from "../../admin/AdminMainHeader";

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
