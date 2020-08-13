import {SETTINGS} from "../../shared/Constants";
import React from "react";

function OrderActions(props) {
    return <div className="form-check" id={"options-div" + props.order.id + props.statusId}>
        <input type="radio" name={"options" + props.order.id}
               className={props.statusId === 0 || props.statusId === 100 ? "invisible" : "visible"}
               id={"options" + props.order.id + props.statusId}
               data-order-id={props.order.id} data-payment-done={props.order.paymentDone}
               data-current-status={props.order.status} value={props.statusId}
               disabled={props.order.paymentDone && (props.statusId === 0 || props.statusId === 100)} onChange={props.onChange}/>
        <label className="form-check-label" htmlFor={"options" + props.order.id + props.statusId}>
            {/*className={order.status.payment_done && statusId === 2 ? "btn btn-success active" : "btn btn-primary active"}>*/}
            {SETTINGS.ORDER.STATUS[props.statusId].TEXT}
        </label>
    </div>;
}

export default OrderActions;
