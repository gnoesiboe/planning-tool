export type WeekYearPair = {
    week: number;
    year: number;
};

export type Serializable =
    | null
    | boolean
    | number
    | string
    | Serializable[]
    | { [key: string]: Serializable };
