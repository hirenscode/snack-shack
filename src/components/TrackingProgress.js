import React, {useEffect, useState} from "react";
import {SETTINGS} from "../shared/Constants";
import firebase from "../firebase";

const TrackingProgress = (props) => {
    const {orderStatus, orderId} = props;
    const [orderFlow, setOrderFlow] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection("orders_flow")
            .where("orderId", "==", orderId)
            // .orderBy("lastUpdateDate")
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
                    // Object.keys(SETTINGS.ORDER.STATUS).map(key => (
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

/**
 *
 * <ul id="progressbar">
 <li className="step0 active" id="step1">PLACED</li>
 <li className="step0 active" id="step2">ACCEPTED</li>
 <li className="step0 text-muted" id="step3">IN PREPARATION</li>
 <li className="step0 text-muted" id="step4">OUT FOR DELIVERY</li>
 <li className="step0 text-muted" id="step5">DELIVERED</li>
 </ul>
 *
 * */
