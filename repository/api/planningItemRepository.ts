import {
    createPostPlanningItemUrl,
    createDeletePlanningItemUrl,
} from './../../server/routing/urlGenerator';
import { PlanningItem } from './../../model/planning';
import { executePostRequest, executeDeleteRequest } from '../../api/client';

export async function persist(planningItem: PlanningItem): Promise<void> {
    await executePostRequest(createPostPlanningItemUrl(), planningItem);
}

export async function remove(planningItem: PlanningItem): Promise<void> {
    await executeDeleteRequest(createDeletePlanningItemUrl(planningItem.id));
}
