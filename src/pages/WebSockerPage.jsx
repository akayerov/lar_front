// Компонент в современном стиле с использованием Хуков Redux традиционно
import React, { useState, useEffect } from 'react';

import ContentTitle from '../layout/ContentTitle';

import { Button } from '@material-ui/core';
// новый стиль работы с redux
import { useSelector, useDispatch } from 'react-redux';

import { genEvent, genEvent2 } from '../api';



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
    console.log('WebsocketPage websocket=', websocket);
    const message = (websocket) ? websocket.message: '';

    const sendEventMessage = () => {
        console.log('Отправка сообщения...');
        genEvent(" Привет akayerov:" + new Date());
    }
    const sendEventMessage2 = () => {
        console.log('Отправка сообщения...');
        genEvent2(" Привет akayerov2:" + new Date());
    }


    return (
        <div className="content content-924">
            <ContentTitle className="booking-title">
                Web Socket Page
            </ContentTitle>
            <Button color="primary" onClick={sendEventMessage}>Send Event</Button>
            <Button color="primary" onClick={sendEventMessage2}>Send Event2</Button>
            <div style={{ height: '70vh' }}>
                {message}
            </div>
        </div>
    );
}
export default WebSocketPage;



