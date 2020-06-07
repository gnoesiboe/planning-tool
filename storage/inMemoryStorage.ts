const inMemoryStorage: Storage = {
    key: () => null,
    clear: () => {},
    getItem: () => null,
    length: 0,
    removeItem: () => {},
    setItem: () => {},
};

export default inMemoryStorage;
