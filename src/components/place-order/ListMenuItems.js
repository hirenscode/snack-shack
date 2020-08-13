import React from "react";

function ListMenuItems(props) {
    const {menuItems, retrieveMenuItems, show} = props;

    const visibility = show ? "visible" : "invisible d-none";

    return <>
        <label className={visibility} htmlFor="menuItems">Select the items you need for today</label>
        <div className={`row ${visibility}`}>
            {menuItems.map(retrieveMenuItems)}
        </div>
    </>;
}

export default ListMenuItems;
