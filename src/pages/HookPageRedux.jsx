// Компонент в современном стиле с использованием Хуков Redux традиционно
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import { MediumHourGlass } from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { fetchClients } from '../redux/actions';




const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 350 },
    { field: 'city.name', headerName: 'Город', width: 130 },
];

const HookPage =  (props) => {


    const [status, setStatus] = useState('idle');
    const [query, setQuery] = useState('1');

    useEffect(() => {
        if (!query) return;
        props.loadClients2();

    }, [query]);


    return (
        <div className="content content-924">
            <ContentTitle className="booking-title">
                Grid Table Material UI 2 Хуки Redux
            </ContentTitle>
            <div style={{ height: '70vh' }}>
                <DataGrid rows={props.clients} columns={columns} pageSize={5} checkboxSelection />
            </div>
        </div>
    );
}

export default connect(
    state => ({
        clients: state.clients,
    }),
    dispatch => ({
        loadClients2: () => dispatch(fetchClients({}))
    })
)(HookPage);
