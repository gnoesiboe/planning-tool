import { stringify } from 'qs';

export function createQueryString(values: Object) {
    return stringify(values);
}
