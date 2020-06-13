import { ProjectBudgetItem } from './planning.d';
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

export interface ProjectBudgetItem {
    id: string;
    projectId: string;
    from: WeekYearPair;
    until: WeekYearPair;
    createdAt: string;
    noOfWeeks: number;
    comments: string | null;
}

export interface ProjectBudgetItemWithUsageCount extends ProjectBudgetItem {
    usageCount: number;
}

export interface PlanningItem {
    id: string;
    week: number;
    year: number;
    teamId: string;
    projectId: string;
    notes: string | null;
}

export interface PlanningItemWithRelations extends PlanningItem {
    project: Project;
    team: Team;
}

export type WeekPlanningItems = Array<{
    week: number;
    year: number;
    items: PlanningItemWithRelations[];
}>;

export type TeamPlanning = {
    team: Team;
    weeks: WeekPlanningItems;
};

export type Planning = TeamPlanning[];
