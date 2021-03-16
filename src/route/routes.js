export const prefix = '';

export const routes = {
    index: prefix + '/',
    auth: prefix + '/auth',
    restore: prefix + '/restore',
    reg: prefix + '/reg',
    unauth: prefix + '/unauth',
    me: prefix + '/me',
    activities: prefix + '/activity',
    checkout: prefix + '/checkout',

    successCheckout: prefix + '/success-checkout',
    failCheckout: prefix + '/failed-checkout',

    mainContent: prefix + '/main',
    testAPI: prefix + '/testapi',
    clients: prefix + '/clients',
    template: prefix + '/template',



    // доп тестовые компоненты
    treePageCustom: prefix + '/treepage_c',
    treePageMulti:  prefix + '/treepage_m',
    treePageCtrl:   prefix + '/treepage_ctrl',
    huki: prefix + '/huki',
    huki_redux: prefix + '/huki_redux',
    // redux оптимизирован по хуки
    huki_redux2: prefix + '/huki_redux2',
    websocket: prefix + '/websocket',

};

export const cartRoutes = [routes.activities, routes.me];
export const promoRoutes = [routes.activities];

export default routes;
