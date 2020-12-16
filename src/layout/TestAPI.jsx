import React from 'react';
import { getPoints, addPoint, updatePoint, deletePoint } from '../api'
import { getClientCars, addClientCar, updateClientCar, deleteClientCar } from '../api'
import { getFrts, addFrt, updateFrt, deleteFrt } from '../api'
import { getTrucks, addTruck, updateTruck, deleteTruck } from '../api'
import { getClients, addClient, updateClient, deleteClient } from '../api'
import { getOrders, addOrder, updateOrder, deleteOrder } from '../api'
import { getTasks, addTask, updateTask, deleteTask } from '../api'
import { getOperations, addOperation, updateOperation, deleteOperation } from '../api'
import { getPublic, getPrivate } from '../api'

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TestAPI = props => (
    <div className="content-base">
        <div className="container">
            <div>
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getPublic().then(res => console.log(res)
                            )
                        }
                        }
                        value="Публичный (без регистрации) метод"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getPrivate().then(res => console.log(res)
                            )
                        }
                        }
                        value="Закрытый (с логином) метод"
                    />
                </div>    
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getPoints().then(res => console.log(res)
                            )
                        }
                        }
                        value="Весовые"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            addPoint({ name: 'Автодобавление'}).then(res => console.log(res)
                            )
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            updatePoint({ id: 4, name: 'Обновлено' }).then(res => console.log(res)
                            )
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            deletePoint({ id: 5, name: '' }).then(res => console.log(res)
                            )
                        }
                        }
                        value="Удалить"
                    />
                </div>    
                <div style={{marginTop:'20px'}}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getClientCars().then(res => console.log(res)
                            )
                        }
                        }
                        value="Автомобили перевозчика"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newclientCar = {
                               id : 0,
                               client_id: 2,
                               type : 1,       // пока не решил как на практике кодирую тип машин
                               brand: 'VOLVO',
                               model: 'V078',
                               payload_tons: 26,
                               payload_m3 :  10,
                               eco: 'B2'
                            }   
                            addClientCar(newclientCar).then(res => console.log(res)
                            )
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const clientCar = {
                                id: 1,
                                client_id: 2,
                                type: 1,       // пока не решил как на практике кодирую тип машин
                                brand: 'VOLVO',
                                model: 'V078_1',
                                payload_tons: 28,
                                payload_m3: 10,
                                eco: 'B2'
                            }   
                            updateClientCar(clientCar).then(res => console.log(res)
                            )
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const clientCar = {
                                id: 3,
                            }   
                            deleteClientCar(clientCar).then(res => console.log(res)
                            )
                        }
                        }
                        value="Удалить"
                    />
                </div>
 {/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getFrts().then(res => console.log(res)
                            )
                        }
                        }
                        value="Грузы"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newFrt = {
                                id: 0,
                                name: 'Песок',
                                type: 1,         // тип веса 0 - тонны, 1 - фунты
                                notation: 'Песок речной АВТО',
                            }
                            addFrt(newFrt).then(res => console.log(res)
                            )
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const frt = {
                                id: 5,
                                name: 'Песок mod',
                                type: 2,         // тип веса 0 - тонны, 1 - фунты
                                notation: 'Песок речной mod',
                            }
                            updateFrt(frt).then(res => console.log(res)
                            )
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const frt = {
                                id: 5,
                            }
                            deleteFrt(frt).then(res => console.log(res)
                            )
                        }
                        }
                        value="Удалить"
                    />
                </div>
{/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getTrucks().then(res => console.log(res)
                            )
                        }
                        }
                        value="Транспорт"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newTruck = {
                                id: 0,
                                own_truck_name: "Вольво Васи",
                                type: 1,
                                tr_number: "V145674BV",
                                vin: "ABC779",
                                notation: 'Автомобиль Васи',
                            }
                            addTruck(newTruck).then(res => console.log(res)
                            )
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const truck = {
                                id: 4,
                                own_truck_name: "Вольво Васи_mod",
                                type: 2,
                                tr_number: "V145674BV_mod",
                                vin: "ABC779_mod",
                                notation: 'Автомобиль Васи_mod',
                            }
                            updateTruck(truck).then(res => console.log(res)
                            )
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const truck = {
                                id: 5,
                            }
                            deleteTruck(truck).then(res => console.log(res)
                            )
                        }
                        }
                        value="Удалить"
                    />
                </div>
                {/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getClients().then(res => console.log(res)
                            )
                        }
                        }
                        value="Клиенты"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newClient = {
                                id: 0,
                                type: 'buyer',
                                name: 'Клиент АБВГ',
                                name_full: 'ООО Клиент АБВГД',
                                email: 'test' + String(getRandom(1,10000)) + '@yandex.ru',
                                phone: '+1 443434 54555',
                                doc_address: 'Юридический адрес',
                                act_address: 'Фактический адрес',
                                notation: 'Примечание',
                                state: 1,
                                update_datetime: null
                            }
                            addClient(newClient).then(res => console.log(res) )
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const client = {
                                id: 5,
                                type: 'vendor',
                                name: 'Клиент АБВГ',
                                name_full: 'ООО Клиент АБВГД',
                                email: "testMod" + String(getRandom(1, 10000)) + '@yandex.ru',
                                phone: '+1 443434 54555',
                                doc_address: 'Юридический адрес',
                                act_address: 'Фактический адрес',
                                notation: 'Примечание',
                                state: 1,
                                update_datetime: null
                            }
                            updateClient(client).then(res => console.log(res) )
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const client = {
                                id: 412,
                            }
                            deleteClient(client).then(res => console.log(res) )
                        }
                        }
                        value="Удалить"
                    />
                </div>
                {/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getOrders().then(res => console.log(res))
                        }
                        }
                        value="Ордеры"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newOrder = {
                                id: 0,
                                user1_id: 1,             // продавец
                                user2_id: 2,             // покупатель
                                client_id: 1,            // покупатель   
                                creation_date: null,
                                frt_id: 1, 
                                total_weight: 50.0,
                                total_vol: null,
                                point_id: 1,
                                state: 1,                // 1 - создание заказа 
                                weight_last: 2           // число измерений 
                            }
                            addOrder(newOrder).then(res => console.log(res))
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const order = {
                                id: 3,
                                user1_id: 1,             // продавец
                                user2_id: 2,             // покупатель
                                client_id: 1,            // покупатель   
                                creation_date: null,
                                frt_id: 1,
                                total_weight: 49.9,
                                total_vol: null,
                                point_id: 1,
                                state: 1,                // 1 - создание заказа 
                                weight_last: 2           // число измерений 

                            }
                            updateOrder(order).then(res => console.log(res))
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const order = {
                                id:4,
                            }
                            deleteOrder(order).then(res => console.log(res))
                        }
                        }
                        value="Удалить"
                    />
                </div>
                {/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getTasks().then(res => console.log(res))
                        }
                        }
                        value="Задания"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newTask = {
                                id: 0,
                                user_id: 2, 
                                order_id: 3, 
                                buyer_id: 1, 
                                creation_date: null,
                                frt_id: 1, 
                                vendor_id: 4, 
                                trucker_id: 3, 
                                total_weight: 30.0,
                                total_vol: null,
                                sum_weight: 0.0,
                                sum_vol: null,
                                point_id: 1, 
                                notation: "Новая АВТО задача ",
                                weight_last: 2,
                                rt_finish: null
                            }
                            addTask(newTask).then(res => console.log(res))
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const task = {
                                id: 2,
                                user_id: 2,
                                order_id: 3,
                                buyer_id: 1,
                                creation_date: null,
                                frt_id: 1,
                                vendor_id: 4,
                                trucker_id: 3,
                                total_weight: 29.9,
                                total_vol: null,
                                sum_weight: 0.0,
                                sum_vol: null,
                                point_id: 1,
                                notation: "Новая АВТО задача mod",
                                weight_last: 2,
                                rt_finish: null
                            }
                            updateTask(task).then(res => console.log(res))
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const task = {
                                id: 3,
                            }
                            deleteTask(task).then(res => console.log(res))
                        }
                        }
                        value="Удалить"
                    />
                </div>
                {/* Конец секции */}
                <div style={{ marginTop: '20px' }}>
                    <input type="button" className="button yellow"
                        onClick={() => {
                            getOperations().then(res => console.log(res))
                        }
                        }
                        value="Операции (Взвешивание)"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const newOperation = {
                                id: 0,
                                point_id: 1, 
                                point_number: 1,
                                task_id: 2,
                                truck_id: 1,
                                total_weight: 28.78,
                                creation_date: null
                            }
                            addOperation(newOperation).then(res => console.log(res))
                        }
                        }
                        value="Добавить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const operation = {
                                id: 4,
                                point_id: 1,
                                point_number: 1,
                                task_id: 2,
                                truck_id: 1,
                                total_weight: 5,
                                creation_date: null
                            }
                            updateOperation(operation).then(res => console.log(res))
                        }
                        }
                        value="Изменить"
                    />
                    <input type="button" className="button yellow"
                        onClick={() => {
                            const operation = {
                                id: 10,
                            }
                            deleteOperation(operation).then(res => console.log(res))
                        }
                        }
                        value="Удалить"
                    />
                </div>
                {/* Конец секции */}
            </div>
        </div>
    </div>
);

export default TestAPI;
