import React from 'react';
import PropTypes from 'prop-types';

export default class ModalOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyUp(event) {
        if (event.keyCode === 27) this.props.close();
    }

    render() {
        return <div className="modal-overlay" onClick={this.props.close} />;
    }
}

ModalOverlay.propTypes = {
    close: PropTypes.func
};

ModalOverlay.defaultProp = {
    close: () => {},
};
