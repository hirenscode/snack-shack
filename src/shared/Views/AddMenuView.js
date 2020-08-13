import MainHeader from "../MainHeader";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AddMenuForm from "../../components/AddMenu/AddMenuForm";

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
