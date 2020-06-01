import { ProjectBudgetItem } from './../../model/planning.d';
import { FiltersValues } from './../controller/planningItem/indexController';
import { TeamWeekNote, PlanningItem } from './../../model/planning';
import { Planning, Project, Team } from '../../model/planning';
import { ValidationError, ValidationErrorItem } from '@hapi/joi';

export type ProjectsResponseBody = {
    projects: Project[];
};

export type TeamsResponseBody = {
    teams: Team[];
};

export type PlanningItemsResponseBody = {
    filters: FiltersValues;
    planningItems: PlanningItem[];
};

export type TeamWeekNotesResponseBody = {
    teamWeekNotes: TeamWeekNote[];
};

export type ProjectBudgetItemsResponseBody = {
    projectBudgetItems: ProjectBudgetItem[];
};

export type ErrorResponseBody = {
    message: string;
    validationErrors?: ValidationErrorItem[];
};

export type SuccessResponseBody = {
    success: true;
};
