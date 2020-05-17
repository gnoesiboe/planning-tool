import { TeamWeekNote } from './../../model/planning';
import { Planning, Project, Team } from '../../model/planning';
import { ValidationError, ValidationErrorItem } from '@hapi/joi';

export type PlanningResponseBody = {
    planning: Planning;
};

export type ProjectsResponseBody = {
    projects: Project[];
};

export type TeamsResponseBody = {
    teams: Team[];
};

export type TeamWeekNotesResponseBody = {
    teamWeekNotes: TeamWeekNote[];
};

export type ErrorResponseBody = {
    message: string;
    validationErrors?: ValidationErrorItem[];
};

export type SuccessResponseBody = {
    success: true;
};
