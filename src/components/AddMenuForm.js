import React, {useState} from "react";
import {SETTINGS} from "../shared/Constants";
import * as firebase from "firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddMenuForm = props => {
    const storageRef = firebase.storage();
    const initialValues = {
        title: "",
        description: "",
        imageSource: "",
        price: "",
        dateTime: null
    }

    const [menu, setMenu] = React.useState(initialValues);
    const [image, setImage] = useState(null);
    const hideProgressBarClass = "invisible progress";
    const animatedStripedProgressBarClass ="progress-bar progress-bar-striped progress-bar-animated"
    const spiceLevelTags = ["ZERO SPICY","MILD","SPICY", "HOT", "BEYOND HOT"];
    const getSpiceLabelIndex =(spiceLevel, spiceLevelTags) => {
        return Math.floor(spiceLevel / (100 / spiceLevelTags.length));
    }

    const peppers = (x) => {
        x = x < spiceLevelTags.length ? x : (spiceLevelTags.length - 1);
        return [...Array(x)].map((e, i) => <i className="fa fa-pepper-hot"/>)
    }

    const [progressBarClass, setProgressBarClass] = useState(hideProgressBarClass);
    const [progressBarValue, setProgressBarValue] = useState(1);
    const [progressBarAnimationClass, setProgressBarAnimationClass] = useState(animatedStripedProgressBarClass);
    const [orderPlacementDateTime, setOrderPlacementDateTime] = useState();
    const [orderDeliveryDateTime, setOrderDeliveryDateTime] = useState();
    const [spiceLevel, setSpiceLevel] = useState(0);
    const [spiceLevelLabel, setSpiceLevelLabel] = useState(spiceLevelTags[getSpiceLabelIndex(spiceLevel, spiceLevelTags)]);


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
        let nowHHMMSSSS = `${today.getUTCHours()}_${today.getUTCMinutes()}_${today.getUTCSeconds()}`
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
                    })
                    // console.log("Upload Completed at " + downloadURL)
                });
            });
    }

    const addMenu = e => {
        e.preventDefault();
        e.persist();
        firebase.firestore().collection("menus").add(menu)
            .then((docRef) => {
                e.target.reset();
                setProgressBarValue(0);
                setProgressBarClass(hideProgressBarClass);
                // setMessage("Order Placed successfully!");
                // setShowAlert(showAlertSuccessClass);
                window.scrollTo(0, 0);
                console.log("Added menu");
            })
            .catch(err => {
                setProgressBarValue(0);
                setProgressBarClass(hideProgressBarClass);
                // setMessage("There was some error placing order, please try again!");
                // setShowAlert(showAlertErrorClass);
                window.scrollTo(0, 0);
                console.log(err)
            });
    }

    return <form onSubmit={addMenu}>
        <div className="form-group">
            <input placeholder="Menu Item Name" className="form-control" id="title" name="title"
                   onChange={handleInputChange}/>
        </div>
        <div className="form-group">
            <input placeholder="Menu Description" className="form-control" id="description" name="description"
                   onChange={handleInputChange}/>
        </div>
        <div className={progressBarClass}>
            <div className={progressBarAnimationClass} role="progressbar"
                 aria-valuenow={progressBarValue} aria-valuemin="0" aria-valuemax="100"
                 style={{width: `${progressBarValue}%`}}/>
        </div>
        <div className="input-group mb-3">
            <div className="custom-file">
                <input type="file" className="form-control custom-file-input" id="imageSource" name="imageSource"
                       onChange={handleInputChange}/>
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
                            "placeOrderBy": date
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
                                    "etaDeliveryBy": date
                                })
                            }}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="spiceLevel"> Spice Level {spiceLevelLabel} {peppers(getSpiceLabelIndex(spiceLevel, spiceLevelTags))} </label>
            <input type="range" name="spiceLevel" className="form-control-range"
                   id="spiceLevel" value={spiceLevel}
                   onChange={e => {
                        setSpiceLevel(parseInt(e.target.value));
                        setSpiceLevelLabel(spiceLevelTags[getSpiceLabelIndex(spiceLevel, spiceLevelTags)]);
                        handleInputChange(e)
                    }}/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block" onSubmit={addMenu}>Add Menu </button>
        </div>
    </form>;
}

export default AddMenuForm;
