import React, {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import firebase from "../../firebase";
import PreparingMenuCard from "./PreparingMenuCard";
import OrderMenuForm from "./OrderMenuForm";
import {SETTINGS} from "../../common/Constants";

const PlaceOrder = (props) => {
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

    const showAlertSuccessClass = "alert alert-success alert-dismissible fade show";
    const showAlertErrorClass = "alert alert-danger alert-dismissible fade show";
    const hideAlertClass = "alert collapse";

    const [order, setOrder] = useState(initialOrder);
    const [orderFlow, setOrderFlow] = useState(initialOrderFlow);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(hideAlertClass);
    const [showMenu, setShowMenu] = useState(false);

    const useMenus = () => {
        const [menus, setMenus] = useState([]);
        useEffect(() => {
            firebase
                .firestore()
                .collection("menus")
                .where("placeOrderBy", ">=", new Date())
                .onSnapshot((snapshot => {
                    const newMenus = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMenus(newMenus.map(menu => {
                        return {...menu, checked: false, portions: 1}
                    }));
                    setShowMenu(newMenus.length > 0);
                }))
        }, [])
        return menus;
    }

    const menuItems = useMenus();

    const handleInputChange = e => {
        let {name, value} = e.target;
        setOrder({
            ...order,
            [name]: value
        })

    }

    const handleSelectedItem = (menuItem) => {
        let newSelectedItems = order.selectedItems;
        let newTotal = 0;
        let indexOfItem = newSelectedItems.map(i => i.id).indexOf(menuItem.id);
        if (indexOfItem === -1 && (menuItem.checked || menuItem.portions !== 1)) {
            newSelectedItems.push(menuItem);
        } else if (indexOfItem >= 0 && menuItem.checked === false) {
            newSelectedItems.splice(indexOfItem, 1);
        } else if (newSelectedItems[indexOfItem].id === menuItem.id && menuItem.checked
            && newSelectedItems[indexOfItem].portions !== menuItem.portions) {
            newSelectedItems[indexOfItem].portions = menuItem.portions;
        }
        newTotal = newSelectedItems.map(i => (i.price * i.portions)).reduce((p, c) => p + c, newTotal);
        const newOrder = {...order, total: newTotal, selectedItems: newSelectedItems};
        setOrder(newOrder);
    }

    function validate() {
        let isValid = true;

        if (order.selectedItems === null || (menuItems.length > 0 && order.selectedItems.length === 0)) {
            isValid = false;
            setMessage(`${message} \n Please select an item that you want to order.`);
        }

        if (!isValid) {
            setShowAlert(showAlertErrorClass);
            window.scrollTo(0, 0);
        } else {
            setShowAlert(hideAlertClass);
        }

        return isValid;
    }

    const placeOrder = e => {
        const newOrder = {...order, status: 1, orderPlacedAt: Date.now()};
        let orderDocId = "";
        setOrder(newOrder);
        e.preventDefault();
        e.persist();

        const valid = validate();

        if (valid) {
            firebase.firestore()
                .collection("orders")
                .add(newOrder)
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
                    console.error(err)
                });

            const newOrderFlow = {orderId: orderDocId, ...orderFlow};
            setOrderFlow(newOrderFlow);

            firebase.firestore()
                .collection("orders_flow")
                .add(newOrderFlow)
                .then(() => {
                    let doNothing = true;
                })
                .catch(err => {
                    setMessage("There was some error updating order flow, your order was placed successfully, but sequence of order might be disturbed!");
                    setShowAlert(showAlertErrorClass);
                    window.scrollTo(0, 0);
                    console.error(err)
                });
        }
    }


    return <>
        <PreparingMenuCard
            imageSource={SETTINGS.MENU.PREPARING_IMAGE}
            title={"Menu items in Preparation"}
            message={"Please be with us, while we decide on best of the delicacies that we could present to you for today, we will soon prepare the items for today and bring you the best crafted food, we could. Please check back again in some time."}
            show={!showMenu}
        />
        <OrderMenuForm className={showAlert} message={message} onSubmit={placeOrder} onChange={handleInputChange}
                          show={showMenu} menuItems={menuItems} retrieveMenuItems={(menuItem) =>
            <MenuItem
                item={menuItem} id={menuItem.id}
                key={menuItem.id}
                onChange={(ref) => {
                    handleSelectedItem(ref)
                }}
            />} order={order}/>
    </>;
}

export default PlaceOrder;
