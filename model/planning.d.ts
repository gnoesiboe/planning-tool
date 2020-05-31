import { WeekYearPair } from './../utility/types.d';

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
    active: boolean;
};

export type ProjectBudgetItem = {
    id: string;
    projectId: string;
    from: WeekYearPair;
    until: WeekYearPair;
    createdAt: string;
    noOfWeeks: number;
    comments: string | null;
};

export interface PlanningItem {
    id: string;
    week: number;
    year: number;
    teamId: string;
    projectId: string;
    notes: string | null;
}

export interface ExstendedPlanningItem extends PlanningItem {
    project: Project;
}

export type WeekPlanningItems = Array<{
    week: number;
    year: number;
    items: ExstendedPlanningItem[];
}>;

export type TeamPlanning = {
    team: Team;
    weeks: WeekPlanningItems;
};

export type Planning = TeamPlanning[];
