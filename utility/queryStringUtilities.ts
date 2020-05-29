import { stringify } from 'query-string';

export function createQueryString(values: Object) {
    return stringify(values);
}
