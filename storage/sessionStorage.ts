import { isClientSide } from './../utility/environmentUtilities';
import { createBrowserStorage } from './browserStorage';
import inMemoryStorage from './inMemoryStorage';

export const { get, getInt, getBoolean, write } = createBrowserStorage(
    isClientSide ? sessionStorage : inMemoryStorage
);
