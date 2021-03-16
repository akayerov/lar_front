import React from 'react';
import {connect} from 'react-redux';
import { updateModal, closeModal } from './redux/actions';

// modals
/*
import Template from './modals/Template';
import DeleteItem from './modals/DeleteItem';
import EditDirectory from './modals/EditDirectory';
import TemlateReport from './modals/TemlateReport';
import MultiEditTicket from './modals/MultiEditTicket';
*/
import Warning from './modals/Warning';
import EmptyView from './modals/EmptyView';

import { useSpring, animated } from 'react-spring'

//import ModalOverlay from './modals/ModalOverlay';
import ModalOverlay from './modals/ModalOverlayHook';

import map from 'lodash/map';


export const modalTypes = {
//    template: Template,
//    deleteItem: DeleteItem,
    warning: Warning,
    emptyView: EmptyView,
//    editDirectory: EditDirectory,
//    temlateReport: TemlateReport,
//    multiEditTicket: MultiEditTicket
};

const getModal = type => {
    if (modalTypes[type] !== undefined) return modalTypes[type];
    return null;
};

const ModalManager = ({ modals, ...props }) => {
    const SpringProps = useSpring({ opacity: 1, from: { opacity: 0 } });


    return (
        <animated.div style = { SpringProps }>
            {modals.length > 0 && <ModalOverlay close={props.close} key={1} />}


            {map(modals, (item, i) => {
                const Modal = getModal(item.modalType);
                console.log('Modal=', item.modalType );
                return (
                    <Modal {...props} {...item} key={i} />
                )
            }

            )}
         </animated.div>   
    );
};


export default connect(
    state => ({
        type: state.modal.type,
        data: state.modal.data,
        modals: state.modals,
    }),
    dispatch => ({
        close: () => dispatch(closeModal(null, null))
    })
)(ModalManager);