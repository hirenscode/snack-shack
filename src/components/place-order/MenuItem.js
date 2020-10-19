import React, {useState} from "react";
import {SETTINGS} from "../../common/Constants";
import SpiceLevel from "../../common/SpiceLevel";
import ChefRecommended from "../../common/ChefRecommended";
import TodaySpecial from "../../common/TodaySpecial";
import {Minus, Plus} from "../admin/OperationIcons";

const MenuItem = props => {
    const [menuItem, setMenuItem] = useState(props.item);
    const placeOrderByDate = menuItem.placeOrderBy.toDate();
    const etaDeliveryByDate = menuItem.etaDeliveryBy.toDate();
    const placeOrderBy = `${placeOrderByDate.toLocaleDateString(SETTINGS.GEO.LOCALE)} ${placeOrderByDate.toLocaleTimeString(SETTINGS.GEO.LOCALE)}`;
    const etaDeliveryBy = `${etaDeliveryByDate.toLocaleDateString(SETTINGS.GEO.LOCALE)} ${etaDeliveryByDate.toLocaleTimeString(SETTINGS.GEO.LOCALE)}`;

    const handleToggle = (event) => {
        const itemObject = {...menuItem, checked: event.target.checked, portions: 1};
        setMenuItem(itemObject);
        props.onChange(itemObject);
    }

    const handleQuantity = (event)  => {
        const itemObject = {...menuItem, checked: true, portions: parseInt(event.target.value)};
        setMenuItem(itemObject);
        props.onChange(itemObject);
    }

    return <div className="col-sm-6">
        <div className="card mb-3">
            <div className="card-header text-center"> Place Order By: <strong> {placeOrderBy} </strong>
                <br/> Expected to be Available By: <strong> {etaDeliveryBy} </strong></div>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={menuItem.imageSource} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"> {menuItem.title} </h5>
                        <p className="card-text"> {menuItem.description} </p>
                        <span className="card-text">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><SpiceLevel level={menuItem.spiceLevel}/></td>
                                        <td><ChefRecommended recommendation={menuItem.chefRecommended}/></td>
                                        <td><TodaySpecial special={menuItem.todaySpecial}/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-footer px-md-5">
                <input className="form-check-input position-static"
                       type="checkbox" checked={menuItem.checked}
                       id={`selectedItem${menuItem.id}`} name={`selectedItemName${menuItem.id}`} value={menuItem.id}
                       aria-label="..." onChange={handleToggle}/> {SETTINGS.CURRENCY.SYMBOL} {menuItem.price} &nbsp;
                <div className="col-auto my-1">
                    <label className="mr-sm-2 sr-only" htmlFor="itemQuantity"> Quantity </label>
                    <select className="custom-select mr-sm-2" id={`quantity${menuItem.id}`}
                            name={`quantityName${menuItem.id}`}  aria-describedby="Quantity"
                            value={menuItem.portions} onChange={handleQuantity}>
                        {[...Array(menuItem.quantityPerOrder).keys()]
                            .map(number => <option value={number + 1} key={number}> {number + 1} Portion(s) </option>)}
                    </select>
                </div>
            </div>
        </div>
    </div>;
}

export default MenuItem;
