import React from 'react';
import Draggable from 'react-draggable';

const ModalWrapper = props => (
    <Draggable>
        <div className="modal-container" style={{display: 'flex', flexDirection: 'column', maxHeight: '80%' }}>
            <h3>{props.title}</h3>

            <div className="modal-content" style={{overflow: 'auto'}}>
                {props.children}
            </div>
        </div>
    </Draggable>
);

export default ModalWrapper;
