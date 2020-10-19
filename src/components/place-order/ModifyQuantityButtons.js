import React, {useState} from "react";
import {Minus, Plus} from "../admin/OperationIcons";
import {SETTINGS} from "../../common/Constants";

const ModifyQuantityButtons = props => {
    const {item, addQuantity, removeQuantity} = props;
    const [disableAdd, setDisableAdd] = useState(item.portions >= item.quantityPerOrder);
    const [portions, setPortions] = useState(item.portions);
    const [disableRemove, setDisableRemove] = useState(item.portions <= 1);

    const disableAddRemove = (p) => {
        if (p >= item.quantityPerOrder) {
            setDisableAdd(true);
        } else {
            setDisableAdd(false);
        }
        if (p <= 1) {
            setDisableRemove(true);
        } else {
            setDisableRemove(false);
        }
    }

    const modifyAdd = (event) => {
        const newPortions =  portions + 1;
        setPortions(newPortions);
        disableAddRemove(newPortions);
        // if (newPortions >= item.quantityPerOrder) {
            addQuantity(item);
        // }
    }

    const modifyRemove = (event) => {
        const newPortions = portions - 1;
        setPortions(newPortions);
        disableAddRemove(newPortions);
        // if (newPortions <= 1) {
            removeQuantity(item);
        // }
    }

    // const syncPortions = () => {
    //     if (item.portions !== portions) {
    //         const newPortions = item.portions;
    //         setPortions(newPortions);
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    //
    // const modifyAdd = (event) => {
    //     debugger;
    //     const inSync = syncPortions();
    //     const newPortions = inSync ?
    //         (portions + 1 >= item.quantityPerOrder ? portions : portions + 1) :
    //         (item.portions + 1 >= item.quantityPerOrder ? item.portions : item.portions + 1);
    //     setPortions(newPortions);
    //     disableAddRemove(newPortions);
    //     addQuantity(item);
    // }
    //
    // const modifyRemove = (event) => {
    //     debugger;
    //     const inSync = syncPortions();
    //     const newPortions = inSync ?
    //         (portions - 1 <= 1 ? portions : portions - 1) :
    //         (item.portions - 1 <= item.quantityPerOrder ? item.portions : item.portions - 1);
    //     setPortions(newPortions);
    //     disableAddRemove(newPortions);
    //     if (newPortions <= 1) {
    //         removeQuantity(item);
    //     }
    // }

    return <tr>
        <td>
            <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={modifyAdd} disabled={disableAdd}
                    data-modify-for="0"><Plus/></button>
        </td>
        <td> {portions} {item.title} x {SETTINGS.CURRENCY.SYMBOL} {item.price} </td>
        <td>
            <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick={modifyRemove} disabled={disableRemove}
                    data-modify-for="1"><Minus/></button>
        </td>
        <th scope="row"> {SETTINGS.CURRENCY.SYMBOL} {item.price * portions} </th>
    </tr>

    // return <>
    //     <li className="list-group-item d-flex justify-content-between align-items-center">
    //
    //       <span className="badge badge-primary badge-pill">
    //
    //     </li>
    //
    // </>
}

export default ModifyQuantityButtons;
