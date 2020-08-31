import React from "react";
import TrackOrderCard from "../track-order/TrackOrderCard";

const OrderInfoModal = ({order}) => {
    return <div className="modal fade" id={`modal${order.id}`} tabIndex="-1" aria-labelledby="Order Info"
                aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> Order Info </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <TrackOrderCard order={order}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
                </div>
            </div>
        </div>
    </div>
}

export default OrderInfoModal;
