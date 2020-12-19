import axios from 'axios';

const prefix = '/api/';
const url = resource => prefix + resource;

////////////////////////////////////////////////////////////////////////////////////////////////////
// Тестовые для тестирования авторизации
// публичный, открытый без авторизации
export const getPublic = () => axios.post(url('public'), {
    params: { },
}).then(response => {
    return response.data;
});

// приватный, открытый только с авторизацией
export const getPrivate = () => axios.post(url('private'), {
    params: {},
}).then(response => {
    return response.data;
});

export const getLogout_0 = (token = '') => axios({
  method: 'post',
  url: url('auth/logout'),
  headers: {'Authorization': 'Bearer ' + token},
  data: {
  }
  }).then(response => {
    return response.data;
});
export const getLogout_0_1 = (token = '') => axios.post(
    url('auth/logout'),
    {   // data
    },  
    {   // config запроса необязательная часть
      headers: {'Authorization': 'Bearer ' + token},
    }).then(response => {
    return response.data;
});

// заголовок авторизации вынесен в прерыватель interceptor axios
export const getLogout1 = (token = '') => axios.post(
    url('auth/logout'),
    {   // data
    }  
    ).then(response => {
    return response.data;
});



///////////////////////////////////////////////////////////////////////////////////////////////////////

// приватный, открытый только с авторизацией
export const getUsers = () => axios.get(url('user'), {
    params: {},
}).then(response => {
    return response.data;
});
//  Весовые
export const getPoints = () => axios.get(url('point'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addPoint = ( point ) => axios.post(url('point'), {
    point: point ,
}).then(response => {
    return response.data;
});
export const updatePoint = (point) => axios.post(url('point/update'), {
    point: point,
}).then(response => {
    return response.data;
});

export const deletePoint = (point) => axios.post(url('point/delete'), {
    point: point,
}).then(response => {
    return response.data;
});

//  Автомобили клиентов
export const getClientCars = () => axios.get(url('client-car'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addClientCar = (clientCar) => axios.post(url('client-car'), {
    clientCar: clientCar,
}).then(response => {
    return response.data;
});
export const updateClientCar = (clientCar) => axios.post(url('client-car/update'), {
    clientCar: clientCar,
}).then(response => {
    return response.data;
});

export const deleteClientCar = (clientCar) => axios.post(url('client-car/delete'), {
    clientCar: clientCar,
}).then(response => {
    return response.data;
});

//  Грузы
export const getFrts = () => axios.get(url('frt'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addFrt = (frt) => axios.post(url('frt'), {
    frt: frt,
}).then(response => {
    return response.data;
});
export const updateFrt = (frt) => axios.post(url('frt/update'), {
    frt: frt,
}).then(response => {
    return response.data;
});

export const deleteFrt = (frt) => axios.post(url('frt/delete'), {
    frt: frt,
}).then(response => {
    return response.data;
});

//  Транспорт
export const getTrucks = () => axios.get(url('truck'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addTruck = (truck) => axios.post(url('truck'), {
    truck: truck,
}).then(response => {
    return response.data;
});
export const updateTruck = (truck) => axios.post(url('truck/update'), {
    truck: truck,
}).then(response => {
    return response.data;
});

export const deleteTruck = (truck) => axios.post(url('truck/delete'), {
    truck: truck,
}).then(response => {
    return response.data;
});

// Клиенты
export const getClients = () => axios.get(url('client'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addClient = (client) => axios.post(url('client'), {
    client,
}).then(response => {
    return response.data;
});
export const updateClient = (client) => axios.post(url('client/update'), {
    client,
}).then(response => {
    return response.data;
});

export const deleteClient = (client) => axios.post(url('client/delete'), {
    client,
}).then(response => {
    return response.data;
});

// Ордеры
export const getOrders = () => axios.get(url('order'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addOrder = (order) => axios.post(url('order'), {
    order,
}).then(response => {
    return response.data;
});
export const updateOrder = (order) => axios.post(url('order/update'), {
    order,
}).then(response => {
    return response.data;
});

export const deleteOrder = (order) => axios.post(url('order/delete'), {
    order,
}).then(response => {
    return response.data;
});

// Задания
export const getTasks = () => axios.get(url('task'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addTask = (task) => axios.post(url('task'), {
    task,
}).then(response => {
    return response.data;
});
export const updateTask = (task) => axios.post(url('task/update'), {
    task,
}).then(response => {
    return response.data;
});

export const deleteTask = (task) => axios.post(url('task/delete'), {
    task,
}).then(response => {
    return response.data;
});

// Задания
export const getOperations = () => axios.get(url('operation'), {
    params: {},
}).then(response => {
    return response.data;
});
export const addOperation = (operation) => axios.post(url('operation'), {
    operation,
}).then(response => {
    return response.data;
});
export const updateOperation = (operation) => axios.post(url('operation/update'), {
    operation,
}).then(response => {
    return response.data;
});

export const deleteOperation = (operation) => axios.post(url('operation/delete'), {
    operation,
}).then(response => {
    return response.data;
});
