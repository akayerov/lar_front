import React from 'react';
import {connect} from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import {MediumHourGlass} from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { getSpringClients, getSpringdataJson, createLongTask } from '../api/spring'

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];
const columns1 = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 300 },
    { field: 'city.name', headerName: 'Город', width: 130 },
  ];
  
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]


class EmptyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
        this.loadClients = this.loadClients.bind(this);
        this.getDataJson = this.getDataJson.bind(this);
        this.getCreateLongTask = this.getCreateLongTask.bind(this);
    }

    getCreateLongTask() {
        console.log('create long task');
        createLongTask().then((data => {
            console.log('create long task result=', data);

        }))

    }

    getDataJson() {
        console.log('get Data Json Objects');
        getSpringdataJson().then((data => {
            console.log('get Data Json Objects result=', data);
            // const results = JSON.parse(data.result);
            const results = data.result;
            console.log('result=', results);
            results.forEach(element => {
                console.log('element=', element);
                const date1 = new Date(element.createdDate);
                console.log('date =', element.createdDate);
                console.log('date1 =', date1);
            });            

        }))
    }

    loadClients() {
        console.log('load clients');
        getSpringClients().then((data=> {
            console.log('getclients=', data);
            this.setState({clients: data});
        }))
    }

    componentDidMount() {
        this.loadClients();
    }
    render() {
        return (
            <div className="content content-924">
                <ContentTitle className="booking-title">
                    Grid Table Material UI
                </ContentTitle>
                <div style={{ height : '70vh'}}>
                <div style={{ height : '90%'}}>
                    <DataGrid rows={this.state.clients} columns={columns1} pageSize={5} checkboxSelection />
                </div>
                <Button color="primary">button 1</Button>
                <Button variant="contained" color="primary" onClick={this.getCreateLongTask}>Create Task</Button>
                <Button variant="contained" color="primary" onClick={this.getDataJson}>Get RES Task Json</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(EmptyComponent);
