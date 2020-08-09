import MainHeader from "../MainHeader";
import React from "react";
import AddMenuForm from "../../components/add-menu/AddMenuForm";
import Header from "../Header";
import Footer from "../Footer";

function AddMenuView() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <AddMenuForm/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default AddMenuView;
