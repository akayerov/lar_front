import {addWebSocketEvent} from "./redux/actions";
import { Client, Message } from '@stomp/stompjs';
import { store } from './index';

let client = null;

export default function rabbitMq(user) {
//    const StompJs = require('@stomp/stompjs');
//    const client = new StompJs.Client({
      store.dispatch(addWebSocketEvent('web-socket', { key:"status", value: false}));
      client = new Client({
        brokerURL: 'ws://localhost:15674/ws',
        connectHeaders: {
            login: 'guest',
            passcode: 'guest',
        },
        /*
            debug: function (str) {
                console.log(str);
            },

         */
        reconnectDelay: 5000,
        heartbeatIncoming: 5000,
        heartbeatOutgoing: 5000,
    });

    client.onConnect = function (frame) {
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
        console.log("Websocket - Connect");
        store.dispatch(addWebSocketEvent('web-socket', { key:"status", value: true}));

        const headers = { "x-max-length": 2};   // ограничение размера очереди
        const subscriptionPrivate = client.subscribe(user.email, function (message) {
            console.log('Private message = ', message);
            try {
                const payload = JSON.parse(message.body);
                console.log('Payload = ', payload);
                store.dispatch(addWebSocketEvent('web-socket', payload));
            }
            catch (e) {
                console.log('Error websocket Json = ', message.body);
            }
        },
        headers );
    };

    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
        store.dispatch(addWebSocketEvent('web-socket', { key:"status", value: false}));
    };


    client.activate();
}

export function deactivateWebSocket() {
    if( client)
      client.deactivate();
}