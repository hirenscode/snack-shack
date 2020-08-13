import PreparingMenuCard from "./PreparingMenuCard";
import ListMenuItems from "./ListMenuItems";
import React from "react";

function MenuItemsSection(props) {
    const {showMenu, menuItems, retrieveMenuItems} = props;

    return <div className="form-group">
        <PreparingMenuCard
            imageSource={"https://firebasestorage.googleapis.com/v0/b/vishals-snack-shack.appspot.com/o/images%2Fpreparing-menu%2FPreparing1.jpg?alt=media&token=250815e8-1b06-47d5-b3c3-91657085a6f0"}
            title={"Menu items in Preparation"}
            message={"Please be with us, while we decide on best of the delicacies that we could present to you for today, we will soon prepare the items for today and bring you the best crafted food, we could. Please check back again in some time."}
            show={!showMenu}
        />
        <ListMenuItems menuItems={menuItems} retrieveMenuItems={retrieveMenuItems} show={showMenu}/>
    </div>;
}

export default MenuItemsSection;
