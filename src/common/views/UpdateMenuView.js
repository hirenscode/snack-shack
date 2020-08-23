import Header from "../Header";
import AddMenuForm from "../../components/add-menu/AddMenuForm";
import Footer from "../Footer";
import React, {useEffect, useState} from "react";
import queryString from 'query-string'
import AdminMainHeader from "../../components/admin/AdminMainHeader";

function UpdateMenuView(props) {
    const [menuItemId, setMenuItemId] = useState("");

    useEffect(() => {
        const newMenuItemId = queryString.parse(props.location.search).menuItemId;
        setMenuItemId(newMenuItemId);
    }, []);

    return <>
        <Header/>
        <main role="main">
            <AdminMainHeader/>
            <div className="container">
                <AddMenuForm editMode={true} menuItemId={menuItemId}/>
            </div>
        </main>
        <Footer/>
    </>;
}

export default UpdateMenuView;
