import { createGetPlanningUrl } from './../../server/routing/urlGenerator';
import { PlanningResponseBody } from '../../server/response/types';
import { Planning } from '../../model/planning';

export async function fetchOne(): Promise<Planning> {
    const response = await fetch(createGetPlanningUrl());

    const { planning } = (await response.json()) as PlanningResponseBody;

    return planning;
}
