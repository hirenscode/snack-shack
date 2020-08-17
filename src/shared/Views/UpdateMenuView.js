import Header from "../Header";
import MainHeader from "../MainHeader";
import AddMenuForm from "../../components/AddMenu/AddMenuForm";
import Footer from "../Footer";
import React, {useState} from "react";
import queryString from 'query-string'

function UpdateMenuView(props) {
    const menuItemId = useState(queryString.parse(props.location.search).menuItemId);

    return <>
        <Header/>
        <main role="main">
            <MainHeader/>
            <div className="container">
                <AddMenuForm editMode={true} menuItemId={menuItemId}/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default UpdateMenuView;
