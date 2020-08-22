import React, {useEffect, useState} from "react";
import {SETTINGS} from "../../common/Constants";
import * as firebase from "firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SpiceLevel from "../../common/SpiceLevel";
import * as PropTypes from "prop-types";

function DatePickerInput(props) {
    return <div className="form-group row">
        <label htmlFor="orderPlaceDateTime" className="col-sm-4 col-form-label"> Enter Date and Time till order
            could be placed. </label>
        <div className="col-sm-8">
            <DatePicker className="form-control"
                        disabledKeyboardNavigation
                        selected={props.selected}
                        onChange={props.onChange}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
            />
        </div>
    </div>;
}

DatePickerInput.propTypes = {
    selected: PropTypes.func,
    onChange: PropTypes.func
};
const AddMenuForm = props => {
    const editMode = props.editMode ? props.editMode : false;
    const menuItemId = editMode ? props.menuItemId : null;
    const storageRef = firebase.storage();
    const initialValues = {
        title: "",
        description: "",
        imageSource: SETTINGS.MENU.DEFAULT_MENU_IMAGE,
        price: "",
        placeOrderBy: "",
        etaDeliveryBy: "",
        spiceLevel: 0,
        quantityPerOrder: 20,
        chefRecommended: false,
        todaySpecial: false
    }
    const hideProgressBarClass = "invisible progress";
    const animatedStripedProgressBarClass = "progress-bar progress-bar-striped progress-bar-animated"
    const showAlertSuccessClass = "alert alert-success alert-dismissible fade show";
    const showAlertErrorClass = "alert alert-danger alert-dismissible fade show";
    const showAlertWarningClass = "alert alert-warning alert-dismissible fade show";
    const hideAlertClass = "alert collapse";

    //States
    const [image, setImage] = useState(null);
    const [menu, setMenu] = React.useState(initialValues);
    const [progressBarClass, setProgressBarClass] = useState(hideProgressBarClass);
    const [progressBarValue, setProgressBarValue] = useState(1);
    const [progressBarAnimationClass, setProgressBarAnimationClass] = useState(animatedStripedProgressBarClass);
    const [orderPlacementDateTime, setOrderPlacementDateTime] = useState();
    const [orderDeliveryDateTime, setOrderDeliveryDateTime] = useState();
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(hideAlertClass);
    const [imageIsUploaded, setImageIsUploaded] = useState(false);

    useEffect(() => {
        if (editMode) {
            firebase.firestore()
                .collection("menus")
                .doc(menuItemId[0])
                .onSnapshot(snapshot => {
                    const menuItem = {id: menuItemId[0], ...snapshot.data()};
                    console.log(menuItem);
                    setMenu(menuItem);
                    setOrderPlacementDateTime(menuItem.placeOrderBy.toDate())
                    setOrderDeliveryDateTime(menuItem.etaDeliveryBy.toDate())
                })
        }
    }, [])

    const handleInputChange = e => {
        let {name, value} = e.target;
        if (e.target.files && e.target.files[0]) {
            const fileName = e.target.files[0].name;
            e.target.nextElementSibling.innerText = fileName;
            setImage(e.target.files[0]);
            setMenu({
                ...menu,
                [name]: fileName
            })
        } else {
            setMenu({
                ...menu,
                [name]: value
            })
        }
    }

    const handleFileUpload = (e) => {
        let today = new Date();
        let todayYYYYMMDD = `${today.getUTCFullYear()}_${today.getUTCMonth()}_${today.getUTCDate()}`;
        let nowHHMMSSSS = `${today.getUTCHours()}_${today.getUTCMinutes()}_${today.getUTCSeconds()}`;
        let metadata = {
            contentType: 'image/jpeg'
        };
        const uploadTask = storageRef
            .ref(`images/menu-item/${todayYYYYMMDD}/${nowHHMMSSSS}_${menu.title}`)
            .put(image, metadata);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBarClass("progress");
                setProgressBarValue(progress);
                if (progress === 100) {
                    setProgressBarAnimationClass("progress-bar progress-bar-striped");
                } else {
                    setImageIsUploaded(false);
                }
            }, (error) => {
                console.error(error)
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    setMenu({
                        ...menu,
                        "imageSource": downloadURL
                    });
                    setImageIsUploaded(true);
                });
            });
    }

    const validate = () => {
        let isValid = true;
        let hasWarning = false;

        if (!editMode) {
            if (menu.imageSource === "") {
                isValid = false;
                setMessage(`${message} \n Please upload Image for the Menu.`);
            } else if (menu.imageSource !== "" && !imageIsUploaded) {
                hasWarning = true;
                setMessage(`${message} \n You might have forgot to click on Upload button after browsing image from local device, this might result in a Menu item being displayed without an image for the end user.`);
            }
        }

        let placeOrderByValid = false;
        if (menu.placeOrderBy === "") {
            isValid = false;
            setMessage(`${message} \n Please enter Order By for the Menu.`);
        } else {
            placeOrderByValid = true;
        }

        let etaDeliveryByValid = false;
        debugger;
        if (menu.etaDeliveryBy === "") {
            isValid = false;
            setMessage(`${message} \n Please enter Estimated Time of Delivery Date for the Menu.`);
        } else {
            etaDeliveryByValid = true;
        }

        if (placeOrderByValid && etaDeliveryByValid
            && menu.etaDeliveryBy <= menu.placeOrderBy) {
            isValid = false;
            setMessage(`${message} \n Please enter ETA Date Time which is after Order By Date Time.`);
        }

        if (menu.price === "") {
            isValid = false;
            setMessage(`${message} \n Please enter Price for the menu.`);
        } else if (isNaN(menu.price)) {
            isValid = false;
            setMessage(`${message} \n Price should be a number.`);
        }

        if (!isValid) {
            setShowAlert(showAlertErrorClass);
            window.scrollTo(0, 0);
        } else if (isValid && hasWarning) {
            setShowAlert(showAlertWarningClass);
            window.scrollTo(0, 0);
        } else {
            setShowAlert(hideAlertClass);
        }

        return isValid && !hasWarning;
    }

    const addMenu = e => {
        e.preventDefault();
        e.persist();

        const valid = validate();

        if (editMode) {
            if (valid) {
                firebase.firestore()
                    .collection("menus")
                    .doc(menu.id)
                    .update(menu)
                    .then((docRef) => {
                        e.target.reset();
                        setProgressBarValue(0);
                        setProgressBarClass(hideProgressBarClass);
                        setMessage("Menu Item added/updated successfully!");
                        setShowAlert(showAlertSuccessClass);
                        window.scrollTo(0, 0);
                    })
                    .catch(err => {
                        setProgressBarValue(0);
                        setProgressBarClass(hideProgressBarClass);
                        window.scrollTo(0, 0);
                        console.log(err)
                    });
            }
        } else {
            if (valid) {
                firebase.firestore().collection("menus").add(menu)
                    .then((docRef) => {
                        e.target.reset();
                        setProgressBarValue(0);
                        setProgressBarClass(hideProgressBarClass);
                        setMessage("Menu Item added/updated successfully!");
                        setShowAlert(showAlertSuccessClass);
                        window.scrollTo(0, 0);
                    })
                    .catch(err => {
                        setProgressBarValue(0);
                        setProgressBarClass(hideProgressBarClass);
                        window.scrollTo(0, 0);
                        console.log(err)
                    });
            }
        }


    }

    return <>
        <div className={showAlert} role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form onSubmit={addMenu}>
            <div className="form-group">
                <input placeholder="Menu Item Name" className="form-control" id="title" name="title"
                       onChange={handleInputChange} required value={menu.title}/>
            </div>
            <div className="form-group">
                <input placeholder="Menu Description" className="form-control" id="description" name="description"
                       onChange={handleInputChange} required value={menu.description}/>
            </div>
            <div className="card mb-3">
                <img src={menu.imageSource} className="rounded mx-auto d-block menu-item-icon" alt={menu.title}
                     style={{width: "50%"}}/>
                <div className="card-body">
                    <div className={progressBarClass}>
                        <div className={progressBarAnimationClass} role="progressbar"
                             aria-valuenow={progressBarValue} aria-valuemin="0" aria-valuemax="100"
                             style={{width: `${progressBarValue}%`}}/>
                    </div>
                </div>
            </div>
            <div className="input-group mb-3">
                <div className="custom-file">
                    <input type="file" className="form-control custom-file-input" id="imageSource" name="imageSource"
                           onChange={handleInputChange} required={menu.imageSource === undefined}/>
                    <label className="custom-file-label" htmlFor="imageSource"
                           aria-describedby="imageSource">Choose Menu Image</label>
                </div>
                <div className="input-group-append">
                    <span className="input-group-text" id="imageUpload" onClick={handleFileUpload}>Upload</span>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> {SETTINGS.CURRENCY.SYMBOL} </span>
                    </div>
                    <input placeholder="Price of Item" className="form-control" id="price" name="price"
                           onChange={handleInputChange} value={menu.price}/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="maxQuantity"> Maximum Quantity allowed per
                    Order: <strong> {menu.quantityPerOrder} </strong> Portions </label>
                <input type="range" name="maxQuantity" className="form-control-range" max="100" onChange={e => {
                    const value = e.target.value
                    setMenu({
                        ...menu,
                        quantityPerOrder: parseInt(value)
                    });
                }} value={menu.quantityPerOrder}/>
            </div>
            <DatePickerInput selected={orderPlacementDateTime} onChange={date => {
                setOrderPlacementDateTime(date);
                setMenu({
                    ...menu,
                    placeOrderBy: date
                })
            }}/>
            <DatePickerInput selected={orderDeliveryDateTime} onChange={date => {
                setOrderDeliveryDateTime(date)
                setMenu({
                    ...menu,
                    etaDeliveryBy: date
                })
            }}/>
            <div className="form-group">
                <label htmlFor="spiceLevel"> Spice Level <SpiceLevel level={menu.spiceLevel}/> </label>
                <input type="range" name="spiceLevel" className="form-control-range"
                       max={SETTINGS.MENU.SPICE_LEVEL_LABELS.length - 1}
                       id="spiceLevel" value={menu.spiceLevel}
                       onChange={e => {
                           setMenu({
                               ...menu,
                               [e.target.name]: parseInt(e.target.value)
                           });
                       }}/>
            </div>
            <div className="form-group">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" name="chefRecommended" id="chefRecommended"
                           checked={menu.chefRecommended} onChange={(e) => {
                        setMenu({
                            ...menu,
                            [e.target.name]: e.target.checked
                        });
                    }}/>
                    <label className="custom-control-label" htmlFor="chefRecommended"> Recommended </label>
                </div>
            </div>
            <div className="form-group">
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" name="todaySpecial" id="todaySpecial"
                           checked={menu.todaySpecial} onChange={(e) => {
                        setMenu({
                            ...menu,
                            [e.target.name]: e.target.checked
                        });
                    }}/>
                    <label className="custom-control-label" htmlFor="todaySpecial"> Today's Special </label>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg btn-block"
                        onSubmit={addMenu}> {editMode ? "Modify Menu" : "Add Menu"} </button>
            </div>
        </form>
    </>;
}

export default AddMenuForm;
