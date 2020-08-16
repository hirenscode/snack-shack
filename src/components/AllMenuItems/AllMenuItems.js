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
                // newMenus.map(i => Object.keys(i).map(k => console.log(k, i[k])));
                setMenuItems(newMenus);
                setMenuItems(newMenus.map(i => {
                    return {...i,
                        placeOrderByString: i.placeOrderBy === undefined ? "None" : i.placeOrderBy.toDate().toLocaleString()}}));
            }));
    }, [])


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
                        <button type="button" className="btn btn-primary"><i className="fa fa-edit"/></button>
                        <button type="button" className="btn btn-danger"><i className="fa fa-trash-alt"/></button>
                    </div>
                </td>
                <td> {item.title} </td>
                <td> {item.placeOrderByString} </td>
                <td> {item.price} </td>
                <td>
                    <ChefRecommended recommendation={item.chefRecommended}/> |
                    <TodaySpecial special={item.todaySpecial}/>  |
                    <SpiceLevel level={item.spiceLevel}/>
                </td>
            </tr>)
        )}
        </tbody>
    </table>
}

export default AllMenuItems;
