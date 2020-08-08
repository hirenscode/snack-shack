import React, {useState} from "react";
import {SETTINGS} from "../shared/Constants";
import * as firebase from "firebase";

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
    const [progressBarClass, setProgressBarClass] = useState(hideProgressBarClass);
    const [progressBarValue, setProgressBarValue] = useState(1);
    const [progressBarAnimationClass, setProgressBarAnimationClass] = useState(animatedStripedProgressBarClass);

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
                 style={{width: `${progressBarValue}%`}}></div>
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
        <div className="form-group">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar-plus"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                            <path fillRule="evenodd"
                                  d="M7.5 9.5A.5.5 0 0 1 8 9h2a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0v-2z"/>
                            <path fillRule="evenodd"
                                  d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
                            <path fillRule="evenodd"
                                  d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </span>
                </div>
                <input placeholder="Date and Time of Availability" className="form-control" id="dateTime"
                       name="dateTime" onChange={handleInputChange}/>
            </div>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block" onSubmit={addMenu}>Add Menu </button>
        </div>
    </form>;
}

export default AddMenuForm;
