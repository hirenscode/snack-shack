import Header from "../Header";
import Footer from "../Footer";
import React, {useContext} from "react";
import Login from "../../components/login/Login";
import AdminMainHeader from "../../components/admin/AdminMainHeader";
import {AuthContext} from "../Auth";
import AdminOperations from "../../components/admin/AdminOperations";
import {checkUsersPlate} from "../Plate";

function AdminView() {

    const {currentUser} = useContext(AuthContext);

    return <>
        <Header/>
        <main role="main">
            <AdminMainHeader/>
            <div className="container">
                {!!currentUser && checkUsersPlate(currentUser._cau) ? (<AdminOperations/>) : (<Login/>)}
            </div>
        </main>
        <Footer/>
    </>
}

export default AdminView;
