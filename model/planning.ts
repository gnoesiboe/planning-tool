export type Team = {
    id: string;
    name: string;
};

export type TeamWeekNote = {
    id: string;
    teamId: string;
    week: number;
    year: number;
    note: string;
};

export type Project = {
    id: string;
    name: string;
    color: string;
};

export type PlanningItem = {
    id: string;
    week: number;
    year: number;
    teamId: string;
    projectId: string;
    notes: string | null;
};

export type Planning = {
    [week: string]: PlanningItem[];
};
