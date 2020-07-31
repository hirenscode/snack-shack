import React from "react";

const AddMenuForm = props => {
    const initialValues = {
        title: "",
        description: "",
        imageSource: "",
        price: [""],
        dateTime: null
    }

    let [values, setValues] = React.useState(initialValues);

    const handleInputChange = e => {
        let {name, value} = e.target;
        console.log("Name " + name);
        console.log("Value " + value);
        setValues({
            ...values,
            [name]: value
        })
    }

    const addMenu = e => {
        e.preventDefault();
        props.addMenu(values);
    }
    
    return <form onSubmit={addMenu}>
        <div className="form-group">
            <label htmlFor="title">Menu Item </label>
            <input className="form-control" id="title" name="title" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="description">Menu Description</label>
            <input className="form-control" id="description" name="description" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="imageSource"> Menu Image </label>
            <input className="form-control" id="imageSource" name="imageSource" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="price"> Price </label>
            <input className="form-control" id="price" name="price" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="datetime"> Date and Time of Availability </label>
            <input className="form-control" id="dateTime" name="dateTime" onChange={handleInputChange}/>
        </div>
        <button type="submit" className="btn btn-primary"> Add Menu </button>
    </form>;
}

export default AddMenuForm;
