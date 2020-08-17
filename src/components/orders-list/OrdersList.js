import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import {SETTINGS} from "../../common/Constants";
import OrderActions from "./OrderActions";


const OrdersList = () => {
    const initialOrderFlow = {
        orderId: "",
        statusId: 0,
        lastUpdateDate: Date.now(),
        comments: "Second Order (Auto Comment) ",
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
        let orderId = e.target.dataset.orderId;
        let value = parseInt(e.target.value);
        let paymentDone = orders.find(o => o.id === orderId).paymentDone;
        let newOrderFlow = {...initialOrderFlow, orderId: orderId, statusId: value, lastUpdateDate: Date.now(), paymentDone: paymentDone}

        firebase.firestore()
            .collection("orders_flow")
            .add(newOrderFlow)
            .then(() => {
                console.debug("Orders flow was successfully updated");
            })
            .catch(err => {
                window.scrollTo(0, 0);
                console.log(err)
            });


        firebase.firestore()
            .collection("orders")
            .doc(orderId)
            .update({status: value, paymentDone: paymentDone, lastUpdateDate: Date.now()})
            .then(() => {
                console.debug("Orders was successfully updated");
                retrieveOrders();
            }).catch(err => {
            console.log(err)
        });
    }



    return <div className="table-responsive">
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col" style={{width: "18%"}}>Name / Contact</th>
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
                        <td> {order.comments}  </td>
                        <td> {SETTINGS.CURRENCY.SYMBOL} {order.total}  </td>
                        <td> {SETTINGS.ORDER.STATUS[order.status].TEXT} </td>
                        <td>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1"
                                       checked={order.paymentDone} onChange={(event => {
                                           const newOrders = orders.map(newOrder => {
                                               if(newOrder.id === order.id) {
                                                   return {...newOrder, paymentDone: !newOrder.paymentDone};
                                               } else {
                                                   return newOrder;
                                               }
                                           });
                                           setOrders(newOrders);
                                })}/>
                                    <label className="custom-control-label" htmlFor="customSwitch1"> {order.paymentDone ? "" : "Not "} Done </label>
                            </div>
                        </td>
                        {/*<td> {SETTINGS.ORDER.STATUS[order.status].TEXT} and {order.status.payment_done ? SETTINGS.ORDER.STATUS[2].TEXT : "NO " + SETTINGS.ORDER.STATUS[2].TEXT}  </td>*/}
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
