import { StringifiableRecord, stringify } from 'query-string';

export function createQueryString(values: StringifiableRecord) {
    return stringify(values);
}
