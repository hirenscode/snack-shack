import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import ChefRecommended from "../../common/ChefRecommended";
import TodaySpecial from "../../common/TodaySpecial";
import SpiceLevel from "../../common/SpiceLevel";
import {Link} from "react-router-dom";

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
                    {!item.deleteTriggered ? (<>
                        <td scope="row">
                            <div className="btn-group" role="group" aria-label="Functions">
                                <Link className="btn btn-primary"
                                      to={`/admin/update-menu-item?menuItemId=${item.id}`}
                                      role="button"> <i className="fa fa-edit"/> </Link>
                                <button type="button"
                                        className="btn btn-danger"
                                        data-id={item.id}
                                        onClick={toggleDeleteTrigger}><i data-id={item.id} className="fa fa-trash-alt"/></button>
                            </div>
                        </td>
                        <td> {item.title} </td>
                        <td> {item.placeOrderByString} </td>
                        <td> {item.price} </td>
                        <td>
                            <ChefRecommended recommendation={item.chefRecommended}/> |
                            <TodaySpecial special={item.todaySpecial}/> |
                            <SpiceLevel level={item.spiceLevel}/>
                        </td> </>) : (
                            <td colSpan="5"> Confirm delete {item.title}? <br/> <br/>
                                <button type="button" className="btn btn-danger" data-id={item.id} onClick={handleDelete}> Yes </button> &nbsp;
                                <button type="button" className="btn btn-success" data-id={item.id} onClick={toggleDeleteTrigger}> No </button> &nbsp;
                            </td>
                        )
                    }

                </tr>)
            )}
            </tbody>
        </table>
    </div>
}

export default AllMenuItems;
