import React from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import TextFieldGroup from "./TextFieldGroup";

const InputGroup = ({
                        name,
                        placeholder,
                        value,
                        error,
                        icon,
                        type,
                        onChange,
                    }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="inpyt-group-text">
                    <i className={icon}/>
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

InputGroup.PropTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


TextFieldGroup.defaultProps = {
    type: "text"
}

export default InputGroup