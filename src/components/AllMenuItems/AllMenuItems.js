import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import ChefRecommended from "../../shared/ChefRecommended";
import TodaySpecial from "../../shared/TodaySpecial";
import SpiceLevel from "../../shared/SpiceLevel";

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
                        placeOrderByString: i.placeOrderBy === undefined ? "None" : i.placeOrderBy.toDate().toLocaleString()
                    }
                }));
            }));
    }, [])


    const handleEdit = (e) => {
        const itemId = e.target.dataset.id;
        const item = menuItems.filter(i => i.id === itemId);

    }

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

    return <table className="table">
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
                <td scope="row">
                    <div className="btn-group" role="group" aria-label="Functions">
                        <button type="button"
                                className="btn btn-primary"
                                data-id={item.id}
                                onClick={handleEdit}><i className="fa fa-edit"/></button>
                        <button type="button"
                                className="btn btn-danger"
                                data-id={item.id}
                                onClick={handleDelete}><i className="fa fa-trash-alt"/></button>
                    </div>
                </td>
                <td> {item.title} </td>
                <td> {item.placeOrderByString} </td>
                <td> {item.price} </td>
                <td>
                    <ChefRecommended recommendation={item.chefRecommended}/> |
                    <TodaySpecial special={item.todaySpecial}/> |
                    <SpiceLevel level={item.spiceLevel}/>
                </td>
            </tr>)
        )}
        </tbody>
    </table>
}

export default AllMenuItems;