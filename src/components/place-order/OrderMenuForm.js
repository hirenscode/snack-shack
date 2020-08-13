import ListMenuItems from "./ListMenuItems";
import {SETTINGS} from "../../shared/Constants";
import React from "react";

function OrderMenuForm(props) {
    const {className, message, onSubmit, onChange, show, menuItems, retrieveMenuItems, order} = props;
    const visibility = show ? "visible" : "invisible d-none";
    return <div className={visibility}>
        <div className={className} role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="contact">We will need your phone number to connect when we are ready</label>
                <input type="phone" className="form-control" id="contact" name="contact"
                       placeholder="xxxxxxxxxx" onChange={onChange} minLength={10} maxLength={10} required/>
            </div>
            <div className="form-group">
                <label htmlFor="name">We will need your name</label>
                <input type="name" className="form-control" id="name" name="name" onChange={onChange}
                       required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Optionally, If you want to keep getting updates from us, your email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange}/>
            </div>
            <ListMenuItems show={show} menuItems={menuItems} retrieveMenuItems={retrieveMenuItems}/>
            <div className="form-group">
                <label htmlFor="comments">Let us know, if your taste buds likes or dislikes something, or
                    if you have any medical condition or allergies to avoid any kind of food items </label>
                <textarea className="form-control" id="comments" rows="3" name="comments" onChange={onChange}/>
            </div>

            <div className="form-group">
                <div className="card">
                    <h5 className="card-header"> Total Amount </h5>
                    <div className="card-body">
                        <h5 className="card-title"> {SETTINGS.CURRENCY.SYMBOL} {order.total}  </h5>
                        <p className="card-text"> total amount shown here does not include taxes or GST.</p>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
                </div>
            </div>

            <div className="form-group">
                <button
                    type="submit"
                    disabled={!show}
                    className="btn btn-primary btn-lg btn-block"
                    onSubmit={onSubmit}> Place Order
                </button>
            </div>
        </form>
    </div>;
}

export default OrderMenuForm;
