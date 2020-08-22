import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import MenuItemRow from "./MenuItemRow";
import MenuItemConfirmRow from "./MenuItemConfirmRow";

const AllMenuItems = (props) => {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("menus")
            .onSnapshot((snapshot => {
                const newMenus = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMenuItems(newMenus.map(i => {
                    return {
                        ...i,
                        placeOrderByString: i.placeOrderBy === undefined ? "None" : i.placeOrderBy.toDate().toLocaleString(),
                        deleteTriggered: false
                    }
                }));
            }));
    }, [])

    const handleDelete = (e) => {
        const itemId = e.target.dataset.id;
        firebase.firestore()
            .collection("menus")
            .doc(itemId)
            .delete()
            .then(() => {
                    console.log(menuItems);
                }
            ).catch(err => {
                console.error(err);
            });

    }

    const toggleDeleteTrigger = (e) => {
        const itemId = e.target.dataset.id;
        const menuItem = menuItems.filter(i => i.id === itemId)[0];
        const newMenuItem = {...menuItem, deleteTriggered: !menuItem.deleteTriggered};
        const newMenuItems = [];
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].id === itemId) {
                newMenuItems.push(newMenuItem);
            } else {
                newMenuItems.push(menuItems[i]);
            }
        }
        setMenuItems(newMenuItems)
    }

    return <div className="table-responsive">
        <table className="table table-hover">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Last Displayed</th>
                <th scope="col">Price</th>
                <th scope="col">Flags</th>
            </tr>
            </thead>
            <tbody>
            {menuItems.map(item => (
                <tr key={item.id}>
                    {!item.deleteTriggered ? (<MenuItemRow item={item} onClick={toggleDeleteTrigger}/>)
                    : (<MenuItemConfirmRow item={item} onYes={handleDelete} onNo={toggleDeleteTrigger}/>)
                    }
                </tr>)
            )}
            </tbody>
        </table>
    </div>
}

export default AllMenuItems;
