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


//  Test JSON сознания задачи и запуска в отдельном потоке выполнения
export const createLongTask = () => axios.get(url('public/testjson'), {
    params: {},
}).then(response => {
    return response.data;
});



//  Результат длительной операции из JSON поля result базы данных
export const getSpringdataJson = () => axios.get(url('public/testresult/42'), {
    params: {},
}).then(response => {
    return response.data;
});

