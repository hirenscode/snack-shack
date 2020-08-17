import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllMenuItems from "../../components/all-menu-items/AllMenuItems";
import AdminMainHeader from "../../components/admin/AdminMainHeader";


function AllMenuItemsView() {
    return <>
        <Header/>
        <main role="main">
            <AdminMainHeader/>
            <div className="container">
                <AllMenuItems/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default AllMenuItemsView;
