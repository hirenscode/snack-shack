import React, {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import firebase from "../../firebase";
import {SETTINGS} from "../../shared/Constants";

const OrderMenuForm = (props) => {
    const initialOrder = {
        contact: "",
        name: "",
        email: "",
        selectedItems: [],
        status: {},
        comments: "",
        total: 0,
        paymentDone: false
    }

    const initialOrderFlow = {
        orderId: "",
        statusId: 1,
        lastUpdateDate: Date.now(),
        comments: "ORDER PLACED (Auto Comment) ",
        paymentDone: false
    }

    let showAlertSuccessClass = "alert alert-success alert-dismissible fade show";
    let showAlertErrorClass = "alert alert-danger alert-dismissible fade show";
    let hideAlertClass = "alert collapse";

    let [order, setOrder] = useState(initialOrder);
    let [orderFlow, setOrderFlow] = useState(initialOrderFlow);
    let [message, setMessage] = useState("");
    let [showAlert, setShowAlert] = useState(hideAlertClass);

    function useMenus() {
        const [menus, setMenus] = useState([]);
        useEffect(() => {
            firebase
                .firestore()
                .collection("menus")
                .onSnapshot((snapshot => {
                    const newMenus = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setMenus(newMenus.map(menu => {
                        return {...menu, checked: false, portions: 1}
                    }))
                }))
        }, [])
        return menus;
    }

    const menuItems = useMenus();

    const handleInputChange = e => {
        let {name, value} = e.target;
        console.log("Name " + name);
        console.log("Value " + value);
        setOrder({
            ...order,
            [name]: value
        })

    }

    const handleSelectedItem = (menuItem) => {
        menuItem.checked = !menuItem.checked;
        let newSelectedItems = order.selectedItems;
        let newTotal = 0;
        let indexOfItem = newSelectedItems.map(i => i.id).indexOf(menuItem.id);
        if (indexOfItem === -1 && menuItem.checked) {
            newSelectedItems.push(menuItem);
        } else if (indexOfItem >= 0 && menuItem.checked === false) {
            newSelectedItems.splice(indexOfItem, 1);
        }
        debugger;
        newTotal = newSelectedItems.map(i => (i.price * i.portions)).reduce((p, c) => p + c, newTotal);
        const newOrder = {...order, total: newTotal, selectedItems: newSelectedItems};
        setOrder(newOrder);
    }

    const placeOrder = e => {
        const newOrder = {...order, status: 1, orderPlacedAt: Date.now()};
        let orderDocId = "";
        setOrder(newOrder);
        e.preventDefault();
        e.persist();
        firebase.firestore().collection("orders").add(newOrder)
            .then((docRef) => {
                orderDocId = docRef.id;
                e.target.reset();
                setMessage("Order Placed successfully!");
                setShowAlert(showAlertSuccessClass);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setMessage("There was some error placing order, please try again!");
                setShowAlert(showAlertErrorClass);
                window.scrollTo(0, 0);
                console.log(err)
            });

        const newOrderFlow = {orderId: orderDocId, ...orderFlow};
        setOrderFlow(newOrderFlow);

        firebase.firestore().collection("orders_flow").add(newOrderFlow)
            .then(() => {
                console.debug("Orders flow was successfully updated");
            })
            .catch(err => {
                setMessage("There was some error updating order flow, your order was placed successfully, but sequence of order might be disturbed!");
                setShowAlert(showAlertErrorClass);
                window.scrollTo(0, 0);
                console.log(err)
            });
    }


    return <>
        <div className={showAlert} role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form onSubmit={placeOrder}>
            <div className="form-group">
                <label htmlFor="contact">We will need your phone number to connect when we are
                    ready</label>
                <input type="phone" className="form-control" id="contact" name="contact"
                       placeholder="xxxxxxxxxx" onChange={handleInputChange} minLength={10} maxLength={10}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">We will need your name</label>
                <input type="name" className="form-control" id="name" name="name" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Optionally, If you want to keep getting updates from us, your
                    email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="menuItems">Select the items you need for today</label>
                <div className="row">
                    {
                        menuItems.map((menuItem) =>
                            <MenuItem
                                item={menuItem} id={menuItem.id}
                                key={menuItem.id}
                                onChange={() => handleSelectedItem}
                            />
                        )
                    }
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="comments">Let us know, if your taste buds likes or dislikes something, or
                    if you have any medical condition or allergies to avoid any kind of food items </label>
                <textarea className="form-control" id="comments" rows="3" name="comments" onChange={handleInputChange}/>
            </div>

            <div className="form-group">
                <div className="card">
                    <h5 className="card-header"> Total Amount </h5>
                    <div className="card-body">
                        <h5 className="card-title"> {SETTINGS.CURRENCY.SYMBOL} {order.total} </h5>
                        <p className="card-text"> total amount shown here does not include taxes or GST.</p>
                        {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
                    </div>
                </div>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block" onSubmit={placeOrder}> Place Order</button>
            </div>
        </form>
    </>;
}

export default OrderMenuForm;
