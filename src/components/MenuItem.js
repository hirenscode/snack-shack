import React, {useState} from "react";
import {SETTINGS} from "../shared/Constants";

const MenuItem = props => {
    const {title, description, imageSource, price, id, checked} = props;
    const [menuItem, setMenuItem] = useState(props);

    const handleToggle = (event) => {
        setMenuItem({...menuItem, checked: event.target.checked})
        // props.checked = e.target.checked;
        props.onChange();
    }

    return <div className="col-sm-6">
    <div className="card mb-3">
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={imageSource} className="card-img" alt="..."/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title"> {title} </h5>
                    <p className="card-text"> {description} </p>
                </div>
            </div>
        </div>

        <div className="card-footer px-md-5">
            <input className="form-check-input position-static"
            type="checkbox" defaultChecked={checked}
            id="blankCheckbox" value={id}
            aria-label="..." onChange={handleToggle}/> {SETTINGS.CURRENCY.SYMBOL} {price}
        </div>
    </div>
    </div>;
}

export default MenuItem;
