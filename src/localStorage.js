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
        localStorage.setItem('admin-state', JSON.stringify(state))
    } catch (e) {}
};
