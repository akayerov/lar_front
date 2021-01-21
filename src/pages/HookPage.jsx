// Компонент в современном стиле с использованием Хуков
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import { MediumHourGlass } from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { getClients, getTestHello } from '../api';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 350 },
    { field: 'city.name', headerName: 'Город', width: 130 },
];

const HookPage =  (props) => {

    function loadClients() {
        console.log('load Laravel clients');
        const dateStart = new Date();
        getClients().then((data => {
            console.log('getclients=', data, ((new Date()) - dateStart) / 1000);
            setClients( data );
            setStatus('fetched');
        }))
    }

    async function loadClients2() {
        console.log('load Laravel clients');
        const dateStart = new Date();
        const data = await getClients();
        console.log('getclients=', data, ((new Date()) - dateStart) / 1000);
        setClients(data);
        setStatus('fetched');
    }

    const [status, setStatus] = useState('idle');
    const [query, setQuery] = useState('1');
//    const [data, setData] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        if (!query) return;
/*
        const fetchData = async () => {
            setStatus('fetching');
            const response = await fetch(
                `https://hn.algolia.com/api/v1/search?query=${query}`
            );
            const data = await response.json();
            setData(data.hits);
            setStatus('fetched');
        };
        fetchData();
*/        
//        loadClients();
        loadClients2();

    }, [query]);


    return (
        <div className="content content-924">
            <ContentTitle className="booking-title">
                Grid Table Material UI 2 Хуки State
            </ContentTitle>
            <div style={{ height: '70vh' }}>
                <DataGrid rows={clients} columns={columns} pageSize={5} checkboxSelection />
            </div>
        </div>
    );
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(HookPage);
