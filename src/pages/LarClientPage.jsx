import React from 'react';
import {connect} from 'react-redux';
import ContentTitle from '../layout/ContentTitle';
import {MediumHourGlass} from '../elements/Loaders';
import debounce from 'lodash/debounce';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { getClients, getTestHello } from '../api';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Название', width: 350 },
    { field: 'city.name', headerName: 'Город', width: 130 },
  ];
 
class GridPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }

    }

 // с использованием async/await   
    async loadClients() {
        console.log('load Laravel clients');
        const dateStart = new Date();
/* Рабочий вариант с promise
        getClients().then((data=> {
            console.log('getclients=', data, ((new Date())-dateStart) / 1000);
            this.setState({clients: data});
        }))
        .catch(error => {
            console.log('LarClientPage Error load clients');
            console.log(error.response);
            this.setState({ clients: [] });
        })
*/        
        try {
            const data = await getClients();
            console.log('getclients=', data, ((new Date()) - dateStart) / 1000);
            this.setState({ clients: data });
            
        } catch (error) {
            window.toast.error(error);
            console.log('LarClientPage Error load clients');
            console.log(error.response);
            this.setState({ clients: [] });
        }
    }
    getTestHello() {
        console.log('load test request');
        const dateStart = new Date();
        getTestHello().then((data=> {
            console.log('getTestHello=', ((new Date())-dateStart) / 1000);
        }))
    }

    componentDidMount() {
        this.loadClients();
    }

    render() {
        return (
            <div className="content content-924">
                <ContentTitle className="booking-title">
                    Grid Table Material UI 2 Лар
                </ContentTitle>
                <div style={{ height : '70vh'}}>
                  <DataGrid rows={this.state.clients} columns={columns} pageSize={5} checkboxSelection />
                </div>
                <Button color="primary" onClick={this.getTestHello}>button 1</Button>
           </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
    })
)(GridPage);
