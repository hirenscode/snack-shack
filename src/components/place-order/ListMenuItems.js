import React from "react";

function ListMenuItems(props) {
    const {menuItems, retrieveMenuItems, show} = props;

    const visibility = show ? "visible" : "invisible d-none";

    return <>
        <div className="form-group">
            <label className={visibility} htmlFor="menuItems">Select the items you need for today</label>
            <div className={`row ${visibility}`}>
                {(menuItems && menuItems.length > 0) ? menuItems.map(retrieveMenuItems) : (<></>)}
            </div>
        </div>
    </>;
}

export default ListMenuItems;
