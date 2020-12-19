export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('admin-state');
        if (serializedState === null) throw new Error();

        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        console.log('Сохранение состояния в хранилище');
        localStorage.setItem('admin-state', JSON.stringify(state))
    } catch (e) {}
};

export const clearState = state => {
    try {
        console.log('Очистка хранилища');
        localStorage.clear();
    } catch (e) {}
};    

