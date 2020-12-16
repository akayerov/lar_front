import * as actionTypes from '../actionTypes';
import throttle from 'lodash/throttle';
import moment from 'moment';
import axios from 'axios';
import  { getLogout1 } from '../../api'
const url = '/api/';

const encodeParams = (params = {}) => {
    return Object
        .keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

const urlWithParams = (url, params) => url + '?' + encodeParams(params);

const params = (data = {}, method = 'POST') => {
    let params = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },
    };
    if (method === 'POST') params.body = JSON.stringify(data);

    return params;
};

const assembleBasketItemsRequest = basketItems => {
    let startAcc = {};
    basketItems.forEach(el => {
        startAcc[el.activity.id] = [];
    });
    return basketItems.reduce((acc, item) => {
        acc[item.activity.id].push({
            count: item.count,
            persons: item.persons || null,
            activity_tariff_id: item.activity_tariff_id,
            is_tandem: item.is_tandem || false,
            promo_detail_id: (item.promo) ? item.promo.promoDetailId: null,
            promo_detail_value: (item.promo) ? item.promo.value : null,
            promo_detail_unit: (item.promo) ? item.promo.unit : null,
            promo_detail_count: (item.promo) ? item.promo.count : null,
        });
        return acc;
    }, startAcc);
}

export const setPending = (key, value) => ({
    type: actionTypes.PENDING_SET,
    key,
    value,
});

export const setPendings = pendings => ({
    type: actionTypes.setPendings,
    pendings,
});

export const setToken = token => ({
    type: actionTypes.TOKEN_SET,
    token
});

// User actions
// c использованием axios и его прерывателей
export const logIn = (email, password) => dispatch => {
    dispatch(setPending('user', true));
    axios.post(
        url + 'auth/login',
        {  // data
           email, password,
        }, 
        ).then(response => {
          const data = response.data;
            dispatch(setPending('user', false));
            if (!data.error) {
                const token = data.access_token;
                delete data.access_token;

                dispatch(setToken(token));
                dispatch({
                    type: actionTypes.USER_UPDATE,
                    data
                });
            } else {
                switch (data.error.code) {
                    case 3:
                        window.toast.error('Неверные логин и пароль');
                }
            }
        })
        .catch(error => console.log('error', error));
};


export const restorePassword = email => dispatch => {
    dispatch(setPending('user', true));

    fetch(url + 'auth/restore', params({email, }))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('user', false));
            if (!data.error) {
                window.toast.success('На почту было отправлено письмо с Вашим новым паролем');
            } else {
                switch (data.error.code) {
                    case 1:
                        window.toast.error('Некорректный e-mail');
                        break;
                    case 4:
                        window.toast.error('Пользователь с этим e-mail не найден');
                        break;
                }
            }
        })
        .catch(error => console.log('error', error));
};

export const regUser = data => dispatch => {
    dispatch(setPending('user', true));

    fetch(url + 'auth/reg', params(data))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('user', false));
            if (!data.error) {
                // const token = data.access_token;
                // delete data.access_token;

                window.toast.success('Регистрация прошла успешно. Вам на почту было отправлено письмо для подтверждения регистрации');

                /*dispatch(setToken(token));
                dispatch({
                    type: actionTypes.USER_UPDATE,
                    data: data
                });*/
            } else {
                switch (data.error.code) {
                    case 5:
                        window.toast.error('Некорректное имя');
                        break;
                    case 6:
                        window.toast.error('Некорректный e-mail');
                        break;
                    case 7:
                        window.toast.error('Некорректный пароль');
                        break;
                    case 8:
                        window.toast.error('Этот e-mail уже занят');
                        break;
                    case 9:
                        window.toast.error('Неверные логин и пароль');
                        break;
                }
            }
        }).catch(error => console.log('error', error));
};

export const updateUser = data => (dispatch, getState) => {
    dispatch(setPending('user', true));
    const access_token = getState().token;
    fetch(url + 'me/update', params({...data, access_token}))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('user', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.USER_UPDATE,
                    data: data,
                });
                window.toast.success('Информация обновлена');
            } else {
                switch (data.error.code) {
                    case 3:
                        window.toast.error('Неверные пользовательские данные');
                        break;
                }
            }
        }).catch(error => console.log('error', error));
};

// 2020-06-19 этот метод почему то странно обрабатывается на сервеер, ошибок не пишет, но по моему logout не делает
export const logOut = () => (dispatch, getState) => {
    fetch(urlWithParams(url + 'me/logout', {access_token: getState().token})).then((res) => {
        console.log("logout успешно res=", res)
        dispatch({
            type: actionTypes.USER_LOGOUT,
        });
        dispatch({
            type: actionTypes.TOKEN_SET,
            token: null,
        });
        dispatch({
            type: actionTypes.setBasketItems,
            items: [],
        });
        document.cookie = '';
    })
};

// 2020-06-19 альтернативный getLogout1  метод четко делает выход из сессии на сервере
export const logout1 = (token) => (dispatch, getState) => {
    console.log('token=', token);
    getLogout1(token).then((res) => {
        console.log("logout1 успешно res=", res)
        dispatch({
            type: actionTypes.USER_LOGOUT,
        });
        dispatch({
            type: actionTypes.TOKEN_SET,
            token: null,
        });
        dispatch({
            type: actionTypes.setBasketItems,
            items: [],
        });
        document.cookie = '';
    })
};

export const fetchUserData = (init = false) => (dispatch, getState) => {
    if (!init && !getState().token) return;

    const pendingKey = init ? 'init' : 'user';
    dispatch(setPending(pendingKey, true));
    fetch(urlWithParams(url + 'client', {access_token: getState().token}), params({}, 'GET'))
        .then(r => r.json())
        .then(data => {
            if (!data.error) {
                dispatch({
                    type: actionTypes.USER_UPDATE,
                    data
                });
            }
            dispatch(setPending(pendingKey, false));
        })
        .catch(error => console.log('error', error));
};

// Усовершенствованный и упрощенный вход. Используется сессионный куки
// token не нужен
export const fetchUserData2 = (init = false) => (dispatch, getState) => {
    const pendingKey = init ? 'init' : 'user';
    dispatch(setPending(pendingKey, true));
// по моему параметр токен здесь вообще не нужен, идентификация идет по куки
    fetch(url + 'user')
        .then(r => r.json())
        .then(data => {
            if (!data.error) {
                dispatch({
                    type: actionTypes.USER_UPDATE,
                    data
                });
            }
            dispatch(setPending(pendingKey, false));
        })
        .catch(error => console.log('error', error));
};

// Activity actions
export const fetchActivities = () => dispatch => {
    dispatch(setPending('activities', true));
    fetch(url + 'activity', params({}, 'GET'))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('activities', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.ACTIVITY_UPDATE,
                    data
                });
            }
        })
        .catch(error => console.log('error', error));
};

// Basket items
export const fetchBasketItems = () => (dispatch, getState) => {
    dispatch(setPending('basket', true));
//    fetch(urlWithParams(url + 'basket', {access_token: getState().token}), params({}, 'GET'))
      return fetch(urlWithParams(url + 'basket', {access_token: getState().token}), params({}, 'GET'))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('basket', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.setBasketItems,
                    items: data,
                });
            }
// akayerov 14/02/2020
            return data;

        })
        .catch(error => console.log('error', error));
};

export const addBasketItem = (activity, activity_tariff_id = null) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.addBasketItem,
        activity,
        activity_tariff_id
    });

    dispatch(updateBasket());
};

export const updateBasketItem = (id, count) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.updateBasketItem,
        id,
        count,
    });
    dispatch(updateBasket());
};

// akayerov add 09/12/2019
export const setBasketItems = (items) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.setBasketItems,
        items
    });
    dispatch(updateBasket());
};

// akayerov add 09/12/2019
export const clearBasketPromo = (items) => (dispatch, getState) => {
    console.log('action setBasketItems items= ', items);
    dispatch({
        type: actionTypes.clearBasketPromo,
        items
    });
//    dispatch(updateBasket());
};

export const changeTariffsToTandem = (to_tandem, id, activity_id) => (dispatch, getState) => {
    const body = params({
        id,
        activity_id,
        to_tandem,
        access_token: getState().token
    });
    fetch(url + 'basket/change', body)
        .then(r => r.json())
        .then(data => {
            dispatch({
                type: actionTypes.changeBasketItemsTariffs,
                payload: data
            });
        })
        // Fetch items again to confirm changes.
        // Was set as a microtask to make sure that it will be evluated
        // after all previous changes.
        .then(() => dispatch(fetchBasketItems()))
        .catch(err => {
            console.log(err);
        });
}

export const updateBasket = throttle(() => (dispatch, getState) => {
    // update basket every 2000 ms
    if (!getState().token) return false;
    const items = assembleBasketItemsRequest(getState().basketItems);
    const data = {
        clear: true,
        activities: items,
    };
    return fetch(url + 'basket', params({...data, access_token: getState().token}))
        .then(r => r.json())
        .then(data => {
            if (data.error && data.error.code == 1) {
                window.toast.error('Не удалось добавить в корзину все активности. Повторите попытку позже');
            }
        })
        .catch(error => console.log('error', error));
}, 2000);

export const removeBasketItem = id => (dispatch, getState) => {
    dispatch({
        type: actionTypes.removeBasketItem,
        id
    });
    dispatch(updateBasket());
};

export const checkoutBasket = (reservationData, history) => (dispatch, getState) => {
    const items = assembleBasketItemsRequest(getState().basketItems);
    console.log('items-to-checkout', items);
    console.log('checkoutBasket: items=', items);
    const token = getState().token;
    const updateBasketData = {
        clear: true,
        activities: items,
        access_token: token,
    };
    if (token) {
        dispatch(setPending('checkout', true));
//        console.log('updateBasketData=', updateBasketData);
        
        return fetch(url + 'basket', params(updateBasketData))
            .then(r => r.json())
            .then(data => {
                if (!data.error) {
                    return fetch(url + 'basket/checkout', params({
                        reservations: reservationData, access_token: token
                    }));
                } else {
                    dispatch(setPending('checkout', false));
                    window.toast.error('Произошла техническая ошибка. Попробуйте позже.');
                }
            })
            .then(r => r.json())
            .then(data => {
                dispatch(setPending('checkout', false));
                if (data.payment_url && !data.error) {
                    window.location = data.payment_url;
                } else {
                    switch (data.error.code) {
                        case 3:
                            window.toast.error('Некорректная дата');
                            break;
                        case 4:
                            window.toast.error('Некорректный временной слот');
                            break;
                        case 5:
                            window.toast.error('Это время уже занято. Выберите другое');
                            break;
                        case 6:
                            window.toast.error('Не удалось сгенерировать билеты');
                            break;
                        case 7:
                            window.toast.error('Не удалось сохранить информацию о бронировании');
                            break;
                    }
                }
            })
            .catch(error => console.log('error', error));
    } else {
        fetch(url + 'basket/unauthenticated-checkout', params({
            email: reservationData,
            basket_items: items,
            access_token: token
        }))
            .then(r => r.json())
            .then(data => {
                if (data.payment_url && !data.error) {
                    dispatch({
                        type: actionTypes.setBasketItems,
                        items: [],
                    });

                    window.location = data.payment_url;
                } else {
                    switch (data.error.code) {
                        case 6:
                            window.toast.error('Не удалось сгенерировать билеты');
                            break;
                        case 8:
                            window.toast.error('Некорректный e-mail');
                            break;
                        case 9:
                            window.toast.error('Не удалось доставить письмо на указанный e-mail');
                            break;
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

};

/**
 * refund tickets  
 * @param {*} idOrder 
 */

export const refundTickets = (ticketId, cb = null) => (dispatch, getState) => {
//    console.log('refund idOrder= ', ticketId, cb);
    const token = getState().token;
    if (token) {
        dispatch(setPending('tickets', true));
//        console.log('autorization refund OK, url=', url + 'ticket/' + ticketId + '/return');
        return fetch(url + 'ticket/' + ticketId + '/return', params({ }))
            .then(r => r.json())
            .then(data => {
//                console.log('refundTickets: success data=', data);
                
                dispatch(setPending('tickets', false));
                if (data.error) {
                    switch (data.error.code) {
                        case 8:
                            window.toast.error('Средства уже возвращались');
                            break;
                        default:
                            window.toast.error('Возникла ошибка при возврате билетов');
                            break;
                    }
                }
                else {
                    window.toast.success('Возврат денег принят');
                    if( cb ) { 
                        cb();
                    }    
                }    
            })
            .catch(error => { 
                window.toast.error('В процессе возврата возникла ошибка');
                console.log('error', error)
             })
             

    } else {

    }
};



// Tickets

export const fetchTickets = () => (dispatch, getState) => {
    if (!getState().user) return;

    dispatch(setPending('tickets', true));
    fetch(urlWithParams(url + 'ticket', {access_token: getState().token}), params({}, 'GET'))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('tickets', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.setTickets,
                    data
                });
            }
        })
        .catch(error => console.log('error', error));
};

// Reserved dates

export const fetchReservedDates = (activityId, from, to) => (dispatch, getState) => {
    if (!getState().user || !moment.isMoment(from) || !moment.isMoment(to) || !from.isValid() || !to.isValid()) return;

    dispatch(setPending('reservedDates', true));
    fetch(urlWithParams(url + 'activity/reserved-dates', {
        id: activityId,
        from, to
    }), params({}, 'GET'))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('reservedDates', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.setReservedDate,
                    activityId,
                    dates: data,
                })
            } else {
                switch (data.error.code) {
                    case 1:
                        window.toast.error('Активность не найдена');
                        break;
                    case 2:
                        window.toast.error('Некорректные даты');
                        break;
                }
            }
        });
};


// Reservation timers

export const fetchTimers = () => dispatch => {};

export const addReservationTimer = reservationId => ({
    type: actionTypes.addReservationTimer,
    reservationId,
    expirationTime: (new Date()).valueOf() + 5 * 60 * 1000,
});

export const removeReservationTimer = reservationId => ({
    type: actionTypes.removeReservationTimer,
    reservationId
});


// Modals

export const updateModal = (type, data) => ({
    type: actionTypes.updateModal,
    modalType: type,
    data,
});

// Printing templates

export const setPrintingTemplate = template => ({
    type: actionTypes.setPrintingTemplate,
    template,
});

// akayerov Add array Modals
export const addModal = (type, data) => ({
    type: actionTypes.addModal,
    modalType: type,
    data,
});

// akayerov Add array Modals
export const closeModal = () => ({
    type: actionTypes.closeModal,
});

// Activity actions
export const fetchClients = ( parameter ) => dispatch => {
    dispatch(setPending('clients', true));

//    fetch(url + 'client', params(parameter, 'GET'))
    fetch(urlWithParams(url + 'client', parameter ))
        .then(r => r.json())
        .then(data => {
            dispatch(setPending('clients', false));
            if (!data.error) {
                dispatch({
                    type: actionTypes.CLIENT_UPDATE,
                    data
                });
            }
        })
        .catch(error => console.log('error', error));
};

