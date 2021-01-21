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



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 350 },
    { field: 'city.name', headerName: 'Город', width: 130 },
];

const HookPage =  (props) => {


    const [status, setStatus] = useState('idle');
    const [query, setQuery] = useState('1');
// новое от redux
    const clients = useSelector(state => state.clients);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!query) return;
// новое от redux
        dispatch(fetchClients({}));

    }, [query]);

    const reload = () => {
       console.log('Reload data...');
        dispatch(fetchClients({}));
    }
    const changePassword = () => {
        console.log('Изменить пароль...');
        setNewPassword("akayerov@gmail.com", "987654321");
    }

    const whoami = () => {
        getMe().then( data => {
            console.log('res=', data);
        });
    }

    return (
        <div className="content content-924">
            <ContentTitle className="booking-title">
                Grid Table Material UI 2 Хуки Redux2
            </ContentTitle>
            <div style={{ height: '70vh' }}>
                <DataGrid rows={clients} columns={columns} pageSize={5} checkboxSelection />
            </div>
            <Button color="primary" onClick={reload}>Обновить</Button>
            <Button color="primary" onClick={changePassword}>Изм Пароль</Button>
            <Button color="primary" onClick={whoami}>Кто я?</Button>
        </div>
    );
}
export default HookPage;

