import { executeGetRequest } from './../../api/client';
import { createGetPlanningUrl } from './../../server/routing/urlGenerator';
import { PlanningResponseBody } from '../../server/response/types';
import { Planning } from '../../model/planning';

export async function fetchOne(): Promise<Planning> {
    const { planning } = await executeGetRequest<PlanningResponseBody>(
        createGetPlanningUrl()
    );

    return planning;
}
