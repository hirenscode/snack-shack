import React from "react";
import ModifyButtonGroup from "./ModifyButtonGroup";
import {SETTINGS} from "../../common/Constants";

const TotalAmountCard = props => {
    const {order, menuItems, addQuantity, removeQuantity} = props;
    return <div className="form-group">
        <div className="card">
            <h5 className="card-header"> Total Amount </h5>
            <div className="card-body">
                <ModifyButtonGroup menuItems={menuItems}
                                   order={order}
                                   addQuantity={addQuantity}
                                   removeQuantity={removeQuantity}/>
                <span className="card-title text-right">
                    <h6> Order Total  </h6>
                    <h5> {SETTINGS.CURRENCY.SYMBOL} {order.total}  </h5>
                </span>
                <p className="card-text text-right"> total amount shown here does not include taxes or GST.</p>
                {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
            </div>
        </div>
    </div>;
}

export default TotalAmountCard;
