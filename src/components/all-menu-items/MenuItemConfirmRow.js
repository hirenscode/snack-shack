import React from "react";

const MenuItemConfirmRow = ({item ,onYes, onNo}) => {
    return <td colSpan="5"> Confirm delete {item.title}? <br/> <br/>
        <button type="button" className="btn btn-danger" data-id={item.id} onClick={onYes}> Yes</button>
        &nbsp;
        <button type="button" className="btn btn-success" data-id={item.id} onClick={onNo}> No</button>
        &nbsp;
    </td>;
}

export default MenuItemConfirmRow;
