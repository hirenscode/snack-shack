import DatePicker from "react-datepicker";
import React from "react";

const DatePickerInput = ({onChange, selected}) => {
    return <div className="form-group row">
        <label htmlFor="orderPlaceDateTime" className="col-sm-4 col-form-label"> Enter Date and Time till order
            could be placed. </label>
        <div className="col-sm-8">
            <DatePicker className="form-control"
                        disabledKeyboardNavigation
                        selected={selected}
                        onChange={onChange}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
            />
        </div>
    </div>;
}

export default DatePickerInput;
