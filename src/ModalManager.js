import React from 'react';
import {connect} from 'react-redux';
import {updateModal} from './redux/actions';

// modals
/*
import Template from './modals/Template';
import DeleteItem from './modals/DeleteItem';
import Warning from './modals/Warning';
import EditDirectory from './modals/EditDirectory';
import TemlateReport from './modals/TemlateReport';
import MultiEditTicket from './modals/MultiEditTicket';
*/
// v1 react-transition-group устарела React ругается на нее
//import {CSSTransitionGroup} from 'react-transition-group';
// v4.0.1
//https://reactcommunity.org/react-transition-group/transition-group
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ModalOverlay from './modals/ModalOverlay';

export const modalTypes = {
/*
    template: Template,
    deleteItem: DeleteItem,
    warning: Warning,
    editDirectory: EditDirectory,
    temlateReport: TemlateReport,
    multiEditTicket: MultiEditTicket
*/    
};

const getModal = type => {
    if (modalTypes[type] !== undefined) return modalTypes[type];
    return null;
};

const ModalManager = ({type, ...props}) => {
    const Modal = getModal(type);

    return (
/*
        <CSSTransitionGroup transitionName="modal"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}>
            {Modal && <ModalOverlay close={props.close} key={1} /> }
            {Modal && <Modal {...props} key={2} />}
        </CSSTransitionGroup>
*/
        <TransitionGroup className="todo-list">
        <CSSTransition
                key={'trans_modal'}
                timeout={500}
                classNames="item">
        <div>
            {Modal && <ModalOverlay close={props.close} key={1} />}
            {Modal && <Modal {...props} key={2} />}

        </div>
        </CSSTransition>

        </TransitionGroup>

    );
};

export default connect(
    state => ({
        type: state.modal.type,
        data: state.modal.data,
    }),
    dispatch => ({
        close: () => dispatch(updateModal(null, null))
    })
)(ModalManager);
