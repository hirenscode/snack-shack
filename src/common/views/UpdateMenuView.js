import Header from "../Header";
import AddMenuForm from "../../components/add-menu/AddMenuForm";
import Footer from "../Footer";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import AdminMainHeader from "../../components/admin/AdminMainHeader";

function UpdateMenuView() {
    const [searchParams] = useSearchParams();
    const [menuItemId, setMenuItemId] = useState("");

    useEffect(() => {
        const newMenuItemId = searchParams.get("menuItemId");
        setMenuItemId(newMenuItemId);
    }, [searchParams]);

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
