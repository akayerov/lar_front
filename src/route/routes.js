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
    client: prefix + '/client',
    template: prefix + '/template',
// доп тестовые компоненты
    treePageCustom: prefix + '/treepage_c',
    treePageMulti:  prefix + '/treepage_m',
    treePageCtrl:   prefix + '/treepage_ctrl'

};

export const cartRoutes = [routes.activities, routes.me];
export const promoRoutes = [routes.activities];

export default routes;
