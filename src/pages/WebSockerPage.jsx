// Компонент в современном стиле с использованием Хуков Redux традиционно
import React, { useState, useEffect } from 'react';

//import { connect } from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import { MediumHourGlass } from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { fetchClients } from '../redux/actions';
// новый стиль работы с redux
import { useSelector, useDispatch } from 'react-redux';

import { getMe, setNewPassword } from '../api';

// модальные окна
import { addModal, closeModal } from '../redux/actions';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 350 },
    { field: 'city.name', headerName: 'Город', width: 130 },
];

const WebSocketPage =  (props) => {


    const [status, setStatus] = useState('idle');
    const [query, setQuery] = useState('1');
// новое от redux
    const websocket = useSelector(state => state.websocket);
    const dispatch = useDispatch();
/*
    useEffect(() => {
        if (!query) return;
// новое от redux
        dispatch(fetchClients({}));

    }, [query]);

    const reload = () => {
       console.log('Reload data...');
        dispatch(fetchClients({}));
    }

 */
    const showModal = () => {
        console.log('Show modal function');
        dispatch(addModal('emptyView', { activity: null }));
    }
    console.log('WebsocketPage websocket=', websocket);
    const message = (websocket) ? websocket.message: '';
    return (
        <div className="content content-924">
            <ContentTitle className="booking-title">
                Web Socket Page
            </ContentTitle>
            <Button color="primary" onClick={()=>{}}>Кнопка 1</Button>
            <Button color="primary" onClick={()=>{}}>Кнопка 2</Button>
            <div style={{ height: '70vh' }}>
                {message}
            </div>
        </div>
    );
}
export default WebSocketPage;

