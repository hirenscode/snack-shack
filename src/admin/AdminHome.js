import React from "react";
import AdminMainHeader from "./AdminMainHeader";
import OrdersList from "../components/OrdersList";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

function AdminHome() {
    return <>
        <Header/>
        <main role="main" style={{position: "relative"}}>
            <AdminMainHeader/>
            <div className="container">
                <OrdersList/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default AdminHome;
