import React from "react";
import Operation from "./Operation";
import {AddNewMenu, Orders, SignOut, ViewAllMenuItems} from './OperationIcons';
import firebase from "./../../firebase";

const AdminOperations = ({match}) => {

    return <>
        <div className="container">
            <div className="row">
                <Operation title={"Orders"}
                           description={"Maintain and Lookup Orders, an update will also notify users through their tracking medium."}
                           goToSource={"orders"}
                           buttonTitle={"Go to Orders"}
                           buttonSvg={(<Orders/>)}
                />
                <Operation title={"Add Menu"}
                           description={"Add New Menu Items with various parameters reflected to consumers."}
                           goToSource={"add-new-menu"}
                           buttonTitle={"Add New Menu"}
                           buttonSvg={(<AddNewMenu/>)}
                />
                <Operation title={"All Menu Items"}
                           description={"Add New Menu Items with various parameters reflected to consumers."}
                           goToSource={"all-menu-items"}
                           buttonTitle={"View All Menu Items"}
                           buttonSvg={(<ViewAllMenuItems/>)}
                />
                <Operation title={"Sign out"}
                           description={"Sign out from Chef's console."}
                           goToSource={"#"}
                           onClick={() => firebase.auth().signOut().then(() => {const doNothing = true}).catch(() => console.error("Error while Sign out"))}
                           buttonTitle={"Sign out"}
                           buttonSvg={(<SignOut/>)}
                />
            </div>
        </div>
    </>
}

export default AdminOperations;
