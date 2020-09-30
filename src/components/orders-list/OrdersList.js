import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import {SETTINGS} from "../../common/Constants";
import OrderActions from "./OrderActions";
import OrderInfoModal from "./OrderInfoModal";
import {Info} from "../admin/OperationIcons";


const OrdersList = () => {
    const initialOrderFlow = {
        orderId: "",
        statusId: 0,
        lastUpdateDate: Date.now(),
        comments: "",
        paymentDone: false
    }

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        retrieveOrders();
    }, []);

    function retrieveOrders() {
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
    }

    const handleChange = (e) => {
        const orderId = e.target.dataset.orderId;
        let currentStatus = e.target.dataset.currentStatus;
        currentStatus = currentStatus ? currentStatus : -1;
        const value = parseInt(e.target.value);
        const order = orders.find(o => o.id === orderId);
        const paymentDone = order.paymentDone;
        
        if (!isNaN(value) && value !== currentStatus) {
            const newOrderFlow = {
                ...initialOrderFlow,
                orderId: orderId,
                statusId: value,
                lastUpdateDate: Date.now(),
                paymentDone: paymentDone
            }

            firebase.firestore()
                .collection("orders_flow")
                .add(newOrderFlow)
                .then(() => {
                    const doNothing = true;
                })
                .catch(err => {
                    window.scrollTo(0, 0);
                    console.error(err)
                });

            firebase.firestore()
                .collection("orders")
                .doc(orderId)
                .update({status: value, paymentDone: paymentDone, lastUpdateDate: Date.now()})
                .then(() => {
                    console.debug("Orders was successfully updated");
                    retrieveOrders();
                }).catch(err => {
                console.error(err)
            });
        } else {
            firebase.firestore()
                .collection("orders")
                .doc(orderId)
                .update({paymentDone: !paymentDone, lastUpdateDate: Date.now()})
                .then(() => {
                    console.debug("Orders was successfully updated");
                    retrieveOrders();
                }).catch(err => {
                console.error(err)
            });
        }
    }

    const togglePayDone = (e) => {
        const orderId = e.target.dataset.orderId;
        const order = orders.find(o => o.id === orderId);
        const newOrders = orders.map(newOrder => {
            if (newOrder.id === order.id) {
                return {...newOrder, paymentDone: !newOrder.paymentDone};
            } else {
                return newOrder;
            }
        });
        setOrders(newOrders);
        handleChange(e);
    }

    return <div className="table-responsive">
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col" style={{width: "18%"}}>Name / Contact</th>
                <th scope="col"> Order Info </th>
                <th scope="col">Comments</th>
                <th scope="col">Total</th>
                <th scope="col">Order Status</th>
                <th scope="col">Payment Done</th>
                <th scope="col">Next Action</th>
                <th scope="col">Revert Action</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.map((order, index) => (
                    <tr key={order.id}>
                        <td> {order.name} / {order.contact} / {order.email}  </td>
                        <td> <button type="button"
                                     className="btn btn-primary"
                                     key={`orderInfoKey${order.id}`}
                                     id={`orderInfo${order.id}`}
                                     data-toggle="modal" data-target={`#modal${order.id}`}> <Info/> </button>
                            <OrderInfoModal order={order}/>
                        </td>
                        <td> {order.comments}  </td>
                        <td> {SETTINGS.CURRENCY.SYMBOL} {order.total}  </td>
                        <td> {SETTINGS.ORDER.STATUS[order.status].TEXT} </td>
                        <td>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" key={`payDoneCheckKey${order.id}`}
                                       className="custom-control-input" id={`payDoneCheck${order.id}`}
                                       data-order-id={order.id}
                                       data-current-status={order.status}
                                       checked={order.paymentDone} onChange={togglePayDone}/>
                                <label className="custom-control-label" key={`payDoneCheckLabel${order.id}`}
                                       htmlFor={`payDoneCheck${order.id}`}> {order.paymentDone ? "" : "Not "} Done
                                </label>
                            </div>
                        </td>
                        <td>
                            {SETTINGS.ORDER.STATUS_FLOW[order.status].map(statusId => (
                                <OrderActions key={"label" + order.id + statusId} order={order} statusId={statusId}
                                              onChange={handleChange}/>
                            ))}
                        </td>
                        <td>
                            {SETTINGS.ORDER.REVERT_FLOW[order.status].map(statusId => (
                                <OrderActions key={"label" + order.id + statusId} order={order} statusId={statusId}
                                              onChange={handleChange}/>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default OrdersList;
