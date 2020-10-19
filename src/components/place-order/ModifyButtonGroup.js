import ModifyQuantityButtons from "./ModifyQuantityButtons";
import React from "react";

const ModifyButtonGroup = props => {
    const {order, addQuantity, removeQuantity} = props;
    return <div className="table-responsive">
        <table className="table table-borderless">
            <tbody>
            {order.selectedItems.map(i =>
                <ModifyQuantityButtons
                    key={`modifyButtons${i.id}`}
                    item={i}
                    addQuantity={addQuantity}
                    removeQuantity={removeQuantity}/>)}
            </tbody>
        </table>
    </div>
}

export default ModifyButtonGroup;
