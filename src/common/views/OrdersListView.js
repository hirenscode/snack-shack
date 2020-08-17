import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AdminMainHeader from "../../components/admin/AdminMainHeader";
import OrdersList from "../../components/orders-list/OrdersList";

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
