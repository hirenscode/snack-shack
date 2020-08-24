import DatePicker from "react-datepicker";
import React from "react";

const DatePickerInput = ({onChange, selected, title}) => {
    return <div className="form-group row">
        <label htmlFor="orderPlaceDateTime" className="col-sm-4 col-form-label"> {title}. </label>
        <div className="col-sm-8">
            <DatePicker className="form-control"
                        disabledKeyboardNavigation
                        selected={selected}
                        onChange={onChange}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
            />
        </div>
    </div>;
}

export default DatePickerInput;
