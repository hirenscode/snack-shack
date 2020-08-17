import React, {useEffect, useState} from "react";
import {SETTINGS} from "../../common/Constants";
import firebase from "../../firebase";

const TrackingProgress = (props) => {
    const {orderStatus, orderId} = props;
    const [orderFlow, setOrderFlow] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("orders_flow")
            .where("orderId", "==", orderId)
            .onSnapshot((snapshot) => {
                const newOrdersFlow = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrderFlow(newOrdersFlow.sort((o1, o2) => o1.lastUpdateDate - o2.lastUpdateDate));
            })
    })

    return <>
        <div className="row px-3">
            <div className="col">
                <span className="order-status"> {SETTINGS.ORDER.STATUS[orderStatus].TEXT} </span>
                <ul id="progress-bar">
                    {
                        orderFlow.map(flow => (
                        <li>
                            <span className={flow.statusId <= orderStatus ? "processing-box bg-success" : "processing-box bg-dark text-white"}>
                                <span className="tooltiptext"> {SETTINGS.ORDER.STATUS[flow.statusId].TEXT} </span>
                                <i className={SETTINGS.ORDER.STATUS[flow.statusId].ICON_CLASS}/>
                            </span>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    </>
}

export default TrackingProgress;
