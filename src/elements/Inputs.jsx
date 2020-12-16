import React from 'react';
import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';

export const Input = ({label, placeholder, children, inputComponent: InputComponent = 'input', ...props}) => {
//    const id = uuid.v4();
    const id = uuidv4(); 
    const labelText = label || placeholder || '';
    const labelClass = props.value !== undefined && props.value.length > 0 ? 'used floating' : 'floating';
    return (
        <div className="rowmy">
            <InputComponent {...props} id={id} />
            {labelText && <label className={labelClass} htmlFor={id}>{labelText}</label>}
            {props.required && <div className="req" />}
            {children}
        </div>
    );
};

export const YellowInput = props => <Input {...props} className={'yellow-input ' + props.className} />;
export const GrayInput = props => <Input {...props} className={'gray-input ' + props.className} />;
export const WhiteInput = props => <Input {...props} className={'white-input ' + props.className} />;

export default Input;
