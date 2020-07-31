import React from "react";
import AdminMainHeader from "./AdminMainHeader";
import OrdersList from "../components/OrdersList";

function AdminHome() {
    return <main role="main" style={{position: "relative"}}>
        <AdminMainHeader/>
        <div className="container">
            <OrdersList/>
        </div>
    </main>;
}

export default AdminHome;
