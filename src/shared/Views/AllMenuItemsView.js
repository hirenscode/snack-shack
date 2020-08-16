import MainHeader from "../MainHeader";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllMenuItems from "../../components/AllMenuItems/AllMenuItems";

function AllMenuItemsView() {
    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <AllMenuItems/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default AllMenuItemsView;
