import React from 'react';
import PropTypes from 'prop-types';
import BlueManIcon from '../icons/BlueMan';

const RadioInput = ({label, handler, ...props}) => (
    <div className="radio-sex" onClick={handler}>
        <input {...props} type="radio" checked={props.checked} onChange={handler} />
        <label>{label}</label>
    </div>
);

RadioInput.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
};

const male = true;

const SexPicker = ({value, ...props}) => {
    const handler = value => () => props.onChange(value);
    return (
        <div className="sex clearfix">
            <BlueManIcon />
            <RadioInput {...props} 
                checked={value != null && value == male}
                handler={handler(true)} 
                label="м" />
            <RadioInput {...props} 
                checked={value != null && value != male}
                handler={handler(false)}
                label="ж" />
        </div>
    )
};

SexPicker.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

SexPicker.defaultProps = {
    value: true,
};

export default SexPicker;
