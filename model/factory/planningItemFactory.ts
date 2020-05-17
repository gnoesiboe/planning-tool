import { Result } from './../../repository/database/planningItemRepository';
import { PostRequestInput } from '../../pages/api/planning';
import { PlanningItem } from '../planning';
import { createUuid } from '../../utility/idGenerator';
import { FormValues } from '../../components/addPlanningItem/hooks/useHandleFormState';

export function createPlanningItemFromRequestInput({
    id,
    teamId,
    projectId,
    week,
    year,
    notes,
}: PostRequestInput): PlanningItem {
    return {
        id,
        week,
        year,
        teamId,
        projectId,
        notes: notes || null,
    };
}

export function createPlanningItemFromDatabaseResult({
    id,
    project_id,
    team_id,
    notes,
    week,
    year,
}: Result): PlanningItem {
    return {
        id,
        projectId: project_id,
        teamId: team_id,
        week,
        year,
        notes,
    };
}

export function createPlanningItemFromFormValues(
    week: number,
    year: number,
    values: FormValues
): PlanningItem {
    return {
        ...values,
        notes: values.notes || null,
        id: createUuid(),
        week,
        year,
    };
}
