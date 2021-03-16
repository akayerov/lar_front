import {combineReducers} from 'redux';
import * as actionTypes from '../actionTypes';
import uniqueId from 'lodash/uniqueId';

const pending = (status = {}, action) => {
    if (action.type === actionTypes.PENDING_SET) {
        return {
            ...status,
            [action.key]: !!action.value,
        };
    }
    return status;
};

const token = (token = null, action) => {
    if (action.type === actionTypes.TOKEN_SET) return action.token;
    return token;
};

const user = (data = null, action) => {
    switch (action.type) {
        case actionTypes.USER_SET:
            action.data.sex = !!action.data.sex;
            return action.user;
        case actionTypes.USER_UPDATE:
            action.data.sex = !!action.data.sex;
            return {
                ...data,
                ...action.data
            };
        case actionTypes.USER_LOGOUT:
            return null;
    }
    return data;
};

const activities = (list = [], {data, type}) => {
    if (type === actionTypes.ACTIVITY_UPDATE) {
        return data;
    }
    return list;
};

const basketItems = (items = [], action) => {
//    console.log('basketItems action=', action, items);
    switch (action.type) {
        case actionTypes.setBasketItems: 
            return action.items;
/*
            let newItems = [];
            for (let i = 0; i < action.items.length; i++)
                newItems.push(action.items[i])
            return newItems;
*/
        case actionTypes.clearBasketPromo:
                let newItems = [];
                for (let i = 0; i < items; i++) {
                    let itemNew = items[i];
                    delete itemNew.promo;
                    newItems.push(itemNew);
                }    
                return newItems;
        case actionTypes.addBasketItem:
            const activity = action.activity;
            const activity_tariff_id = action.activity_tariff_id;
            let newItem = null;
            const restItems = items.reduce((arr, item) => {
                if (item.activity.id != activity.id) return [...arr, item];
                else if (item.activity_tariff_id != activity_tariff_id) return [...arr, item];
                newItem = {...item, count: item.count + 1};
                return arr;
            }, []);
            let newItemId = parseInt(uniqueId(), 10);
            while (!!restItems.find(item => item.id == newItemId)) newItemId = parseInt(uniqueId(), 10);
            if (!newItem) {
                newItem = {
                    id: newItemId,
                    activity,
                    activity_tariff_id,
                    is_tandem: false,
                    count: 1
                }
            }
            return [...restItems, newItem];

        case actionTypes.updateBasketItem:
            return items.map(item => item.id == action.id ? {...item, count: Math.max(action.count, 1)} : {...item});

        case actionTypes.removeBasketItem:
            return items.filter(item => item.id != action.id);

        case actionTypes.changeBasketItemsTariffs:
            // Changed values can be accessed by `action.payload`
            return items;
    }
    return items;
};

const tickets = (tickets = [], action) => {
    if (action.type == actionTypes.setTickets) {
        return action.data;
    }
    return tickets;
};

const modal = (state = {}, action) => {
    if (action.type == actionTypes.updateModal) {
        return {
            type: action.modalType,
            data: action.data,
        }
    }
    return state;
};

const modals = (state = {}, action) => {
    if (action.type == actionTypes.addModal) {
        if(state && state.length > 0) {
            return [...state, action]
        }
        else
            return [action]
    }
    else if (action.type == actionTypes.closeModal) {
        console.log('Close Modal');
        if (state && state.length > 0) {
            let res = [];
            for(let i=0; i<state.length-1;i++) {
                res.push(state[i]);
            }
            return res;
        }
    }
    return state;
};

const printingTemplate = (template = null, action) => {
    if (action.type == actionTypes.setPrintingTemplate) {
        return action.template;
    }
    return template;
};

const reservedDates = (dates = {}, action) => {
    if (action.type == actionTypes.setReservedDate) {
        return {
            ...dates,
            [action.activityId]: action.dates
        };
    }
    return dates;
};

const reservationTimers = (timers = [], action) => {
    if (action.type == actionTypes.setReservationTimers) {
        return action.timers;
    }  else if (action.type == actionTypes.addReservationTimer) {
        return [...timers, {
            reservationId: action.reservationId,
            expirationTime: action.expirationTime,
        }];
    } else if (action.type == actionTypes.removeReservationTimer) {
        return timers.filter(timer => timer.reservationId != action.reservationId);
    }

    return timers;
};


const clients = (list = [], { data, type }) => {
    if (type === actionTypes.CLIENT_UPDATE) {
        return data;
    }
    return list;
};

/* Запись события в хранилище */

const events = (list = {}, { type, data }) => {
    if (type === actionTypes.EVENT_SET) {
        console.log('reducer EVENT_SET', data);
        return data
    }
    return list;
};


const websocket = (status = {}, action) => {
    if (action.type === actionTypes.WEB_SOCKET) {
        const data = action.data;
        const key = data.key;
        const value = data.value;
/*
        console.log('key = ', key);
        console.log('value = ', value);
*/
        return {
            ...status,
            [key]: value,
        };
    }
    return status;
};



const rootReducer = combineReducers({
    pending,
    token,
    user,
    activities,
    basketItems,
    tickets,
    modal,
    printingTemplate,
    reservedDates,
    reservationTimers,
    modals,
//
   clients,  
// 2021-02-09
   events,
   websocket


});

export default rootReducer;
