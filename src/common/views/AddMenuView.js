import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AddMenuForm from "../../components/add-menu/AddMenuForm";
import AdminMainHeader from "../../components/admin/AdminMainHeader";


function AddMenuView() {
    return <>
        <Header/>
        <main role="main">
            <AdminMainHeader/>
            <div className="container">
                <AddMenuForm/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default AddMenuView;
