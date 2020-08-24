import React from "react";
import TrackingProgress from "./TrackingProgress";
import {SETTINGS} from "../../common/Constants";

const TrackOrderCard = (props) => {

    const {order} = props;

    return <div className="card text-center">
        <div className="card-header">
            Name: <strong> {order.name} </strong>
        </div>
        <div className="card-body">
            <h5 className="card-title"> Total: {SETTINGS.CURRENCY.SYMBOL} {order.total} </h5>
            <p className="card-text"> Contact: <strong> {order.contact} </strong>  | Email: <strong> {order.email} </strong> </p>
            {/*<a href="#" className="btn btn-primary"> Action Item </a>*/}
        </div>
        <ul className="list-group list-group-flush"> {
            order.selectedItems.map(item =>
                <li className="list-group-item" key={`list${item.id}`}> {item.title}: <strong> {SETTINGS.CURRENCY.SYMBOL} {item.price} </strong> </li>)
        }
        </ul>
        <div className="card-footer text-muted">
            <TrackingProgress orderStatus={order.status} orderId={order.id}/>
        </div>
    </div>
}

export default TrackOrderCard;
