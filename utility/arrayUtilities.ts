export function createArrayContainingValue<T>(value: T, noOfRows: number): T[] {
    const out = [];

    for (let i = 0, l = noOfRows; i < l; i++) {
        out.push(value);
    }

    return out;
}
