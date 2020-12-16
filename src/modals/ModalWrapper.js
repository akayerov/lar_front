import React from 'react';

const ModalWrapper = props => (
    <div className="modal-container">
        {props.title && <h3>{props.title}</h3>}

        <div className="modal-content">
            {props.children}
        </div>
    </div>
);

export default ModalWrapper;
