import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {


    const [query, setQuery] = useState(0);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return function cleanup() {
          window.removeEventListener('keyup', onKeyUp);
        }
    }, [query]);


    const  onKeyUp = (event) => {
        if (event.keyCode === 27) props.close();
    }

    return <div className="modal-overlay" onClick={props.close} />;
}

ModalOverlay.propTypes = {
    close: PropTypes.func
};

ModalOverlay.defaultProp = {
    close: () => {},
};
export default ModalOverlay;
