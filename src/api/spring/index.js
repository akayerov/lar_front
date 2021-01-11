import axios from 'axios';

const prefix = '/api2/';
const url = resource => prefix + resource;
/////////////////////////////////////////////////////////////////////////////////////////////////////
/// методы, для обращения к api2  - бэк на java spring_boot
///
//  Клиенты
export const getSpringClients = () => axios.get(url('public/clients'), {
    params: {},
    }).then(response => {
    return response.data;
});

