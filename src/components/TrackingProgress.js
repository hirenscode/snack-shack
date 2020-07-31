import React from "react";
import {SETTINGS} from "../shared/Constants";

const TrackingProgress = (props) => {
    const {orderStatus} = props;

    return <>
        <div className="row px-3">
            <div className="col">
                <span className="order-status"> {SETTINGS.ORDER.STATUS[orderStatus.id].TEXT} </span>
                <ul id="progress-bar">
                    {
                    // Object.keys(SETTINGS.ORDER.STATUS).map(key => (
                        orderStatus.sequence.map(sequence => (
                        <li>
                            <span className={sequence.status_id <= orderStatus.id ? "processing-box bg-success" : "processing-box bg-dark text-white"}>
                                <span className="tooltiptext"> {SETTINGS.ORDER.STATUS[sequence.status_id].TEXT} </span>
                                <i className={SETTINGS.ORDER.STATUS[sequence.status_id].ICON_CLASS}/>
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
