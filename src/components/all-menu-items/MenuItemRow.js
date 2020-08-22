import {Link} from "react-router-dom";
import ChefRecommended from "../../common/ChefRecommended";
import TodaySpecial from "../../common/TodaySpecial";
import SpiceLevel from "../../common/SpiceLevel";
import React from "react";

const MenuItemRow = ({item, onClick}) => {
    return <>
        <td>
            <div className="btn-group" role="group" aria-label="Functions">
                <Link className="btn btn-primary"
                      to={`/admin/update-menu-item?menuItemId=${item.id}`}
                      role="button"> <i className="fa fa-edit"/> </Link>
                <button type="button"
                        className="btn btn-danger"
                        data-id={item.id}
                        onClick={onClick}><i data-id={item.id} className="fa fa-trash-alt"/></button>
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
    </>;
}

export default MenuItemRow;
