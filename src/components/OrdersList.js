import React, {useEffect, useState} from "react";
import firebase from "../firebase";
import {SETTINGS} from "./../shared/Constants";

const OrdersList = () => {

    function useOrders() {
        const [orders, setOrders] = useState([]);
        useEffect(() => {
            firebase
                .firestore()
                .collection("orders")
                .onSnapshot((snapshot => {
                    const newOrders = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setOrders(newOrders)
                }));
        }, []);

        return orders;
    }

    const orders = useOrders();

    return <div className="table-responsive">
        <table className="table table-hover">
        {
        orders.map(order => (
            <tr key={order.id}>
                <td> {order.name}  </td>
                <td> {order.email}  </td>
                <td> {order.contact}  </td>
                <td> {order.comments}  </td>
                <td> {order.total}  </td>
                <td> {SETTINGS.ORDER.STATUS[order.status]}  </td>
            </tr>
        ))}

    </table>
    </div>;
}

export default OrdersList;
