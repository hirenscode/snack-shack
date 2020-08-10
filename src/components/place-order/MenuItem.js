import React, {useState} from "react";
import {SETTINGS} from "../../shared/Constants";
import SpiceLevel from "./SpiceLevel";
import ChefRecommended from "./ChefRecommended";
import TodaySpecial from "./TodaySpecial";

const MenuItem = props => {
    const {item} = props;
    const [menuItem, setMenuItem] = useState(props);
    const placeOrderBy = item.placeOrderBy.toDate().toLocaleString();
    const etaDeliveryBy = item.etaDeliveryBy.toDate().toLocaleString();

    const handleToggle = (event) => {
        setMenuItem({...menuItem, checked: event.target.checked})
        // props.checked = e.target.checked;
        props.onChange();
    }

    return <div className="col-sm-6">
        <div className="card mb-3">
            <div className="card-header text-center"> Place Order By: <strong> {placeOrderBy} </strong>
                <br/> Expected to be Available By: <strong> {etaDeliveryBy} </strong></div>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={item.imageSource} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"> {item.title} </h5>
                        <p className="card-text"> {item.description} </p>
                        <p className="card-text">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><SpiceLevel level={item.spiceLevel}/></td>
                                        <td><ChefRecommended recommendation={item.chefRecommended}/></td>
                                        <td><TodaySpecial special={item.todaySpecial}/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                    </div>
                </div>
            </div>

            <div className="card-footer px-md-5">
                <input className="form-check-input position-static"
                       type="checkbox" defaultChecked={item.checked}
                       id={`selectedItem${item.id}`} name={`selectedItemName${item.id}`} value={item.id}
                       aria-label="..." onChange={handleToggle}/> {SETTINGS.CURRENCY.SYMBOL} {item.price}
            </div>
        </div>
    </div>;
}

export default MenuItem;
