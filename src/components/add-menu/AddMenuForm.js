import React, {useState} from "react";
import {SETTINGS} from "../../shared/Constants";
import * as firebase from "firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SpiceLevel from "../place-order/SpiceLevel";

const AddMenuForm = props => {
    const storageRef = firebase.storage();
    const initialValues = {
        title: "",
        description: "",
        imageSource: "",
        price: "",
    }
    const hideProgressBarClass = "invisible progress";
    const animatedStripedProgressBarClass ="progress-bar progress-bar-striped progress-bar-animated"
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
    const [spiceLevel, setSpiceLevel] = useState(0);
    const [chefRecommended, setChefRecommended] = useState(false);
    const [todaySpecial, setTodaySpecial] = useState(false);
    const [maxQuantity, setMaxQuantity] = useState(20);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(hideAlertClass);
    const [warning, setWarning] = useState("");
    const [imageIsUploaded, setImageIsUploaded] = useState(false);

    const handleInputChange = e => {
        let {name, value} = e.target;
        console.log("Name " + name);
        console.log("Value " + value);
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

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
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
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    setMenu({
                        ...menu,
                        "imageSource": downloadURL
                    });
                    setImageIsUploaded(true);
                    // console.log("Upload Completed at " + downloadURL)
                });
            });
    }

    const validate = () => {
        let isValid = true;
        let hasWarning = false;

        if (menu.imageSource === null || menu.imageSource === "") {
            isValid = false;
            setMessage(`${message} \n Please upload Image for the Menu.`);
        } else if (menu.imageSource !== null && menu.imageSource !== "" && !imageIsUploaded) {
            hasWarning = true;
            setMessage(`${message} \n You might have forgot to click on Upload button after browsing image from local device, this might result in a Menu item being displayed without an image for the end user.`);
        }

        if (menu.placeOrderBy === null || menu.placeOrderBy === "") {
            isValid = false;
            setMessage(`${message} \n Please enter Order By for the Menu.`);
        }

        if (menu.etaDeliveryBy === null || menu.etaDeliveryBy === "") {
            isValid = false;
            setMessage(`${message} \n Please enter Estimated Time of Delivery Date for the Menu.`);
        }

        debugger;

        if (!isValid) {
            setShowAlert(showAlertErrorClass);
            window.scrollTo(0, 0);
        }else if (isValid && hasWarning) {
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
                   onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
            <input placeholder="Menu Description" className="form-control" id="description" name="description"
                   onChange={handleInputChange} required/>
        </div>
        <div className={progressBarClass}>
            <div className={progressBarAnimationClass} role="progressbar"
                 aria-valuenow={progressBarValue} aria-valuemin="0" aria-valuemax="100"
                 style={{width: `${progressBarValue}%`}}/>
        </div>
        <div className="input-group mb-3">
            <div className="custom-file">
                <input type="file" className="form-control custom-file-input" id="imageSource" name="imageSource"
                       onChange={handleInputChange} required/>
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
                       onChange={handleInputChange}/>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="spiceLevel"> Maximum Quantity allowed per Order: <strong> {maxQuantity} </strong> Portions </label>
            <input type="range" name="spiceLevel" className="form-control-range" max="100" onChange={e => {
                setMaxQuantity(parseInt(e.target.value));
            }} defaultValue={maxQuantity}/>
        </div>
        <div className="form-group row">
            <label htmlFor="orderPlaceDateTime" className="col-sm-4 col-form-label"> Enter Date and Time till order could be placed. </label>
            <div className="col-sm-8">
                <DatePicker className="form-control"
                    disabledKeyboardNavigation
                    selected={orderPlacementDateTime}
                    onChange={date => {
                        setOrderPlacementDateTime(date);
                        setMenu({
                            ...menu,
                            placeOrderBy: date
                        })
                    }}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="orderPlaceDateTime" className="col-sm-4 col-form-label"> Expected Delivery By. </label>
            <div className="col-sm-8">
                <DatePicker className="form-control"
                            disabledKeyboardNavigation
                            selected={orderDeliveryDateTime}
                            onChange={date => {
                                setOrderDeliveryDateTime(date);
                                setMenu({
                                    ...menu,
                                    etaDeliveryBy: date
                                })
                            }}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="spiceLevel"> Spice Level <SpiceLevel level={spiceLevel}/> </label>
            <input type="range" name="spiceLevel" className="form-control-range" max={SETTINGS.MENU.SPICE_LEVEL_LABELS.length - 1}
                   id="spiceLevel" value={spiceLevel}
                   onChange={e => {
                        setSpiceLevel(parseInt(e.target.value));
                        handleInputChange(e)
                    }}/>
        </div>
        <div className="form-group">
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" name="chefRecommended" id="chefRecommended"
                       checked={chefRecommended} onChange={(e) => {
                           setChefRecommended(e.target.checked);
                           handleInputChange(e)}}/>
                <label className="custom-control-label" htmlFor="chefRecommended">  Recommended </label>
            </div>
        </div>
        <div className="form-group">
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" name="todaySpecial" id="todaySpecial"
                       checked={todaySpecial} onChange={(e) => {
                    setTodaySpecial(e.target.checked);
                    handleInputChange(e)}}/>
                <label className="custom-control-label" htmlFor="todaySpecial"> Today's Special </label>
            </div>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block" onSubmit={addMenu}>Add Menu </button>
        </div>
    </form>
    </>;
}

export default AddMenuForm;
