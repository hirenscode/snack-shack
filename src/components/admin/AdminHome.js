import React from "react";
import {Routes, Route} from "react-router-dom";
import AllMenuItemsView from "../../common/views/AllMenuItemsView";
import AddMenuView from "../../common/views/AddMenuView";
import OrdersListView from "../../common/views/OrdersListView";
import UpdateMenuView from "../../common/views/UpdateMenuView";
import AdminView from "../../common/views/AdminView";
import {AuthProvider} from "../../common/Auth";
import PrivateRoute from "../../common/PrivateRoute";

function AdminHome() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="orders" element={
                    <PrivateRoute>
                        <OrdersListView />
                    </PrivateRoute>
                } />
                <Route path="add-new-menu" element={
                    <PrivateRoute>
                        <AddMenuView />
                    </PrivateRoute>
                } />
                <Route path="all-menu-items" element={
                    <PrivateRoute>
                        <AllMenuItemsView />
                    </PrivateRoute>
                } />
                <Route path="update-menu-item" element={
                    <PrivateRoute>
                        <UpdateMenuView />
                    </PrivateRoute>
                } />
                <Route path="/" element={<AdminView />} />
            </Routes>
        </AuthProvider>
    );
}

export default AdminHome;
