import React, {useState} from "react";
import firebase from "../../firebase";
import TrackOrderCard from "./TrackOrderCard";

const TrackOrders = (props) => {

    const [trackId, setTrackId] = useState(null);
    const [trackBy, setTrackBy] = useState("");  //email
    const [message, setMessage] = useState("Please use text field to track your order");
    const [messageClass, setMessageClass] = useState("alert alert-warning show");
    const [orders, setOrders] = useState([]);

    const handleInputChange = e => {
        let {name, value} = e.target;
        // console.log("Name " + name);
        // console.log("Value " + value);
        setTrackId(value)
        setTrackBy(name)
    }

    const trackOrder = (e) => {
        if(trackId == null || trackBy == null || trackBy === "" || trackId === "") {
            setMessage("Please use text field to track your order, we cannot track your order without that information.");
            setMessageClass("alert alert-danger show");
            setOrders([]);
            return
        } else {
            setMessage("")
            setMessageClass("alert collapse")
        }
        firebase
            .firestore()
            .collection("orders")
            .where(trackBy, "==", trackId)
            .onSnapshot((snapshot) => {
                const newOrders = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(newOrders);
            })
    }

    let cardOrMessage;
    if (orders.length >= 0) {
        cardOrMessage = <table className="table table-hover">
            {orders.map(order => (
                <TrackOrderCard order={order}/>
            ))}

        </table>
    }

    return<>
    <div className={messageClass} role="alert"> {message} </div>
        <form>
            {/*onSubmit={trackOrder}>*/}
            <div className="form-group">
                <label htmlFor="contact">Track by Phone Number</label>
                <input type="phone" className="form-control" id="contact" name="contact"
                       placeholder="xxxxxxxxxx" onChange={handleInputChange} minLength={10} maxLength={10}/>
            </div>
            <div className="form-group">
                <button type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={trackOrder}> Track Order </button>
            </div>
        </form>
        {cardOrMessage}

    </>;
}

export default TrackOrders;
